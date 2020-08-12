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

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func prepareSingleWOData(ctx context.Context, t *testing.T, r TestExporterResolver) woTestType {
	prepareData(ctx, t, r)
	u2 := viewer.MustGetOrCreateUser(ctx, "tester2@example.com", user.RoleOwner)

	// Add templates
	typInput1 := models.AddWorkOrderTypeInput{
		Name:        "woTemplate1",
		Description: pointer.ToString("woTemplate1 = desc"),
		Properties: []*models.PropertyTypeInput{
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
		Properties: []*models.PropertyTypeInput{
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

	st := workorder.StatusDone
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

	woInput1 := models.AddWorkOrderInput{
		Name:            "Work Order 1",
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
		AssigneeID:          &u.ID,
		Status:              &st,
		Priority:            &priority,
		CheckListCategories: clcInputs,
	}
	wo1, _ := r.Mutation().AddWorkOrder(ctx, woInput1)
	ctxt := "Test Comment"
	_, _ = r.Mutation().AddComment(ctx, models.CommentInput{
		ID:         wo1.ID,
		EntityType: "WORK_ORDER",
		Text:       ctxt,
	})

	_, _ = r.Mutation().AddComment(ctx, models.CommentInput{
		ID:         wo1.ID,
		EntityType: "WORK_ORDER",
		Text:       "Testing comment 2",
	})

	_, _ = r.client.Activity.Create().
		SetWorkOrder(wo1).
		SetChangedField(activity.ChangedFieldPriority).
		SetOldValue(workorder.PriorityLow.String()).
		SetNewValue(workorder.PriorityHigh.String()).
		SetAuthor(u).
		Save(ctx)

	st = workorder.StatusPlanned
	priority = workorder.PriorityMedium
	woInput2 := models.AddWorkOrderInput{
		Name:            "Work Order 2",
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

func TestEmptyWoExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log
	ctx := viewertest.NewContext(context.Background(), r.client)

	e := &exporterExcel{log, singleWoRower{log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)

	data := prepareSingleWOData(ctx, t, *r)
	workOrder := data.wo2
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()

	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	_, err = excelize.OpenReader(res.Body)
	require.NoError(t, err)
}

func TestSingleWoExport(t *testing.T) {
	r := newExporterTestResolver(t)
	log := r.exporter.log
	ctx := viewertest.NewContext(context.Background(), r.client)

	e := &exporterExcel{log, singleWoRower{log}}
	th := viewertest.TestHandler(t, e, r.client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)

	data := prepareSingleWOData(ctx, t, *r)
	workOrder := data.wo1
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()

	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	_, err = excelize.OpenReader(res.Body)
	require.NoError(t, err)
}
