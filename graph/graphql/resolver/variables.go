// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/flowengine"
	"github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
)

type variableDefinitionResolver struct{}

func (variableDefinitionResolver) NestedVariables(ctx context.Context, obj *flowschema.VariableDefinition, value string) ([]*flowschema.VariableDefinition, error) {
	parsedValues, err := flowengine.ParseVariableDefinitionValue(ctx, obj, value)
	if err != nil {
		return nil, fmt.Errorf("value cannot be parsed: %w", err)
	}
	return obj.NestedVariables(ctx, parsedValues)
}

type variableExpressionResolver struct {
	triggerFactory triggers.Factory
	actionFactory  actions.Factory
}

func (r variableExpressionResolver) Definition(ctx context.Context, obj *flowschema.VariableExpression) (*flowschema.VariableDefinition, error) {
	client := ent.FromContext(ctx)
	b, err := client.Block.Get(ctx, obj.BlockID)
	if err != nil {
		return nil, err
	}
	variableDefinitions, err := flowengine.GetInputVariableDefinitions(ctx, b, r.triggerFactory, r.actionFactory)
	if err != nil {
		return nil, err
	}
	for _, definition := range variableDefinitions {
		if definition.Key == obj.VariableDefinitionKey {
			return definition, nil
		}
	}
	return nil, fmt.Errorf("failed to find variable definition: block=%q, key=%s", b.ID, obj.VariableDefinitionKey)
}

type blockVariableResolver struct {
	triggerFactory triggers.Factory
	actionFactory  actions.Factory
}

func (blockVariableResolver) Block(ctx context.Context, obj *flowschema.BlockVariable) (*ent.Block, error) {
	client := ent.FromContext(ctx)
	return client.Block.Get(ctx, obj.BlockID)
}

func (r blockVariableResolver) OutputParamDefinition(ctx context.Context, obj *flowschema.BlockVariable) (*flowschema.VariableDefinition, error) {
	client := ent.FromContext(ctx)
	block, err := client.Block.Get(ctx, obj.BlockID)
	if err != nil {
		return nil, err
	}
	variableDefinitions, err := flowengine.GetOutputVariableDefinitions(ctx, block, r.triggerFactory, r.actionFactory)
	if err != nil {
		return nil, err
	}
	for _, definition := range variableDefinitions {
		if definition.Key == obj.VariableDefinitionKey {
			return definition, err
		}
	}
	return nil, nil
}
