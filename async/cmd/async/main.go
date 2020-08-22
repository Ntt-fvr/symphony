// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	stdlog "log"
	"net"
	"net/url"
	"os"
	"syscall"

	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/pkg/ctxgroup"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"gopkg.in/alecthomas/kingpin.v2"

	"go.uber.org/zap"

	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "github.com/go-sql-driver/mysql"
	_ "gocloud.dev/blob/s3blob"
	_ "gocloud.dev/pubsub/mempubsub"
	_ "gocloud.dev/pubsub/natspubsub"
)

type cliFlags struct {
	HTTPAddr           *net.TCPAddr
	MySQLConfig        mysql.Config
	EventPubURL        ev.TopicFactory
	EventSubURL        ev.TopicFactory
	LogConfig          log.Config
	TelemetryConfig    telemetry.Config
	TenancyConfig      viewer.Config
	ExportBlobURL      *url.URL
	ExportBucketPrefix string
}

func main() {
	var cf cliFlags
	kingpin.HelpFlag.Short('h')
	kingpin.Flag(
		"mysql.dsn",
		"mysql connection string",
	).
		Envar("MYSQL_DSN").
		Required().
		SetValue(&cf.MySQLConfig)
	kingpin.Flag(
		"web.listen-address",
		"Web address to listen on",
	).
		Default(":http").
		TCPVar(&cf.HTTPAddr)
	kingpin.Flag(
		"event.pub-url", "events pub url").
		Envar("EVENT_PUB_URL").
		Required().
		SetValue(&cf.EventPubURL)
	kingpin.Flag(
		"event.sub-url",
		"events sub url",
	).
		Envar("EVENT_SUB_URL").
		Required().
		SetValue(&cf.EventSubURL)
	kingpin.Flag(
		"export-bucket-url",
		"export bucket url",
	).
		Envar("EXPORT_BUCKET_URL").
		URLVar(&cf.ExportBlobURL)
	kingpin.Flag(
		"export-bucket-prefix",
		"export bucket prefix",
	).
		Envar("EXPORT_BUCKET_PREFIX").
		Default("exports/").
		StringVar(&cf.ExportBucketPrefix)
	log.AddFlagsVar(kingpin.CommandLine, &cf.LogConfig)
	telemetry.AddFlagsVar(kingpin.CommandLine, &cf.TelemetryConfig)
	viewer.AddFlagsVar(kingpin.CommandLine, &cf.TenancyConfig)
	kingpin.Parse()

	ctx := ctxutil.WithSignal(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	app, cleanup, err := NewApplication(ctx, &cf)
	if err != nil {
		stdlog.Fatal(err)
	}
	defer cleanup()

	app.logger.Info("starting application")
	err = app.run(ctx)
	app.logger.Info("terminating application", zap.Error(err))
}

type application struct {
	logger *zap.Logger
	http   struct {
		*server.Server
		addr string
	}
	server *handler.Server
}

func (app *application) run(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	g := ctxgroup.WithContext(ctx)
	g.Go(func(context.Context) error {
		err := app.http.ListenAndServe(app.http.addr)
		app.logger.Debug("http server terminated", zap.Error(err))
		return err
	})
	g.Go(func(ctx context.Context) error {
		err := app.server.Serve(ctx)
		app.logger.Debug("event server terminated", zap.Error(err))
		return err
	})
	g.Go(func(ctx context.Context) error {
		defer cancel()
		<-ctx.Done()
		return nil
	})
	<-ctx.Done()

	app.logger.Warn("start application termination",
		zap.NamedError("reason", ctx.Err()),
	)
	defer app.logger.Debug("end application termination")

	g.Go(func(context.Context) error {
		app.logger.Debug("start http server termination")
		err := app.http.Shutdown(context.Background())
		app.logger.Debug("end http server termination", zap.Error(err))
		return err
	})
	g.Go(func(context.Context) error {
		app.logger.Debug("start event server termination")
		err := app.server.Shutdown(context.Background())
		app.logger.Debug("end event server termination", zap.Error(err))
		return err
	})
	return g.Wait()
}
