// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	"github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

const nameTitle = "Equipment Name"

type equipmentFilterInput struct {
	Name          enum.EquipmentFilterType `json:"name"`
	Operator      enum.FilterOperator      `jsons:"operator"`
	StringValue   string                   `json:"stringValue"`
	IDSet         []string                 `json:"idSet"`
	StringSet     []string                 `json:"stringSet"`
	PropertyValue models.PropertyTypeInput `json:"propertyValue"`
}

func TestEmptyWOExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.EquipmentRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	reader := csv.NewReader(res.Body)
	for {
		ln, err := reader.Read()
		if err == io.EOF {
			break
		}
		require.NoError(t, err, "error reading row")
		require.EqualValues(t, []string{
			"\ufeffEquipment ID",
			nameTitle,
			"Equipment Type",
			"External ID",
			"Parent Equipment (3)",
			"Position (3)",
			"Parent Equipment (2)",
			"Position (2)",
			"Parent Equipment",
			"Equipment Position",
		}, ln)
	}
}

func TestExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.EquipmentRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	ctx := viewertest.NewContext(context.Background(), r.client)
	prepareData(ctx, t, *r)
	require.NoError(t, err)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	reader := csv.NewReader(res.Body)
	for {
		ln, err := reader.Read()
		if err == io.EOF {
			break
		}
		require.NoError(t, err, "error reading row")
		switch {
		case ln[1] == nameTitle:
			require.EqualValues(t, []string{
				"\ufeffEquipment ID",
				nameTitle,
				"Equipment Type",
				"External ID",
				locTypeNameL,
				locTypeNameM,
				locTypeNameS,
				"Parent Equipment (3)",
				"Position (3)",
				"Parent Equipment (2)",
				"Position (2)",
				"Parent Equipment",
				"Equipment Position",
				propNameStr,
				propNameInt,
				newPropNameStr,
			}, ln)
		case ln[1] == parentEquip:
			require.EqualValues(t, ln[1:], []string{
				parentEquip,
				equipmentTypeName,
				"",
				grandParentLocation,
				parentLocation,
				childLocation,
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
			})
		case ln[1] == currEquip:
			require.EqualValues(t, ln[1:], []string{
				currEquip,
				equipmentType2Name,
				externalIDM,
				grandParentLocation,
				parentLocation,
				childLocation,
				"",
				"",
				"",
				"",
				parentEquip,
				positionName,
				propInstanceValue,
				strconv.FormatInt(int64(propDevValInt), 10),
				propDefValue2,
			})
		default:
			require.Fail(t, "line does not match")
		}
	}
}

func TestExportWithFilters(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log
	ctx := viewertest.NewContext(context.Background(), r.client)
	e := &exporter{log: log, rower: pkgexporter.EquipmentRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	prepareData(ctx, t, *r)

	req, err := http.NewRequest("GET", server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	loc := r.client.Location.Query().Where(location.Name(childLocation)).OnlyX(ctx)

	f, err := json.Marshal([]equipmentFilterInput{
		{
			Name:     "LOCATION_INST",
			Operator: "IS_ONE_OF",
			IDSet:    []string{strconv.Itoa(loc.ID)},
		},
		{
			Name:        "EQUIP_INST_NAME",
			Operator:    "CONTAINS",
			StringValue: "pa",
		},
	})
	require.NoError(t, err)
	q := req.URL.Query()
	q.Add("filters", string(f))
	req.URL.RawQuery = q.Encode()

	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	reader := csv.NewReader(res.Body)
	linesCount := 0
	for {
		ln, err := reader.Read()
		if err == io.EOF {
			break
		}
		linesCount++
		require.NoError(t, err, "error reading row")
		if ln[1] == parentEquip {
			require.EqualValues(t, []string{
				parentEquip,
				equipmentTypeName,
				"",
				grandParentLocation,
				parentLocation,
				childLocation,
				"",
				"",
				"",
				"",
				"",
				"",
			}, ln[1:])
		}
	}
	require.Equal(t, 2, linesCount)
}

func TestEquipmentsAsyncExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.EquipmentRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	ctx := viewertest.NewContext(context.Background(), r.client)
	req, err := http.NewRequest(http.MethodGet, server.URL+"/equipment", nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)
	req.Header.Set(viewer.FeaturesHeader, "async_export")

	prepareData(ctx, t, *r)
	require.NoError(t, err)

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
