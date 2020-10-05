// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"os"

	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/pkg/ctxutil"
	"github.com/facebookincubator/symphony/tools/sync/internal/cmd"
	"go.uber.org/zap"
)

type debugFlag bool

func (debugFlag) BeforeApply(cfg *zap.Config) error {
	cfg.Level = zap.NewAtomicLevelAt(zap.DebugLevel)
	return nil
}

func main() {
	cfg := zap.NewDevelopmentConfig()
	cfg.Level = zap.NewAtomicLevelAt(zap.InfoLevel)
	var cli struct {
		Features cmd.Features `cmd:"features" help:"Sync feature flags."`
		Debug    debugFlag    `name:"debug" help:"enable verbose logging."`
	}
	ctx := kong.Parse(&cli,
		kong.Bind(&cfg),
		kong.BindTo(
			ctxutil.WithSignal(
				context.Background(),
				os.Interrupt,
			),
			(*context.Context)(nil),
		),
	)
	logger, _ := cfg.Build()
	zap.ReplaceGlobals(logger)
	err := ctx.Run()
	ctx.FatalIfErrorf(err)
}
