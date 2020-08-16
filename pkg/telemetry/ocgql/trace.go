// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocgql

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/vektah/gqlparser/v2/ast"
	"go.opencensus.io/trace"
)

// Tracer for opencensus.
type Tracer struct {
	// AllowRoot, if set to true, will allow the creation of root spans in
	// absence of existing spans.
	// Default is to not trace calls if no existing parent span is found.
	AllowRoot bool

	// Field, if set to true, will enable recording of field spans.
	Field bool

	// Sampler to use when creating spans.
	Sampler trace.Sampler
}

var _ interface {
	graphql.HandlerExtension
	graphql.ResponseInterceptor
	graphql.FieldInterceptor
} = Tracer{}

// ExtensionName returns the metrics extension name.
func (Tracer) ExtensionName() string {
	return "OpenCensusTracing"
}

// Validate the executable graphql schema.
func (Tracer) Validate(graphql.ExecutableSchema) error {
	return nil
}

// InterceptResponse traces graphql response execution.
func (t Tracer) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) (rsp *graphql.Response) {
	if !t.AllowRoot && trace.FromContext(ctx) == nil {
		return next(ctx)
	}
	oc := graphql.GetOperationContext(ctx)
	ctx, span := trace.StartSpan(ctx,
		spanNameFromOperation(oc),
		trace.WithSampler(t.Sampler),
	)
	defer span.End()
	if !span.IsRecordingEvents() {
		return next(ctx)
	}

	span.AddAttributes(
		trace.StringAttribute("graphql.query", oc.RawQuery),
	)
	for name, value := range oc.Variables {
		span.AddAttributes(
			trace.StringAttribute("graphql.vars."+name, fmt.Sprintf("%+v", value)),
		)
	}
	if stats := extension.GetComplexityStats(ctx); stats != nil {
		span.AddAttributes(
			trace.Int64Attribute("graphql.complexity.value", int64(stats.Complexity)),
			trace.Int64Attribute("graphql.complexity.limit", int64(stats.ComplexityLimit)),
		)
	}

	defer func() {
		if rsp.Errors != nil {
			span.SetStatus(trace.Status{
				Code:    trace.StatusCodeUnknown,
				Message: rsp.Errors.Error(),
			})
		}
	}()

	return next(ctx)
}

func spanNameFromOperation(oc *graphql.OperationContext) string {
	if oc.OperationName != "" {
		return oc.OperationName
	}
	if oc.Operation != nil {
		return string(oc.Operation.Operation)
	}
	return string(ast.Query)
}

// InterceptField traces graphql field execution.
func (t Tracer) InterceptField(ctx context.Context, next graphql.Resolver) (interface{}, error) {
	if !t.Field || (!t.AllowRoot && trace.FromContext(ctx) == nil) {
		return next(ctx)
	}
	fc := graphql.GetFieldContext(ctx)
	ctx, span := trace.StartSpan(ctx,
		spanNameFromField(fc.Field),
		trace.WithSampler(t.Sampler),
	)
	defer span.End()
	if !span.IsRecordingEvents() {
		return next(ctx)
	}

	span.AddAttributes(
		trace.StringAttribute("graphql.field.path", fc.Path().String()),
		trace.StringAttribute("graphql.field.name", fc.Field.Name),
		trace.StringAttribute("graphql.field.alias", fc.Field.Alias),
	)
	if object := fc.Field.ObjectDefinition; object != nil {
		span.AddAttributes(
			trace.StringAttribute("graphql.field.object", object.Name),
		)
	}
	for _, arg := range fc.Field.Arguments {
		span.AddAttributes(
			trace.StringAttribute("graphql.field.args."+arg.Name, arg.Value.String()),
		)
	}

	defer func() {
		if errs := graphql.GetFieldErrors(ctx, fc); errs != nil {
			span.SetStatus(trace.Status{
				Code:    trace.StatusCodeUnknown,
				Message: errs.Error(),
			})
		}
	}()

	return next(ctx)
}

func spanNameFromField(field graphql.CollectedField) string {
	if object := field.ObjectDefinition; object != nil {
		return object.Name + "." + field.Name
	}
	return field.Name
}
