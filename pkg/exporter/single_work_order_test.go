// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/checklistitem"
	"github.com/facebookincubator/symphony/pkg/ent/comment"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/surveycellscan"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
	"go.uber.org/zap/zaptest/observer"
)

func prepareSingleWOData(ctx context.Context, t *testing.T) *ent.WorkOrder {
	PrepareData(ctx, t)
	client := ent.FromContext(ctx)

	// Create a Work Order Type
	wotype := client.WorkOrderType.Create().
		SetName("woTemplate1").
		SetDescription("woTemplate1 = desc").
		SaveX(ctx)

	// Create a Property Type
	client.PropertyType.Create().
		SetName(propStr).
		SetType(propertytype.TypeString).
		SetStringVal("t1").
		SetWorkOrderType(wotype).
		SaveX(ctx)

	// Create a Project Type
	projectType := client.ProjectType.Create().
		SetName("projTemplate").
		SaveX(ctx)

	// Create a Project
	user := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	project := client.Project.Create().
		SetName("Project 1").
		SetCreator(user).
		SetType(projectType).
		SaveX(ctx)

	// Create a Work Order
	st := workorder.StatusClosed
	priority := workorder.PriorityHigh
	wo := client.WorkOrder.Create().
		SetName("WO1").
		SetDescription("WO1 - description").
		SetType(wotype).
		SetLocation(client.Location.Query().Where(location.Name(parentLocation)).OnlyX(ctx)).
		SetProject(project).
		SetAssignee(user).
		SetStatus(st).
		SetPriority(priority).
		SetOwner(user).
		SetCreationDate(time.Now()).
		SaveX(ctx)

	// Create a Work Order Property
	propStrEnt := wotype.QueryPropertyTypes().Where(propertytype.Name(propStr)).OnlyX(ctx)
	client.Property.Create().
		SetType(propStrEnt).
		SetStringVal("string1").
		SetWorkOrder(wo).
		SaveX(ctx)

	// Create two Activities
	client.Activity.Create().
		SetWorkOrder(wo).
		SetActivityType(activity.ActivityTypePriorityChanged).
		SetOldValue(workorder.PriorityLow.String()).
		SetNewValue(workorder.PriorityHigh.String()).
		SetAuthor(user).
		SaveX(ctx)

	client.Activity.Create().
		SetWorkOrder(wo).
		SetActivityType(activity.ActivityTypePriorityChanged).
		SetOldValue(workorder.PriorityHigh.String()).
		SetNewValue(workorder.PriorityLow.String()).
		SetAuthor(user).
		SaveX(ctx)

	// Create two Comments
	client.Comment.Create().
		SetWorkOrder(wo).
		SetAuthor(user).
		SetText("comment text 1").
		SaveX(ctx)

	client.Comment.Create().
		SetWorkOrder(wo).
		SetAuthor(user).
		SetText("comment text 2").
		SaveX(ctx)

	// Create Checklist Categories
	category1 := client.CheckListCategory.Create().
		SetTitle("First Category").
		SetWorkOrder(wo).
		SaveX(ctx)
	category2 := client.CheckListCategory.Create().
		SetTitle("Second Category").
		SetWorkOrder(wo).
		SaveX(ctx)

	// Create Checklist Item for First Category
	client.CheckListItem.Create().
		SetCheckListCategory(category1).
		SetTitle("Simple Item").
		SetType(enum.CheckListItemTypeSimple).
		SetIndex(0).
		SetIsMandatory(true).
		SetChecked(true).
		SaveX(ctx)

	// Create Checklist Item for Second Category
	client.CheckListItem.Create().
		SetTitle("Simple Item").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeSimple).
		SetIndex(0).
		SetIsMandatory(true).
		SetChecked(true).
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("Enum Item").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeEnum).
		SetIndex(1).
		SetIsMandatory(true).
		SetEnumValues("blue, green, yellow").
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("String Item").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeString).
		SetIndex(2).
		SetIsMandatory(false).
		SetStringVal("Here is the string").
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("Yes/No Item - Yes").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeYesNo).
		SetIndex(3).
		SetIsMandatory(false).
		SetYesNoVal(checklistitem.YesNoValYes).
		SaveX(ctx)

	client.CheckListItem.Create().
		SetTitle("Yes/No Item - Empty").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeYesNo).
		SetIndex(4).
		SetIsMandatory(false).
		SaveX(ctx)

	cellScanItem := client.CheckListItem.Create().
		SetTitle("Cell Scan").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeCellScan).
		SetIndex(5).
		SetIsMandatory(false).
		SaveX(ctx)

	client.SurveyCellScan.Create().
		SetChecklistItem(cellScanItem).
		SetNetworkType(surveycellscan.NetworkTypeCDMA).
		SetSignalStrength(4).
		SetTimestamp(time.Now()).
		SetLatitude(37.1234).
		SetLongitude(-122.1234).
		SaveX(ctx)

	wifiScanItem := client.CheckListItem.Create().
		SetTitle("WiFi Scan").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeWifiScan).
		SetIndex(6).
		SetIsMandatory(false).
		SaveX(ctx)

	client.SurveyWiFiScan.Create().
		SetChecklistItem(wifiScanItem).
		SetStrength(4).
		SetBand("N").
		SetBssid("00:11:22:33:44:55").
		SetSsid("WiFi AP").
		SetCapabilities("WEP").
		SetChannel(11).
		SetChannelWidth(60).
		SetFrequency(60).
		SetRssi(1.1).
		SetStrength(4).
		SetTimestamp(time.Now()).
		SetLatitude(37.1234).
		SetLongitude(-122.1234).
		SaveX(ctx)

	fileItem := client.CheckListItem.Create().
		SetTitle("Files").
		SetCheckListCategory(category2).
		SetType(enum.CheckListItemTypeFiles).
		SetIndex(7).
		SetIsMandatory(false).
		SetHelpText("Help Text").
		SaveX(ctx)

	client.File.Create().
		SetChecklistItem(fileItem).
		SetStoreKey("StoreKeyAlreadyIn").
		SetName("image.jpg").
		SetSize(1024).
		SetType(file.TypeImage).
		SetContentType("image/jpg").
		SaveX(ctx)

	return wo
}

func TestWoWithInvalidId(t *testing.T) {
	core, _ := observer.New(zap.DebugLevel)
	log := log.NewDefaultLogger(zap.New(core))
	client := viewertest.NewTestClient(t)

	e := &ExcelExporter{Log: log, ExcelFile: SingleWo{Log: log}}
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

	e := &ExcelExporter{Log: log, ExcelFile: SingleWo{Log: log}}
	th := viewertest.TestHandler(t, e, client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	ctx := viewertest.NewContext(context.Background(), client)
	workOrder := prepareSingleWOData(ctx, t)
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	file, err := excelize.OpenReader(res.Body)
	require.NoError(t, err)

	// Verify all the Work Order summary data is correct.
	// The Work Order summary is displayed in columns A and B in the first 12 rows:
	//   Column A      Column B
	//   ------------  -----------------
	//   ID            123456789
	//   Name          Work Order 1
	//   Description   WO1 - description
	//   ....          ....
	for i := 1; i <= 12; i++ {
		header, _ := file.GetCellValue(SummarySheetName, "A"+strconv.Itoa(i))
		value, _ := file.GetCellValue(SummarySheetName, "B"+strconv.Itoa(i))
		require.Equal(t, SingleWoDataHeader[i-1], header)
		switch header {
		case "ID":
			require.Equal(t, value, strconv.Itoa(workOrder.ID))
		case "Name":
			require.Equal(t, value, workOrder.Name)
		case "Description":
			require.Equal(t, value, *workOrder.Description)
		case "Project":
			project, err := workOrder.QueryProject().Only(ctx)
			require.NoError(t, err)
			require.Equal(t, value, project.Name)
		case "Type":
			workOrderType, err := workOrder.QueryType().Only(ctx)
			require.NoError(t, err)
			require.Equal(t, value, workOrderType.Name)
		case "Priority":
			require.Equal(t, value, workOrder.Priority.String())
		case "Status":
			require.Equal(t, value, workOrder.Status.String())
		case "Created":
			require.Equal(t, value, workOrder.CreationDate.Format(TimeLayout))
		case "Closed":
			require.Equal(t, value, workOrder.CloseDate.Format(TimeLayout))
		case "Location":
			location, err := workOrder.QueryLocation().Only(ctx)
			require.NoError(t, err)
			require.Equal(t, value, location.Name)
		case "Assignee":
			assignee, err := workOrder.QueryAssignee().Only(ctx)
			require.NoError(t, err)
			require.Equal(t, value, assignee.Email)
		case "Owner":
			owner, err := workOrder.QueryOwner().Only(ctx)
			require.NoError(t, err)
			require.Equal(t, value, owner.Email)
		}
	}
}

func TestSingleWorkOrderExportActivitiesAndComments(t *testing.T) {
	core, _ := observer.New(zap.DebugLevel)
	log := log.NewDefaultLogger(zap.New(core))
	client := viewertest.NewTestClient(t)

	e := &ExcelExporter{Log: log, ExcelFile: SingleWo{Log: log}}
	th := viewertest.TestHandler(t, e, client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	ctx := viewertest.NewContext(context.Background(), client)
	workOrder := prepareSingleWOData(ctx, t)
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	file, err := excelize.OpenReader(res.Body)
	require.NoError(t, err)

	// The activity log beings on row 14 and is tabular
	//   Author         Activity/Comment                Created                    Updated
	//   fbuser@fb.com  CREATION_DATE set to 123456789  Fri, 25 Sep 2020:01:10:49  Fri, 25 Sep 2020:01:10:49

	// Check the activity log headers are as expected
	const activityLogHeaderRow = "14"
	for i, activityHeader := range ActivityHeader {
		cell := Columns[i] + activityLogHeaderRow
		header, _ := file.GetCellValue(SummarySheetName, cell)
		require.Equal(t, activityHeader, header)
	}

	// Check the comments log in row 15-16
	const commentsLogStartingRow = 15
	comments, err := workOrder.QueryComments().Order(ent.Asc(comment.FieldCreateTime)).All(ctx)
	require.NoError(t, err)

	for j, comment := range comments {
		for i, header := range ActivityHeader {
			cell := Columns[i] + strconv.Itoa(commentsLogStartingRow+j)
			value, _ := file.GetCellValue(SummarySheetName, cell)
			switch header {
			case "Author":
				author, err := comment.QueryAuthor().Only(ctx)
				require.NoError(t, err)
				require.Equal(t, author.Email, value)
			case "Activity/Comment":
				require.Equal(t, comment.Text, value)
			case "Created":
				require.Equal(t, comment.CreateTime.Format(TimeLayout), value)
			case "Updated":
				require.Equal(t, comment.UpdateTime.Format(TimeLayout), value)
			}
		}
	}
	// Check the activities log in row 17-18
	const activitiesLogStartingRow = 17
	activities, err := workOrder.QueryActivities().Order(ent.Asc(activity.FieldCreateTime)).All(ctx)
	require.NoError(t, err)
	for j, activity := range activities {
		for i, header := range ActivityHeader {
			cell := Columns[i] + strconv.Itoa(activitiesLogStartingRow+j)
			value, _ := file.GetCellValue(SummarySheetName, cell)
			switch header {
			case "Author":
				author, err := activity.QueryAuthor().Only(ctx)
				require.NoError(t, err)
				require.Equal(t, author.Email, value)
			case "Activity/Comment":
				activityVal := "changed " + activity.ActivityType.String() + " from " + activity.OldValue + " to " + activity.NewValue
				require.Equal(t, activityVal, value)
			case "Created":
				require.Equal(t, activity.CreateTime.Format(TimeLayout), value)
			case "Updated":
				require.Equal(t, activity.UpdateTime.Format(TimeLayout), value)
			}
		}
	}
}

func TestSingleWorkOrderExportChecklist(t *testing.T) {
	core, _ := observer.New(zap.DebugLevel)
	log := log.NewDefaultLogger(zap.New(core))
	client := viewertest.NewTestClient(t)

	e := &ExcelExporter{Log: log, ExcelFile: SingleWo{Log: log}}
	th := viewertest.TestHandler(t, e, client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	ctx := viewertest.NewContext(context.Background(), client)
	workOrder := prepareSingleWOData(ctx, t)
	q := req.URL.Query()
	q.Add("id", strconv.Itoa(workOrder.ID))
	req.URL.RawQuery = q.Encode()
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	file, err := excelize.OpenReader(res.Body)
	require.NoError(t, err)

	checklists, err := workOrder.QueryCheckListCategories().All(ctx)
	require.NoError(t, err)

	// Each checklist will be a different tab in the spreadsheet
	for _, checklist := range checklists {
		// Test that the first row contains the checklist column headers
		const checklistHeaderRow = "1"
		for i, checklistHeader := range ChecklistHeader {
			cell := Columns[i] + checklistHeaderRow
			header, _ := file.GetCellValue(checklist.Title, cell)
			require.Equal(t, checklistHeader, header)
		}

		// Test the checklist items data
		items, err := checklist.QueryCheckListItems().All(ctx)
		require.NoError(t, err)
		const checklistItemStartingRow = 2
		for j, item := range items {
			for i, checklistHeader := range ChecklistHeader {
				cell := Columns[i] + strconv.Itoa(checklistItemStartingRow+j)
				value, _ := file.GetCellValue(checklist.Title, cell)
				switch checklistHeader {
				case "Checklist Item":
					require.Equal(t, item.Title, value)
				case "Is Mandatory":
					require.Equal(t, strconv.FormatBool(item.IsMandatory), value)
				case "Response":
					checkItemType(ctx, t, item, value)
				case "Additional Instructions":
					if item.HelpText != nil {
						require.Equal(t, *item.HelpText, value)
					}
				}
			}
		}
	}
}

func checkItemType(ctx context.Context, t *testing.T, item *ent.CheckListItem, value string) {
	switch item.Type {
	case enum.CheckListItemTypeEnum:
		require.Equal(t, item.SelectedEnumValues, value)
	case enum.CheckListItemTypeSimple:
		require.Equal(t, strconv.FormatBool(item.Checked), value)
	case enum.CheckListItemTypeString:
		require.Equal(t, item.StringVal, value)
	case enum.CheckListItemTypeYesNo:
		if item.YesNoVal != nil {
			require.Equal(t, item.YesNoVal.String(), value)
		} else {
			require.Equal(t, "N/A", value)
		}
	case enum.CheckListItemTypeCellScan:
		var data strings.Builder
		data.WriteString(strings.Join(CellScanHeader, ", "))
		data.WriteString("\n\r")
		cellScans, err := item.QueryCellScan().All(ctx)
		require.NoError(t, err)
		for _, cellScan := range cellScans {
			fields := []string{cellScan.CreateTime.Format(TimeLayout), cellScan.UpdateTime.Format(TimeLayout), cellScan.NetworkType.String(), strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.Format(TimeLayout), fmt.Sprintf("%f", *cellScan.Latitude), fmt.Sprintf("%f", *cellScan.Longitude)}
			data.WriteString(strings.Join(fields, ", "))
			data.WriteString("\n\r")
		}
		require.Equal(t, data.String(), value)
	case enum.CheckListItemTypeFiles:
		files, err := item.QueryFiles().Select(file.FieldName).Strings(ctx)
		require.NoError(t, err)
		require.Equal(t, strings.Join(files, ", "), value)
	case enum.CheckListItemTypeWifiScan:
		var data strings.Builder
		data.WriteString(strings.Join(WifiScanHeader, ", "))
		data.WriteString("\n\r")
		wifiScans, err := item.QueryWifiScan().All(ctx)
		require.NoError(t, err)
		for _, wifiScan := range wifiScans {
			fields := []string{wifiScan.CreateTime.Format(TimeLayout), wifiScan.UpdateTime.Format(TimeLayout), wifiScan.Band, wifiScan.Bssid, wifiScan.Ssid, wifiScan.Capabilities, strconv.Itoa(wifiScan.Channel), strconv.Itoa(wifiScan.ChannelWidth), strconv.Itoa(wifiScan.Frequency), fmt.Sprintf("%f", *wifiScan.Rssi), strconv.Itoa(wifiScan.Strength), fmt.Sprintf("%f", wifiScan.Latitude), fmt.Sprintf("%f", wifiScan.Longitude)}
			data.WriteString(strings.Join(fields, ", "))
			data.WriteString("\n\r")
		}
		require.Equal(t, data.String(), value)
	}
}
