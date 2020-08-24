// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package telemetry_test

import (
	"testing"

	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/stretchr/testify/require"
)

func TestNewPrometheusExporter(t *testing.T) {
	exporter, err := telemetry.NewPrometheusExporter(
		telemetry.ViewExporterOptions{},
	)
	require.NoError(t, err)
	require.NotNil(t, exporter)
}
