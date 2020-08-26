// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package viewer

import (
	"context"
	"fmt"
	"net/url"
	"runtime"
	"strings"
	"sync"

	"github.com/facebook/ent/dialect"
	entsql "github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"
	pkgmysql "github.com/facebookincubator/symphony/pkg/mysql"

	"github.com/go-sql-driver/mysql"
	"gocloud.dev/server/health"
	"gocloud.dev/server/health/sqlhealth"
)

type Config struct {
	TenantMaxConn int      `name:"tenancy.db_max_conn" env:"TENANCY_DB_MAX_CONN" default:"1" help:"Max connections to database per tenant."`
	FeaturesURL   *url.URL `name:"features.url" env:"FEATURES_URL" placeholder:"URL" help:"URL to fetch tenant features."`
}

// Tenancy provides tenant client for key.
type Tenancy interface {
	ClientFor(context.Context, string) (*ent.Client, error)
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
	clients  map[string]*ent.Client
	mu       sync.RWMutex
}

// NewCacheTenancy creates a tenancy cache.
func NewCacheTenancy(tenancy Tenancy, initFunc func(*ent.Client)) *CacheTenancy {
	return &CacheTenancy{
		tenancy:  tenancy,
		initFunc: initFunc,
		clients:  map[string]*ent.Client{},
	}
}

// ClientFor implements Tenancy interface.
func (c *CacheTenancy) ClientFor(ctx context.Context, name string) (*ent.Client, error) {
	c.mu.RLock()
	client, ok := c.clients[name]
	c.mu.RUnlock()
	if ok {
		return client, nil
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if client, ok := c.clients[name]; ok {
		return client, nil
	}
	client, err := c.tenancy.ClientFor(ctx, name)
	if err != nil {
		return client, err
	}
	if c.initFunc != nil {
		c.initFunc(client)
	}
	c.clients[name] = client
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
	logger        log.Logger
	config        *mysql.Config
	tenantMaxConn int
	mu            sync.Mutex
	closers       []func()
}

// NewMySQLTenancy creates mysql tenancy for data source.
func NewMySQLTenancy(dsn string, tenantMaxConn int) (*MySQLTenancy, error) {
	config, err := mysql.ParseDSN(dsn)
	if err != nil {
		return nil, fmt.Errorf("parsing dsn: %w", err)
	}
	db := pkgmysql.Open(dsn)
	checker := sqlhealth.New(db)
	tenancy := &MySQLTenancy{
		Checker:       checker,
		config:        config,
		tenantMaxConn: tenantMaxConn,
		logger:        log.NewNopLogger(),
		closers:       []func(){checker.Stop},
	}
	runtime.SetFinalizer(tenancy, func(tenancy *MySQLTenancy) {
		for _, closer := range tenancy.closers {
			closer()
		}
	})
	return tenancy, nil
}

// SetLogger sets tenancy logger.
func (m *MySQLTenancy) SetLogger(logger log.Logger) {
	m.logger = logger
}

// ClientFor implements Tenancy interface.
func (m *MySQLTenancy) ClientFor(_ context.Context, name string) (*ent.Client, error) {
	config := *m.config
	config.DBName = DBName(name)
	db := pkgmysql.Open(config.FormatDSN())
	db.SetMaxOpenConns(m.tenantMaxConn)

	m.mu.Lock()
	m.closers = append(m.closers, pkgmysql.RecordStats(db))
	m.mu.Unlock()

	return ent.NewClient(
		ent.Driver(entsql.OpenDB(dialect.MySQL, db)),
	), nil
}

// DBName returns the prefixed database name in order to avoid collision with MySQL internal databases.
func DBName(name string) string {
	return "tenant_" + name
}

// FromDBName returns the source name of the tenant.
func FromDBName(name string) string {
	return strings.TrimPrefix(name, "tenant_")
}
