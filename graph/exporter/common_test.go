// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/facebook/ent/dialect"
	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/resolver"
	"github.com/facebookincubator/symphony/graph/importer"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/enttest"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ent/migrate"
	"github.com/facebookincubator/symphony/pkg/ev"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/testdb"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

var debug = flag.Bool("debug", false, "run database driver on debug mode")

const (
	equipmentTypeName          = "equipmentType"
	equipmentType2Name         = "equipmentType2"
	parentEquip                = "parentEquipmentName"
	currEquip                  = "currEquipmentName"
	positionName               = "Position"
	portName1                  = "port1"
	portName2                  = "port2"
	propNameStr                = "propNameStr"
	propNameDate               = "propNameDate"
	propNameBool               = "propNameBool"
	propNameInt                = "propNameInt"
	externalIDL                = "11"
	externalIDM                = "22"
	lat                        = 32.109
	long                       = 34.855
	newPropNameStr             = "newPropNameStr"
	propDefValue2              = "defaultVal2"
	propDevValInt              = 15
	propInstanceValue          = "newVal"
	locTypeNameL               = "locTypeLarge"
	locTypeNameM               = "locTypeMedium"
	locTypeNameS               = "locTypeSmall"
	grandParentLocation        = "grandParentLocation"
	parentLocation             = "parentLocation"
	childLocation              = "childLocation"
	secondServiceName          = "S2"
	MethodAdd           method = "ADD"
	MethodEdit          method = "EDIT"
)

type method string

func TestMain(m *testing.M) {
	flag.Parse()
	os.Exit(m.Run())
}

type TestExporterResolver struct {
	generated.ResolverRoot
	drv      dialect.Driver
	client   *ent.Client
	exporter pkgexporter.Exporter
}

func newExporterTestResolver(t *testing.T) *TestExporterResolver {
	db, name, err := testdb.Open()
	require.NoError(t, err)
	db.SetMaxOpenConns(1)
	return newResolver(t, sql.OpenDB(name, db))
}

func newResolver(t *testing.T, drv dialect.Driver) *TestExporterResolver {
	if *debug {
		drv = dialect.Debug(drv)
	}
	client := enttest.NewClient(t,
		enttest.WithOptions(ent.Driver(drv)),
		enttest.WithMigrateOptions(migrate.WithGlobalUniqueID(true)),
	)
	logger := logtest.NewTestLogger(t)
	r := resolver.New(resolver.Config{
		Logger:          logger,
		ReceiverFactory: ev.ErrFactory{},
	})
	e := pkgexporter.Exporter{Log: logger, Rower: pkgexporter.EquipmentRower{Log: logger}}
	return &TestExporterResolver{r, drv, client, e}
}

func prepareHandlerAndExport(t *testing.T, r *TestExporterResolver, e http.Handler) (context.Context, *http.Response) {
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	ctx := viewertest.NewContext(context.Background(), r.client)
	pkgexporter.PrepareData(ctx, t)
	locs := r.client.Location.Query().AllX(ctx)
	require.Len(t, locs, 3)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	return ctx, res
}

func importLinksPortsFile(t *testing.T, client *ent.Client, r io.Reader, entity importer.ImportEntity, method method, skipLines, withVerify bool) {
	readr := csv.NewReader(r)
	var buf *bytes.Buffer
	var contentType, url string
	switch entity {
	case importer.ImportEntityLink:
		buf, contentType = writeModifiedLinksCSV(t, readr, method, skipLines, withVerify)
	case importer.ImportEntityPort:
		buf, contentType = writeModifiedPortsCSV(t, readr, skipLines, withVerify)
	}

	h, _ := importer.NewHandler(
		importer.Config{
			Logger:          logtest.NewTestLogger(t),
			ReceiverFactory: ev.ErrFactory{},
		},
	)
	th := viewertest.TestHandler(t, h, client)
	server := httptest.NewServer(th)
	defer server.Close()
	switch entity {
	case importer.ImportEntityLink:
		url = server.URL + "/export_links"
	case importer.ImportEntityPort:
		fmt.Println("server.URL", server.URL)
		url = server.URL + "/export_ports"
	}
	req, err := http.NewRequest(http.MethodPost, url, buf)
	require.Nil(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	req.Header.Set("Content-Type", contentType)
	resp, err := http.DefaultClient.Do(req)
	require.Nil(t, err)
	require.Equal(t, resp.StatusCode, http.StatusOK)
	err = resp.Body.Close()
	require.NoError(t, err)
}

func testAsyncExport(t *testing.T, typ exporttask.Type) {
	r := newExporterTestResolver(t)
	logger := r.exporter.Log
	var (
		e          pkgexporter.Exporter
		exportPath string
	)
	switch typ {
	case exporttask.TypeLocation:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.LocationsRower{
			Log: logger,
		}}
		exportPath = "/locations"
	case exporttask.TypeEquipment:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.EquipmentRower{
			Log: logger,
		}}
		exportPath = "/equipment"
	case exporttask.TypePort:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.PortsRower{
			Log: logger,
		}}
		exportPath = "/ports"
	case exporttask.TypeLink:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.LinksRower{
			Log: logger,
		}}
		exportPath = "/links"
	case exporttask.TypeService:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.ServicesRower{
			Log: logger,
		}}
		exportPath = "/services"
	case exporttask.TypeWorkOrder:
		e = pkgexporter.Exporter{Log: logger, Rower: pkgexporter.WoRower{
			Log: logger,
		}}
		exportPath = "/work_orders"
	}

	th := viewertest.TestHandler(t, &e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	ctx := viewertest.NewContext(context.Background(), r.client)
	req, err := http.NewRequest(http.MethodGet, server.URL+exportPath, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)
	req.Header.Set(viewer.FeaturesHeader, "async_export")

	pkgexporter.PrepareData(ctx, t)

	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	type resStruct struct {
		TaskID string
	}
	var response resStruct
	err = json.NewDecoder(res.Body).Decode(&response)
	require.NoError(t, err)
	taskID := response.TaskID
	require.NotEmpty(t, taskID)
	require.True(t, len(response.TaskID) > 1)
}
