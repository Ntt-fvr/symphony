// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mysql_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/facebookincubator/symphony/pkg/database/mysql"
	"github.com/facebookincubator/symphony/pkg/internal/testing/terraform"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/trace"
	cdkmysql "gocloud.dev/mysql"
)

type testExporter struct {
	spans []*trace.SpanData
}

func (e *testExporter) ExportSpan(s *trace.SpanData) {
	e.spans = append(e.spans, s)
}

func TestOpen(t *testing.T) {
	// This test will be skipped unless the project is set up with Terraform.
	// Before running go test, run in this directory:
	//
	// terraform init
	// terraform apply

	ctx := context.Background()
	tfOut, err := terraform.ReadOutput(ctx, ".")
	if err != nil || len(tfOut) == 0 {
		t.Skipf("Could not obtain harness info: %v", err)
	}
	endpoint, _ := tfOut["endpoint"].Value.(string)
	require.NotEmpty(t, endpoint)
	username, _ := tfOut["username"].Value.(string)
	require.NotEmpty(t, username)
	password, _ := tfOut["password"].Value.(string)
	databaseName, _ := tfOut["database"].Value.(string)
	require.NotEmpty(t, databaseName)

	e := &testExporter{}
	trace.RegisterExporter(e)
	defer trace.UnregisterExporter(e)

	urlstr := fmt.Sprintf("%s://%s:%s@%s/%s?parseTime=true&interpolateParams=true",
		cdkmysql.Scheme, username, password, endpoint, databaseName,
	)
	t.Log("Connecting to:", urlstr)
	db, err := mysql.Open(ctx, urlstr)
	require.NoError(t, err)

	ctx, span := trace.StartSpan(ctx, "test",
		trace.WithSampler(trace.AlwaysSample()),
	)
	err = db.PingContext(ctx)
	require.NoError(t, err)
	span.End()
	require.Len(t, e.spans, 2)

	err = db.Close()
	require.NoError(t, err)
}
