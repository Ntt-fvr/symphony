// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"

	"github.com/facebookincubator/symphony/graph/cmd/entscript/migrations"
	"github.com/facebookincubator/symphony/pkg/log"
)

type migrationFunc func(ctx context.Context, logger log.Logger) error

var migrationMap = map[string]migrationFunc{
	"sample": migrations.MigrateSample,
	"28072020": migrations.MigrateProjectTemplates,
}
