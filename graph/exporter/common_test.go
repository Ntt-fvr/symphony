// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/json"
	"flag"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/facebookincubator/symphony/graph/importer"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/stretchr/testify/require"
)

const (
	propNameBool        = "propNameBool"
	propNameInt         = "propNameInt"
	grandParentLocation = "grandParentLocation"
	parentLocation      = "parentLocation"
	childLocation       = "childLocation"
)

func TestMain(m *testing.M) {
	flag.Parse()
	os.Exit(m.Run())
}

func testAsyncExport(t *testing.T, typ exporttask.Type) {
	r := importer.NewExporterTestResolver(t)
	logger := r.Exporter.Log
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

	th := viewertest.TestHandler(t, &e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	ctx := viewertest.NewContext(context.Background(), r.Client)
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
