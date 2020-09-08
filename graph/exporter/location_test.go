// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	"github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

type locationsFilterInput struct {
	Name          enum.LocationFilterType  `json:"name"`
	Operator      enum.FilterOperator      `jsons:"operator"`
	StringValue   string                   `json:"stringValue"`
	IDSet         []string                 `json:"idSet"`
	StringSet     []string                 `json:"stringSet"`
	PropertyValue models.PropertyTypeInput `json:"propertyValue"`
	MaxDepth      *int                     `json:"maxDepth"`
	BoolValue     *bool                    `json:"boolValue"`
}

func TestEmptyLocationDataExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.LocationsRower{Log: log, Concurrent: true}}
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
			"\ufeffLocation ID",
			"External ID",
			"Latitude",
			"Longitude",
		}, ln)
	}
}

func TestLocationsExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.LocationsRower{Log: log, Concurrent: true}}
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
		case ln[1] == locTypeNameL:
			require.EqualValues(t, []string{
				"\ufeffLocation ID",
				locTypeNameL,
				locTypeNameM,
				locTypeNameS,
				"External ID",
				"Latitude",
				"Longitude",
				propNameStr,
				propNameBool,
				propNameDate,
			}, ln)
		case ln[4] == externalIDL:
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				"",
				"",
				externalIDL,
				fmt.Sprintf("%f", lat),
				fmt.Sprintf("%f", long),
				"",
				"",
				"",
			})
		case ln[4] == externalIDM:
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				parentLocation,
				"",
				externalIDM,
				fmt.Sprintf("%f", lat),
				fmt.Sprintf("%f", long),
				"",
				"",
				"",
			})
		case ln[3] == childLocation:
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				parentLocation,
				childLocation,
				"",
				fmt.Sprintf("%f", 0.0),
				fmt.Sprintf("%f", 0.0),
				"override",
				"true",
				"1988-03-29",
			})
		default:
			require.Fail(t, "line does not match")
		}
	}
}

func TestExportLocationWithFilters(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log
	ctx := viewertest.NewContext(context.Background(), r.client)
	e := &exporter{log: log, rower: pkgexporter.LocationsRower{Log: log, Concurrent: true}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	prepareData(ctx, t, *r)

	req, err := http.NewRequest("GET", server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	f, err := json.Marshal([]locationsFilterInput{
		{
			Name:      "LOCATION_INST_HAS_EQUIPMENT",
			Operator:  "IS",
			BoolValue: pointer.ToBool(false),
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
		switch ln[4] {
		case externalIDL:
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				"",
				"",
				externalIDL,
				fmt.Sprintf("%f", lat),
				fmt.Sprintf("%f", long),
			})
		case externalIDM:
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				parentLocation,
				"",
				externalIDM,
				fmt.Sprintf("%f", lat),
				fmt.Sprintf("%f", long),
			})
		default:
			if ln[1] == locTypeNameL {
				continue
			} else {
				require.Fail(t, "unknown line %s", ln)
			}
		}
	}
	require.Equal(t, 3, linesCount)
}

func TestExportLocationWithPropertyFilters(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log
	ctx := viewertest.NewContext(context.Background(), r.client)
	e := &exporter{log: log, rower: pkgexporter.LocationsRower{Log: log, Concurrent: true}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	prepareData(ctx, t, *r)

	req, err := http.NewRequest("GET", server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	f, err := json.Marshal([]locationsFilterInput{
		{
			Name:     "PROPERTY",
			Operator: "IS",
			PropertyValue: models.PropertyTypeInput{
				Name:        propNameStr,
				Type:        "string",
				StringValue: pointer.ToString("override"),
			},
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
		if ln[3] == childLocation {
			require.EqualValues(t, ln[1:], []string{
				grandParentLocation,
				parentLocation,
				childLocation,
				"",
				fmt.Sprintf("%f", 0.0),
				fmt.Sprintf("%f", 0.0),
				"override",
				"true",
				"1988-03-29",
			})
		}
	}
	require.Equal(t, 2, linesCount)
}

func TestLocationsAsyncExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log

	e := &exporter{log: log, rower: pkgexporter.LocationsRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	ctx := viewertest.NewContext(context.Background(), r.client)
	req, err := http.NewRequest(http.MethodGet, server.URL+"/locations", nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)
	req.Header.Set(viewer.FeaturesHeader, "async_export")

	prepareData(ctx, t, *r)
	require.NoError(t, err)

	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	type resStruct = struct {
		TaskID string
	}
	var response resStruct
	err = json.NewDecoder(res.Body).Decode(&response)
	require.NoError(t, err)
	taskID := response.TaskID
	require.NotEmpty(t, taskID)
	require.True(t, len(response.TaskID) > 1)

	req, err = http.NewRequest(http.MethodGet, server.URL+"/equipments", nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)
	req.Header.Set(viewer.FeaturesHeader, "async_export")
	resEquip, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	if resEquip != nil {
		require.Equal(t, http.StatusInternalServerError, resEquip.StatusCode)
		resEquip.Body.Close()
	}
}
