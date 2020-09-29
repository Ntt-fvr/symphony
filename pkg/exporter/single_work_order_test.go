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
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zaptest/observer"

	"github.com/360EntSecGroup-Skylar/excelize/v2"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func prepareSingleWOData(ctx context.Context, t *testing.T) *ent.WorkOrder {
	PrepareData(ctx, t)
	client := ent.FromContext(ctx)

	// Add templates
	wotype1 := client.WorkOrderType.Create().
		SetName("woTemplate1").
		SetDescription("woTemplate1 = desc").
		SaveX(ctx)

	propStrEnt := client.PropertyType.Create().
		SetName(propStr).
		SetType(propertytype.TypeString).
		SetStringVal("t1").
		SetWorkOrderType(wotype1).
		SaveX(ctx)
	propStr2Ent := client.PropertyType.Create().
		SetName(propStr2).
		SetType(propertytype.TypeString).
		SetWorkOrderType(wotype1).
		SaveX(ctx)

	u := viewer.FromContext(ctx).(*viewer.UserViewer).User()

	projectType := client.ProjectType.Create().
		SetName("projTemplate").
		SaveX(ctx)

	// Add instances
	project := client.Project.Create().
		SetName("Project 1").
		SetCreator(u).
		SetType(projectType).
		SaveX(ctx)

	sizeInBytes := 120
	helpText := "Help Text"
	wo := client.WorkOrder.Create().
		SetName("Work Order 1").
		SetDescription("WO1 - description").
		SetType(wotype1).
		SetLocation(client.Location.Query().Where(location.Name(parentLocation)).OnlyX(ctx)).
		SetProject(project).
		SetCreationDate(time.Now()).
		SetAssignee(u).
		SetStatus(workorder.StatusClosed).
		SetOwner(u).
		SetPriority(workorder.PriorityHigh).
		SaveX(ctx)

	barCLC := client.CheckListCategory.Create().
		SetTitle("Bar").
		SetWorkOrder(wo).
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("Foo").
		SetType(enum.CheckListItemTypeSimple).
		SetIndex(1).
		SetIsMandatory(true).
		SetCheckListCategory(barCLC).
		SaveX(ctx)

	clc := client.CheckListCategory.Create().
		SetTitle("Bar").
		SetWorkOrder(wo).
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("Foo").
		SetType(enum.CheckListItemTypeSimple).
		SetIndex(0).
		SetChecked(false).
		SetCheckListCategory(clc).
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("CellScan").
		SetType(enum.CheckListItemTypeCellScan).
		SetIndex(1).
		SetCheckListCategory(clc).
		SaveX(ctx)
	item3 := client.CheckListItem.Create().
		SetTitle("Files").
		SetType(enum.CheckListItemTypeFiles).
		SetIndex(2).
		SetHelpText(helpText).
		SetCheckListCategory(clc).
		SaveX(ctx)

	client.File.Create().
		SetStoreKey("StoreKeyAlreadyIn").
		SetName("FileAlreadyInWorkOrder").
		SetSize(sizeInBytes).
		SetType("IMAGE").
		SetContentType("").
		SetChecklistItem(item3).
		SaveX(ctx)

	client.File.Create().
		SetStoreKey("StoreKeyToBeDeleted").
		SetName("FileToBeDeleted").
		SetSize(sizeInBytes).
		SetType("IMAGE").
		SetContentType("").
		SetChecklistItem(item3).
		SaveX(ctx)

	client.Property.Create().
		SetType(propStrEnt).
		SetStringVal("string1").
		SetWorkOrder(wo).
		SaveX(ctx)
	client.Property.Create().
		SetType(propStr2Ent).
		SetStringVal("string2").
		SetWorkOrder(wo).
		SaveX(ctx)

	client.Comment.Create().
		SetWorkOrder(wo).
		SetText("Test Comment").
		SetAuthor(u).
		SaveX(ctx)

	client.Comment.Create().
		SetWorkOrder(wo).
		SetText("Testing comment 2").
		SetAuthor(u).
		SaveX(ctx)

	client.Activity.Create().
		SetWorkOrder(wo).
		SetActivityType(activity.ActivityTypePriorityChanged).
		SetOldValue(workorder.PriorityLow.String()).
		SetNewValue(workorder.PriorityHigh.String()).
		SetAuthor(u).
		SaveX(ctx)

	return wo
}

func TestWoWithInvalidId(t *testing.T) {
	core, _ := observer.New(zap.DebugLevel)
	log := log.NewDefaultLogger(zap.New(core))
	client := viewertest.NewTestClient(t)

	e := &ExcelExporter{Log: log, ExcelFile: SingleWoRower{Log: log}}
	th := viewertest.TestHandler(t, e, client)
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
	core, _ := observer.New(zap.DebugLevel)
	log := log.NewDefaultLogger(zap.New(core))
	client := viewertest.NewTestClient(t)

	ctx := viewertest.NewContext(context.Background(), client)
	e := &ExcelExporter{Log: log, ExcelFile: SingleWoRower{Log: log}}
	th := viewertest.TestHandler(t, e, client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	workOrder := prepareSingleWOData(ctx, t)
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	_, err = excelize.OpenReader(res.Body)
	require.NoError(t, err)
}
