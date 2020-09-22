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
	"time"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

type woTestType struct {
	wo1 ent.WorkOrder
	wo2 ent.WorkOrder
}

const propStr = "propStr"
const propStr2 = "propStr2"

func prepareWOData(ctx context.Context, t *testing.T, r TestExporterResolver) woTestType {
	pkgexporter.PrepareData(ctx, t)
	u2 := viewer.MustGetOrCreateUser(ctx, "tester2@example.com", user.RoleOwner)

	// Add templates
	typInput1 := models.AddWorkOrderTypeInput{
		Name:        "woTemplate1",
		Description: pointer.ToString("woTemplate1 = desc"),
		Properties: []*pkgmodels.PropertyTypeInput{
			{
				Name:        propStr,
				Type:        "string",
				StringValue: pointer.ToString("t1"),
			},
			{
				Name: propStr2,
				Type: "string",
			},
		},
	}
	typ1, _ := r.Mutation().AddWorkOrderType(ctx, typInput1)
	propStrEnt := typ1.QueryPropertyTypes().Where(propertytype.Name(propStr)).OnlyX(ctx)
	propStr2Ent := typ1.QueryPropertyTypes().Where(propertytype.Name(propStr2)).OnlyX(ctx)

	typInput2 := models.AddWorkOrderTypeInput{
		Name:        "woTemplate2",
		Description: pointer.ToString("woTemplate2 = desc"),
		Properties: []*pkgmodels.PropertyTypeInput{
			{
				Name: propNameBool,
				Type: "bool",
			},
			{
				Name:     propNameInt,
				Type:     "int",
				IntValue: pointer.ToInt(100),
			},
		},
	}
	typ2, _ := r.Mutation().AddWorkOrderType(ctx, typInput2)
	propBoolEnt := typ2.QueryPropertyTypes().Where(propertytype.Name(propNameBool)).OnlyX(ctx)
	propIntEnt := typ2.QueryPropertyTypes().Where(propertytype.Name(propNameInt)).OnlyX(ctx)

	projTypeInput := models.AddProjectTypeInput{
		Name: "projTemplate",
	}
	projTyp, _ := r.Mutation().CreateProjectType(ctx, projTypeInput)
	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	// Add instances
	projInput := models.AddProjectInput{
		Name:      "Project 1",
		CreatorID: &u.ID,
		Type:      projTyp.ID,
	}
	proj, _ := r.Mutation().CreateProject(ctx, projInput)

	st := workorder.StatusClosed
	priority := workorder.PriorityHigh
	woInput1 := models.AddWorkOrderInput{
		Name:            "WO1",
		Description:     pointer.ToString("WO1 - description"),
		WorkOrderTypeID: typ1.ID,
		LocationID:      pointer.ToInt(r.client.Location.Query().Where(location.Name(parentLocation)).OnlyX(ctx).ID),
		ProjectID:       pointer.ToInt(proj.ID),
		Properties: []*models.PropertyInput{
			{
				PropertyTypeID: propStrEnt.ID,
				StringValue:    pointer.ToString("string1"),
			},
			{
				PropertyTypeID: propStr2Ent.ID,
				StringValue:    pointer.ToString("string2"),
			},
		},
		AssigneeID: &u.ID,
		Status:     &st,
		Priority:   &priority,
	}
	wo1, _ := r.Mutation().AddWorkOrder(ctx, woInput1)

	st = workorder.StatusPlanned
	priority = workorder.PriorityMedium
	woInput2 := models.AddWorkOrderInput{
		Name:            "WO2",
		Description:     pointer.ToString("WO2 - description"),
		WorkOrderTypeID: typ2.ID,
		LocationID:      pointer.ToInt(r.client.Location.Query().Where(location.Name(childLocation)).OnlyX(ctx).ID),
		Properties: []*models.PropertyInput{
			{
				PropertyTypeID: propIntEnt.ID,
				IntValue:       pointer.ToInt(600),
			},
			{
				PropertyTypeID: propBoolEnt.ID,
				BooleanValue:   pointer.ToBool(true),
			},
		},
		AssigneeID: &u2.ID,
		Status:     &st,
		Priority:   &priority,
	}
	wo2, _ := r.Mutation().AddWorkOrder(ctx, woInput2)
	/*
		Project 1 (of type 'projTemplate')
			WO1 ( type woTemplate1). loc: parent, (string props)
		WO2 ( type woTemplate2). loc: child (bool&int props)
	*/
	return woTestType{
		*wo1,
		*wo2,
	}
}

func TestEmptyDataExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.Log

	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.WoRower{Log: log}}
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
		require.EqualValues(t, pkgexporter.WoDataHeader, ln)
	}
}

func TestWOExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.Log

	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.WoRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	ctx := viewertest.NewContext(context.Background(), r.client)
	data := prepareWOData(ctx, t, *r)
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
		var wo ent.WorkOrder
		switch {
		case ln[1] == "Work Order Name":
			require.EqualValues(t, append(pkgexporter.WoDataHeader, []string{propNameBool, propNameInt, propStr, propStr2}...), ln)
		case ln[0] == strconv.Itoa(data.wo1.ID):
			wo = data.wo1
			require.EqualValues(t, ln[1:], []string{
				"WO1",
				wo.QueryProject().OnlyX(ctx).Name,
				workorder.StatusClosed.String(),
				"tester@example.com",
				viewertest.DefaultUser,
				workorder.PriorityHigh.String(),
				pkgexporter.GetStringDate(pointer.ToTime(time.Now())),
				"",
				grandParentLocation + "; " + parentLocation,
				"",
				"",
				"string1",
				"string2",
			})
		case ln[0] == strconv.Itoa(data.wo2.ID):
			wo = data.wo2
			require.EqualValues(t, ln[1:], []string{
				"WO2",
				"",
				workorder.StatusPlanned.String(),
				"tester2@example.com",
				viewertest.DefaultUser,
				workorder.PriorityMedium.String(),
				pkgexporter.GetStringDate(pointer.ToTime(time.Now())),
				"",
				parentLocation + "; " + childLocation,
				"true",
				"600",
				"",
				"",
			})
		default:
			require.Fail(t, "line does not match")
		}
	}
}

func TestExportWOWithFilters(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.Log
	ctx := viewertest.NewContext(context.Background(), r.client)
	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.WoRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	data := prepareWOData(ctx, t, *r)

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	userID := viewer.FromContext(ctx).(*viewer.UserViewer).User().ID
	f, err := json.Marshal([]equipmentFilterInput{
		{
			Name:      "WORK_ORDER_STATUS",
			Operator:  "IS_ONE_OF",
			StringSet: []string{"CLOSED"},
		},
		{
			Name:     "WORK_ORDER_ASSIGNED_TO",
			Operator: "IS_ONE_OF",
			IDSet:    []string{strconv.Itoa(userID)},
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
		if ln[0] == strconv.Itoa(data.wo1.ID) {
			wo := data.wo1
			require.EqualValues(t, ln[1:], []string{
				"WO1",
				wo.QueryProject().OnlyX(ctx).Name,
				workorder.StatusClosed.String(),
				"tester@example.com",
				viewertest.DefaultUser,
				workorder.PriorityHigh.String(),
				pkgexporter.GetStringDate(pointer.ToTime(time.Now())),
				"",
				grandParentLocation + "; " + parentLocation,
				"string1",
				"string2",
			})
		}
	}
	require.Equal(t, 2, linesCount)
}

func TestWorkOrdersAsyncExport(t *testing.T) {
	testAsyncExport(t, exporttask.TypeWorkOrder)
}
