// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// +build wireinject

package main

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/store/handler"
	"github.com/google/wire"
	"gocloud.dev/blob"
	"gocloud.dev/server/health"
)

func newApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*cliFlags),
			"LogConfig",
			"TelemetryConfig",
		),
		log.Provider,
		xserver.ServiceSet,
		xserver.DefaultViews,
		wire.Value([]health.Checker(nil)),
		handler.Set,
		newApp,
		newBucket,
		newBucketName,
	)
	return nil, nil, nil
}

func newApp(logger log.Logger, server *server.Server, flags *cliFlags) *application {
	return &application{
		Logger: logger.Background(),
		server: server,
		addr:   flags.ListenAddress,
	}
}

func newBucket(ctx context.Context, flags *cliFlags) (*blob.Bucket, func(), error) {
	bucket, err := blob.OpenBucket(ctx, flags.BucketURL.String())
	if err != nil {
		return nil, nil, fmt.Errorf("cannot open blob bucket: %w", err)
	}
	return bucket, func() { _ = bucket.Close() }, nil
}

func newBucketName(flags *cliFlags) string {
	return flags.BucketURL.Host
}
