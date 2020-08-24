// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package telemetry_test

import (
	"os"
	"testing"

	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/stretchr/testify/require"
)

func TestFlags(t *testing.T) {
	var cfg telemetry.Config
	parser, err := kong.New(&cfg, cfg)
	require.NoError(t, err)
	_, err = parser.Parse([]string{
		"--" + telemetry.TraceExporterFlag, "nop",
		"--" + telemetry.TraceSamplingProbabilityFlag, "0.5",
		"--" + telemetry.TraceServiceFlag, t.Name(),
		"--" + telemetry.TraceTagsFlag, "one=1",
		"--" + telemetry.TraceTagsFlag, "two=2",
		"--" + telemetry.ViewExporterFlag, "nop",
		"--" + telemetry.ViewLabelsFlag, "three=3",
	})
	require.NoError(t, err)
	require.Equal(t, "nop", cfg.Trace.ExporterName)
	require.Equal(t, 0.5, cfg.Trace.SamplingProbability)
	require.Equal(t, t.Name(), cfg.Trace.ServiceName)
	require.Equal(t, map[string]string{"one": "1", "two": "2"}, cfg.Trace.Tags)
	require.Equal(t, "nop", cfg.View.ExporterName)
	require.Equal(t, map[string]string{"three": "3"}, cfg.View.Labels)
}

func TestEnvarFlags(t *testing.T) {
	vars := map[string]string{
		"TELEMETRY_TRACE_EXPORTER":             "nop",
		"TELEMETRY_TRACE_SAMPLING_PROBABILITY": "0.2",
		"TELEMETRY_TRACE_SERVICE":              t.Name(),
		"TELEMETRY_VIEW_EXPORTER":              "nop",
	}
	for key, value := range vars {
		err := os.Setenv(key, value)
		require.NoError(t, err)
	}
	defer func() {
		for key := range vars {
			err := os.Unsetenv(key)
			require.NoError(t, err)
		}
	}()
	var cfg telemetry.Config
	parser, err := kong.New(&cfg, cfg)
	require.NoError(t, err)
	_, err = parser.Parse(nil)
	require.NoError(t, err)
	require.Equal(t, "nop", cfg.Trace.ExporterName)
	require.Equal(t, 0.2, cfg.Trace.SamplingProbability)
	require.Equal(t, t.Name(), cfg.Trace.ServiceName)
	require.Equal(t, "nop", cfg.View.ExporterName)
}

func TestProvider(t *testing.T) {
	err := os.Setenv("JAEGER_AGENT_ENDPOINT", "localhost:6831")
	require.NoError(t, err)
	defer func() {
		err := os.Unsetenv("JAEGER_AGENT_ENDPOINT")
		require.NoError(t, err)
	}()
	var cfg telemetry.Config
	parser, err := kong.New(&cfg, cfg)
	require.NoError(t, err)
	_, err = parser.Parse([]string{
		"--" + telemetry.TraceExporterFlag, "jaeger",
		"--" + telemetry.ViewExporterFlag, "prometheus",
	})
	require.NoError(t, err)
	te, flusher, err := telemetry.ProvideTraceExporter(&cfg)
	require.NoError(t, err)
	require.NotNil(t, te)
	require.NotNil(t, flusher)
	sampler := telemetry.ProvideTraceSampler(&cfg)
	require.NotNil(t, sampler)
	ve, err := telemetry.ProvideViewExporter(&cfg)
	require.NoError(t, err)
	require.NotNil(t, ve)
}
