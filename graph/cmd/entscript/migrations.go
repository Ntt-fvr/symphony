package main

import (
	"context"

	"github.com/facebookincubator/symphony/graph/cmd/entscript/migrations"
	"github.com/facebookincubator/symphony/pkg/log"
)

type migrationFunc func(ctx context.Context, logger log.Logger) error

var migrationMap = map[string]migrationFunc{
	"sample": migrations.MigrateSample,
}
