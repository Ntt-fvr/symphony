// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package telemetry

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/alecthomas/kong"
	"github.com/google/wire"
	"go.opencensus.io/stats/view"
	"go.opencensus.io/trace"
)

const (
	// TraceExporterFlag is the canonical flag name to select a trace exporter.
	TraceExporterFlag = "telemetry.trace.exporter"
	// TraceExporterEnvar is the environment variable name to to select a trace exporter.
	TraceExporterEnvar = "TELEMETRY_TRACE_EXPORTER"

	// TraceServiceFlag is the canonical flag name to explicitly set traced service name.
	TraceServiceFlag = "telemetry.trace.service"
	// TraceServiceEnvar is the environment variable name to explicitly set traced service name.
	TraceServiceEnvar = "TELEMETRY_TRACE_SERVICE"
	// TraceServiceHelp is the help description for the telemetry.trace.service flag.
	TraceServiceHelp = "Traced service name"

	// TraceTagsFlag is the canonical flag name to configure trace tags.
	TraceTagsFlag = "telemetry.trace.tags"
	// TraceTagsEnvar is the environment variable name to configure trace tags.
	TraceTagsEnvar = "TELEMETRY_TRACE_TAGS"
	// TraceTagsHelp is the help description for the telemetry.trace.tags flag.
	TraceTagsHelp = "Fixed set of tags to add to every trace"

	// TraceSamplingProbabilityFlag is the canonical flag name to configure trace sampling probability.
	TraceSamplingProbabilityFlag = "telemetry.trace.sampling_probability"
	// TraceSamplingProbabilityEnvar is the environment variable name to configure trace sampling probability.
	TraceSamplingProbabilityEnvar = "TELEMETRY_TRACE_SAMPLING_PROBABILITY"
	// TraceSamplingProbabilityHelp is the help description for the telemetry.trace.sampling_probability flag.
	TraceSamplingProbabilityHelp = "Sampling probability for trace creation"

	// ViewExporterFlag is the canonical flag name to select a view exporter.
	ViewExporterFlag = "telemetry.view.exporter"
	// ViewExporterEnvar is the environment variable name to to select a view exporter.
	ViewExporterEnvar = "TELEMETRY_VIEW_EXPORTER"

	// ViewLabelsFlag is the canonical flag name to configure view labels.
	ViewLabelsFlag = "telemetry.view.labels"
	// ViewLabelsEnvar is the environment variable name to configure view labels.
	ViewLabelsEnvar = "TELEMETRY_VIEW_LABELS"
	// ViewLabelsHelp is the help description for the telemetry.view.labels flag.
	ViewLabelsHelp = "Fixed set of labels to add to every view"
)

// Config is a struct containing configurable telemetry settings.
type Config struct {
	Trace struct {
		ExporterName         string  `name:"exporter" env:"TELEMETRY_TRACE_EXPORTER" default:"nop" enum:"${trace_exporters}" help:"Exporter to use when exporting telemetry trace data."`
		SamplingProbability  float64 `name:"sampling_probability" env:"TELEMETRY_TRACE_SAMPLING_PROBABILITY" default:"1.0" help:"Sampling probability for trace creation."`
		TraceExporterOptions `embed:""`
	} `prefix:"telemetry.trace." embed:""`
	View struct {
		ExporterName        string `name:"exporter" env:"TELEMETRY_VIEW_EXPORTER" default:"prometheus" enum:"${view_exporters}" help:"Exporter to use when exporting telemetry metrics data."`
		ViewExporterOptions `embed:""`
	} `prefix:"telemetry.view." embed:""`
}

// Apply implements kong.Option interface.
func (Config) Apply(k *kong.Kong) error {
	vars := kong.Vars{
		"service_name": func() string {
			exec, _ := os.Executable()
			return filepath.Base(exec)
		}(),
		"trace_exporters": strings.Join(
			AvailableTraceExporters(), ",",
		),
		"view_exporters": strings.Join(
			AvailableViewExporters(), ",",
		),
	}
	return vars.Apply(k)
}

// ProvideTraceExporter is a wire provider that produces trace exporter from config.
func ProvideTraceExporter(config *Config) (trace.Exporter, func(), error) {
	exporter, err := GetTraceExporter(
		config.Trace.ExporterName,
		config.Trace.TraceExporterOptions,
	)
	if err != nil {
		return nil, nil, err
	}
	if flusher, ok := exporter.(interface{ Flush() }); ok {
		return exporter, flusher.Flush, nil
	}
	return exporter, func() {}, nil
}

// ProvideTraceSampler is a wire provider that produces trace sampler from config.
func ProvideTraceSampler(config *Config) trace.Sampler {
	return trace.ProbabilitySampler(
		config.Trace.SamplingProbability,
	)
}

// ProvideViewExporter is a wire provider that produces view exporter from config.
func ProvideViewExporter(config *Config) (view.Exporter, error) {
	return GetViewExporter(
		config.View.ExporterName,
		config.View.ViewExporterOptions,
	)
}

// Provider is a wire provider that produces telemetry exports from config.
var Provider = wire.NewSet(
	ProvideTraceExporter,
	ProvideTraceSampler,
	ProvideViewExporter,
)
