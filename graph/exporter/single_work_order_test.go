// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/importer"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func prepareSingleWOData(ctx context.Context, t *testing.T, r importer.TestExporterResolver) *ent.WorkOrder {
	pkgexporter.PrepareData(ctx, t)

	// Add templates
	typInput := models.AddWorkOrderTypeInput{
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
	typ, _ := r.Mutation().AddWorkOrderType(ctx, typInput)
	propStrEnt := typ.QueryPropertyTypes().Where(propertytype.Name(propStr)).OnlyX(ctx)
	propStr2Ent := typ.QueryPropertyTypes().Where(propertytype.Name(propStr2)).OnlyX(ctx)

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
	indexValue := 1
	fooCL := models.CheckListItemInput{
		Title:       "Foo",
		Type:        "simple",
		Index:       &indexValue,
		IsMandatory: pointer.ToBool(true),
	}
	clInputs := []*models.CheckListItemInput{&fooCL}

	barCLC := models.CheckListCategoryInput{
		Title:     "Bar",
		CheckList: clInputs,
	}
	mimeType := "image/jpeg"
	sizeInBytes := 120
	helpText := "Help Text"
	clcInputs := []*models.CheckListCategoryInput{&barCLC, {
		Title: "Bar",
		CheckList: []*models.CheckListItemInput{{
			Title:   "Foo",
			Type:    enum.CheckListItemTypeSimple,
			Index:   pointer.ToInt(0),
			Checked: pointer.ToBool(false),
		},
			{
				Title: "CellScan",
				Type:  enum.CheckListItemTypeCellScan,
				Index: pointer.ToInt(1),
			}, {
				Title:    "Files",
				Type:     enum.CheckListItemTypeFiles,
				Index:    pointer.ToInt(2),
				HelpText: &helpText,
				Files: []*models.FileInput{
					{
						StoreKey:    "StoreKeyAlreadyIn",
						FileName:    "FileAlreadyInWorkOrder",
						SizeInBytes: &sizeInBytes,
						MimeType:    &mimeType,
					},
					{
						StoreKey:    "StoreKeyToBeDeleted",
						FileName:    "FileToBeDeleted",
						SizeInBytes: &sizeInBytes,
						MimeType:    &mimeType,
					},
				},
			}},
	}}

	woInput := models.AddWorkOrderInput{
		Name:            "Work Order 1",
		Description:     pointer.ToString("WO1 - description"),
		WorkOrderTypeID: typ.ID,
		LocationID:      pointer.ToInt(r.Client.Location.Query().Where(location.Name(parentLocation)).OnlyX(ctx).ID),
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
		AssigneeID:          &u.ID,
		Status:              &st,
		Priority:            &priority,
		CheckListCategories: clcInputs,
	}
	wo, _ := r.Mutation().AddWorkOrder(ctx, woInput)
	ctxt := "Test Comment"
	_, _ = r.Mutation().AddComment(ctx, models.CommentInput{
		ID:         wo.ID,
		EntityType: "WORK_ORDER",
		Text:       ctxt,
	})

	_, _ = r.Mutation().AddComment(ctx, models.CommentInput{
		ID:         wo.ID,
		EntityType: "WORK_ORDER",
		Text:       "Testing comment 2",
	})

	_, _ = r.Client.Activity.Create().
		SetWorkOrder(wo).
		SetActivityType(activity.ActivityTypePriorityChanged).
		SetOldValue(workorder.PriorityLow.String()).
		SetNewValue(workorder.PriorityHigh.String()).
		SetAuthor(u).
		Save(ctx)

	st = workorder.StatusPlanned
	priority = workorder.PriorityMedium
	return wo
}

func TestWoWithInvalidId(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWoRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	q := req.URL.Query()
	q.Add("id", "123")
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.Equal(t, res.StatusCode, http.StatusInternalServerError)
	require.NoError(t, err)
	defer res.Body.Close()
}

func TestSingleWorkOrderExport(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log
	ctx := viewertest.NewContext(context.Background(), r.Client)
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWoRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	workOrder := prepareSingleWOData(ctx, t, *r)
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	_, err = excelize.OpenReader(res.Body)
	require.NoError(t, err)
}
