// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package main

import (
	"context"
	"fmt"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/server/xserver"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/store/handler"
	"gocloud.dev/blob"
	"gocloud.dev/server/health"
)

import (
	_ "gocloud.dev/blob/s3blob"
)

// Injectors from wire.go:

func newApplication(ctx context.Context, flags *cliFlags) (*application, func(), error) {
	config := flags.LogConfig
	logger, cleanup, err := log.ProvideLogger(config)
	if err != nil {
		return nil, nil, err
	}
	zapLogger := log.ProvideZapLogger(logger)
	bucket, cleanup2, err := newBucket(ctx, flags)
	if err != nil {
		cleanup()
		return nil, nil, err
	}
	string2 := flags.ListenAddress
	handlerConfig := handler.Config{
		Logger:     logger,
		Bucket:     bucket,
		BucketName: string2,
	}
	handlerHandler := handler.New(handlerConfig)
	xserverZapLogger := xserver.NewRequestLogger(logger)
	v := _wireValue
	v2 := xserver.DefaultViews()
	telemetryConfig := &flags.TelemetryConfig
	exporter, err := telemetry.ProvideViewExporter(telemetryConfig)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	traceExporter, cleanup3, err := telemetry.ProvideTraceExporter(telemetryConfig)
	if err != nil {
		cleanup2()
		cleanup()
		return nil, nil, err
	}
	profilingEnabler := _wireProfilingEnablerValue
	sampler := telemetry.ProvideTraceSampler(telemetryConfig)
	handlerFunc := xserver.NewRecoveryHandler(logger)
	defaultDriver := _wireDefaultDriverValue
	options := &server.Options{
		RequestLogger:         xserverZapLogger,
		HealthChecks:          v,
		Views:                 v2,
		ViewExporter:          exporter,
		TraceExporter:         traceExporter,
		EnableProfiling:       profilingEnabler,
		DefaultSamplingPolicy: sampler,
		RecoveryHandler:       handlerFunc,
		Driver:                defaultDriver,
	}
	serverServer := server.New(handlerHandler, options)
	mainApplication := &application{
		Logger: zapLogger,
		server: serverServer,
		addr:   string2,
	}
	return mainApplication, func() {
		cleanup3()
		cleanup2()
		cleanup()
	}, nil
}

var (
	_wireValue                 = []health.Checker(nil)
	_wireProfilingEnablerValue = server.ProfilingEnabler(true)
	_wireDefaultDriverValue    = &server.DefaultDriver{}
)

// wire.go:

func newBucket(ctx context.Context, flags *cliFlags) (*blob.Bucket, func(), error) {
	bucket, err := blob.OpenBucket(ctx, flags.BucketURL.String())
	if err != nil {
		return nil, nil, fmt.Errorf("cannot open blob bucket: %w", err)
	}
	return bucket, func() { _ = bucket.Close() }, nil
}
