// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	stdlog "log"
	"net/url"
	"os"
	"syscall"

	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/pkg/ctxgroup"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/kongtoml"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/facebookincubator/symphony/pkg/server"
	"github.com/facebookincubator/symphony/pkg/telemetry"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"go.uber.org/zap"

	_ "github.com/facebookincubator/symphony/pkg/ent/runtime"
	_ "gocloud.dev/pubsub/mempubsub"
	_ "gocloud.dev/pubsub/natspubsub"
)

type cliFlags struct {
	ConfigFile      kong.ConfigFlag  `type:"existingfile" placeholder:"PATH" help:"Configuration file path."`
	ListenAddress   string           `name:"web.listen-address" default:":http" help:"Web address to listen on."`
	MySQLConfig     mysql.Config     `name:"mysql.dsn" env:"MYSQL_DSN" required:"" placeholder:"STRING" help:"MySQL data source name."`
	AuthURL         *url.URL         `name:"web.ws-auth-url" env:"WS_AUTH_URL" placeholder:"URL" help:"Websocket authentication URL."`
	EventPubsubURL  ev.TopicFactory  `name:"event.pubsub-url" env:"EVENT_PUBSUB_URL" required:"" placeholder:"URL" help:"Event pubsub URL."`
	LogConfig       log.Config       `embed:""`
	TelemetryConfig telemetry.Config `embed:""`
	TenancyConfig   viewer.Config    `embed:""`
}

func main() {
	var cf cliFlags
	kong.Parse(&cf,
		kong.Configuration(kongtoml.Loader),
		cf.TelemetryConfig,
	)

	ctx := ctxutil.WithSignal(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	app, cleanup, err := newApplication(ctx, &cf)
	if err != nil {
		stdlog.Fatal(err)
	}
	defer cleanup()

	app.Info("starting application",
		zap.String("address", cf.ListenAddress),
	)
	err = app.run(ctx)
	app.Info("terminating application",
		zap.Error(err),
	)
}

type application struct {
	*zap.Logger
	server *server.Server
	addr   string
}

func (app *application) run(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	g := ctxgroup.WithContext(ctx)
	g.Go(func(context.Context) error {
		err := app.server.ListenAndServe(app.addr)
		app.Debug("http server terminated", zap.Error(err))
		return err
	})
	g.Go(func(ctx context.Context) error {
		defer cancel()
		<-ctx.Done()
		return nil
	})
	<-ctx.Done()

	g.Go(func(context.Context) error {
		app.Debug("start http server termination")
		err := app.server.Shutdown(context.Background())
		app.Debug("end http server termination", zap.Error(err))
		return err
	})
	return g.Wait()
}
