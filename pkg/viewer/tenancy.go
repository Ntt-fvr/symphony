// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package viewer

import (
	"context"
	"database/sql"
	"fmt"
	"runtime"
	"strings"
	"sync"

	"github.com/facebook/ent/dialect"
	entsql "github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent"
	pkgmysql "github.com/facebookincubator/symphony/pkg/mysql"
	"github.com/go-sql-driver/mysql"
	"gocloud.dev/server/health"
	"gocloud.dev/server/health/sqlhealth"
)

// Tenancy provides tenant client for key.
type Tenancy interface {
	ClientFor(context.Context, string) (*ent.Client, error)
}

// The Func type is an adapter to allow the use of
// ordinary functions as tenancy.
type TenancyFunc func(context.Context, string) (*ent.Client, error)

// Handle returns f(ctx, tenant).
func (f TenancyFunc) ClientFor(ctx context.Context, tenant string) (*ent.Client, error) {
	return f(ctx, tenant)
}

// FixedTenancy returns a fixed client.
type FixedTenancy struct {
	client *ent.Client
}

// NewFixedTenancy creates fixed tenancy from client.
func NewFixedTenancy(client *ent.Client) FixedTenancy {
	return FixedTenancy{client}
}

// ClientFor implements Tenancy interface.
func (f FixedTenancy) ClientFor(context.Context, string) (*ent.Client, error) {
	return f.Client(), nil
}

// Client returns the client stored in fixed tenancy.
func (f FixedTenancy) Client() *ent.Client {
	return f.client
}

// CacheTenancy is a tenancy wrapper cashing underlying clients.
type CacheTenancy struct {
	tenancy  Tenancy
	initFunc func(*ent.Client)
	clients  sync.Map
	mu       sync.Mutex
}

// NewCacheTenancy creates a tenancy cache.
func NewCacheTenancy(tenancy Tenancy, initFunc func(*ent.Client)) *CacheTenancy {
	return &CacheTenancy{
		tenancy:  tenancy,
		initFunc: initFunc,
	}
}

// ClientFor implements Tenancy interface.
func (c *CacheTenancy) ClientFor(ctx context.Context, name string) (*ent.Client, error) {
	if client, ok := c.clients.Load(name); ok {
		return client.(*ent.Client), nil
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if client, ok := c.clients.Load(name); ok {
		return client.(*ent.Client), nil
	}
	client, err := c.tenancy.ClientFor(ctx, name)
	if err != nil {
		return client, err
	}
	if c.initFunc != nil {
		c.initFunc(client)
	}
	c.clients.Store(name, client)
	return client, nil
}

// CheckHealth implements health.Checker interface.
func (c *CacheTenancy) CheckHealth() error {
	if checker, ok := c.tenancy.(health.Checker); ok {
		return checker.CheckHealth()
	}
	return nil
}

// MySQLTenancy provides logical database per tenant.
type MySQLTenancy struct {
	health.Checker
	config   *mysql.Config
	maxConns int
	mu       sync.Mutex
	closers  []func()
}

// NewMySQLTenancy creates mysql tenancy for data source.
func NewMySQLTenancy(dsn string, maxConns int) (*MySQLTenancy, error) {
	config, err := mysql.ParseDSN(dsn)
	if err != nil {
		return nil, fmt.Errorf("parsing dsn: %w", err)
	}
	db := pkgmysql.Open(dsn)
	checker := sqlhealth.New(db)
	tenancy := &MySQLTenancy{
		Checker:  checker,
		config:   config,
		maxConns: maxConns,
		closers:  []func(){checker.Stop},
	}
	runtime.SetFinalizer(tenancy, func(tenancy *MySQLTenancy) {
		for _, closer := range tenancy.closers {
			closer()
		}
	})
	return tenancy, nil
}

// ClientFor implements Tenancy interface.
func (m *MySQLTenancy) ClientFor(_ context.Context, name string) (*ent.Client, error) {
	config := *m.config
	config.DBName = DBName(name)
	db := pkgmysql.Open(config.FormatDSN())
	db.SetMaxOpenConns(m.maxConns)
	m.mu.Lock()
	m.closers = append(m.closers, pkgmysql.RecordStats(db))
	m.mu.Unlock()
	return ent.NewClient(
		ent.Driver(entsql.OpenDB(dialect.MySQL, db)),
	), nil
}

const dbPrefix = "tenant_"

// DBName returns the prefixed database name in order to avoid collision with MySQL internal databases.
func DBName(name string) string {
	return dbPrefix + name
}

// FromDBName returns the source name of the tenant.
func FromDBName(name string) string {
	return strings.TrimPrefix(name, dbPrefix)
}

type queryer interface {
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
}

// GetTenantNames returns a list of tenants that have a backing database.
func GetTenantNames(ctx context.Context, queryer queryer) ([]string, error) {
	rows, err := queryer.QueryContext(ctx,
		"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?", DBName("%"),
	)
	if err != nil {
		return nil, fmt.Errorf("cannot query information schema: %w", err)
	}
	defer rows.Close()

	var names []string
	for rows.Next() {
		var dbname string
		if err := rows.Scan(&dbname); err != nil {
			return nil, fmt.Errorf("cannot read row: %w", err)
		}
		names = append(names, FromDBName(dbname))
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("cannot read rows: %w", err)
	}
	return names, nil
}

type tenancyCtxKey struct{}

// TenancyFromContext returns the Tenancy stored in a context, or nil if there isn't one.
func TenancyFromContext(ctx context.Context) Tenancy {
	t, _ := ctx.Value(tenancyCtxKey{}).(Tenancy)
	return t
}

// NewTenancyContext returns a new context with the given Tenancy attached.
func NewTenancyContext(parent context.Context, tenancy Tenancy) context.Context {
	return context.WithValue(parent, tenancyCtxKey{}, tenancy)
}
