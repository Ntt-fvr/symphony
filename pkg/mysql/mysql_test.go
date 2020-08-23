// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mysql_test

import (
	"context"
	"os"
	"testing"

	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/trace"
)

func TestConfig(t *testing.T) {
	const dsn = "root:root@tcp(localhost:3306)/db?parseTime=true"
	var cfg mysql.Config
	err := cfg.Set(dsn)
	require.NoError(t, err)
	text, err := cfg.MarshalText()
	require.NoError(t, err)
	require.Equal(t, dsn, string(text))
}

type testExporter struct {
	spans []*trace.SpanData
}

func (e *testExporter) ExportSpan(s *trace.SpanData) {
	e.spans = append(e.spans, s)
}

func TestOpen(t *testing.T) {
	dsn, ok := os.LookupEnv("MYSQL_DSN")
	if !ok {
		t.Skip("MYSQL_DSN not provided")
	}
	e := &testExporter{}
	trace.RegisterExporter(e)
	defer trace.UnregisterExporter(e)

	db := mysql.Open(dsn)
	require.NotNil(t, db)
	ctx, span := trace.StartSpan(context.Background(), "test",
		trace.WithSampler(trace.AlwaysSample()),
	)
	err := db.PingContext(ctx)
	require.NoError(t, err)
	span.End()
	require.Len(t, e.spans, 2)
	err = db.Close()
	require.NoError(t, err)
}
