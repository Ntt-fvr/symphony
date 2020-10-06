// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package mysql

import (
	"context"
	"database/sql"
	"net/url"
	"time"

	"contrib.go.opencensus.io/integrations/ocsql"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/go-sql-driver/mysql"
	"go.uber.org/zap"
	cdkmysql "gocloud.dev/mysql"
	"gocloud.dev/mysql/awsmysql"
)

var defaultURLMux = cdkmysql.URLMux{}

func init() {
	traceOpts := []ocsql.TraceOption{
		ocsql.WithPing(true),
		ocsql.WithRowsAffected(true),
		ocsql.WithLastInsertID(true),
		ocsql.WithQuery(true),
		ocsql.WithQueryParams(true),
		ocsql.WithDisableErrSkip(true),
	}
	defaultURLMux.RegisterMySQL(cdkmysql.Scheme, &cdkmysql.URLOpener{
		TraceOpts: traceOpts,
	})
	defaultURLMux.RegisterMySQL(awsmysql.Scheme, &awsmysql.URLOpener{
		TraceOpts: traceOpts,
	})
}

// Open opens the database identified by the URL string given.
func Open(ctx context.Context, urlstr string) (*sql.DB, error) {
	return defaultURLMux.OpenMySQL(ctx, urlstr)
}

// OpenURL opens the database identified by the URL given.
func OpenURL(ctx context.Context, u *url.URL) (*sql.DB, error) {
	return defaultURLMux.OpenMySQLURL(ctx, u)
}

// Provider is a wire provider that produces *sql.DB from url.
func Provider(ctx context.Context, logger log.Logger, u *url.URL) (*sql.DB, func(), error) {
	db, err := OpenURL(ctx, u)
	if err != nil {
		return nil, nil, err
	}
	{
		const level = zap.ErrorLevel
		logger, _ := zap.NewStdLogAt(
			logger.Background().WithOptions(
				zap.AddStacktrace(level),
			),
			level,
		)
		_ = mysql.SetLogger(logger)
	}
	return db, ocsql.RecordStats(db, 10*time.Second), nil
}
