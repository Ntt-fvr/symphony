// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strconv"
	"strings"
	"testing"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/importer"
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
	fooCL := models.CheckListItemInput{
		Title:       "Simple Item",
		Type:        enum.CheckListItemTypeSimple,
		Index:       pointer.ToInt(0),
		IsMandatory: pointer.ToBool(true),
	}
	clInputs := []*models.CheckListItemInput{&fooCL}

	firstCLC := models.CheckListCategoryInput{
		Title:     "First Category",
		CheckList: clInputs,
	}
	mimeType := "image/jpeg"
	sizeInBytes := 120
	helpText := "Help Text"
	yes := checklistitem.YesNoValYes
	networkType := surveycellscan.NetworkTypeCDMA
	clcInputs := []*models.CheckListCategoryInput{&firstCLC, {
		Title: "Second Category",
		CheckList: []*models.CheckListItemInput{
			{
				Title:              "Enum Item",
				Type:               enum.CheckListItemTypeEnum,
				Index:              pointer.ToInt(0),
				SelectedEnumValues: pointer.ToString("blue, green, yellow"),
			},
			{
				Title:   "Simple Item",
				Type:    enum.CheckListItemTypeSimple,
				Index:   pointer.ToInt(1),
				Checked: pointer.ToBool(false),
			}, {
				Title:       "String Item",
				Type:        enum.CheckListItemTypeString,
				Index:       pointer.ToInt(2),
				StringValue: pointer.ToString("Here is the string"),
			}, {
				Title: "Yes No Item missing value",
				Type:  enum.CheckListItemTypeYesNo,
				Index: pointer.ToInt(3),
			}, {
				Title:         "Yes No Item Yes value",
				Type:          enum.CheckListItemTypeYesNo,
				Index:         pointer.ToInt(4),
				YesNoResponse: &yes,
			}, {
				Title: "Cell Scan",
				Type:  enum.CheckListItemTypeCellScan,
				Index: pointer.ToInt(5),
				CellData: []*models.SurveyCellScanData{
					{
						NetworkType:    networkType,
						SignalStrength: 4,
						Timestamp:      pointer.ToInt(1234567890),
						Latitude:       pointer.ToFloat64(37.1234),
						Longitude:      pointer.ToFloat64(-122.1234),
					},
				},
			}, {
				Title:    "Files",
				Type:     enum.CheckListItemTypeFiles,
				Index:    pointer.ToInt(6),
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
			}, {
				Title: "Wifi Scan",
				Type:  enum.CheckListItemTypeWifiScan,
				Index: pointer.ToInt(7),
				WifiData: []*models.SurveyWiFiScanData{
					{
						Band:         pointer.ToString("N"),
						Bssid:        "00:11:22:33:44:55",
						Ssid:         pointer.ToString("WiFi AP"),
						Capabilities: pointer.ToString("WEP"),
						Channel:      11,
						ChannelWidth: pointer.ToInt(60),
						Frequency:    60,
						Rssi:         pointer.ToFloat64(1.1),
						Strength:     4,
						Latitude:     pointer.ToFloat64(37.1234),
						Longitude:    pointer.ToFloat64(-122.1234),
					},
				},
			},
		},
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
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWo{Log: log}}
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
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWo{Log: log}}
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
		header, err := file.GetCellValue(pkgexporter.SummarySheetName, "A"+strconv.Itoa(i))
		require.NoError(t, err)
		value, err := file.GetCellValue(pkgexporter.SummarySheetName, "B"+strconv.Itoa(i))
		require.NoError(t, err)
		require.Equal(t, pkgexporter.SingleWoDataHeader[i-1], header)
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
			require.Equal(t, value, workOrder.CreationDate.Format(pkgexporter.TimeLayout))
		case "Closed":
			require.Equal(t, value, workOrder.CloseDate.Format(pkgexporter.TimeLayout))
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
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log
	ctx := viewertest.NewContext(context.Background(), r.Client)
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWo{Log: log}}
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

	file, err := excelize.OpenReader(res.Body)
	require.NoError(t, err)

	// The activity log beings on row 14 and is tabular
	//   Author         Activity/Comment                Created                    Updated
	//   fbuser@fb.com  CREATION_DATE set to 123456789  Fri, 25 Sep 2020:01:10:49  Fri, 25 Sep 2020:01:10:49

	// Check the activity log headers are as expected
	const activityLogHeaderRow = "14"
	for i, activityHeader := range pkgexporter.ActivityHeader {
		cell := pkgexporter.Columns[i] + activityLogHeaderRow
		header, err := file.GetCellValue(pkgexporter.SummarySheetName, cell)
		require.NoError(t, err)
		require.Equal(t, activityHeader, header)
	}

	// Check the comments log in row 15-16
	const commentsLogStartingRow = 15
	comments, err := workOrder.QueryComments().Order(ent.Asc(comment.FieldCreateTime)).All(ctx)
	require.NoError(t, err)

	for j, comment := range comments {
		for i, header := range pkgexporter.ActivityHeader {
			cell := pkgexporter.Columns[i] + strconv.Itoa(commentsLogStartingRow+j)
			value, err := file.GetCellValue(pkgexporter.SummarySheetName, cell)
			require.NoError(t, err)
			switch header {
			case "Author":
				author, err := comment.QueryAuthor().Only(ctx)
				require.NoError(t, err)
				require.Equal(t, author.Email, value)
			case "Activity/Comment":
				require.Equal(t, comment.Text, value)
			case "Created":
				require.Equal(t, comment.CreateTime.Format(pkgexporter.TimeLayout), value)
			case "Updated":
				require.Equal(t, comment.UpdateTime.Format(pkgexporter.TimeLayout), value)
			}
		}
	}
	// Check the activities log in row 17-18
	const activitiesLogStartingRow = 17
	activities, err := workOrder.QueryActivities().Order(ent.Asc(activity.FieldCreateTime)).All(ctx)
	require.NoError(t, err)
	for j, activity := range activities {
		for i, header := range pkgexporter.ActivityHeader {
			cell := pkgexporter.Columns[i] + strconv.Itoa(activitiesLogStartingRow+j)
			value, err := file.GetCellValue(pkgexporter.SummarySheetName, cell)
			require.NoError(t, err)
			switch header {
			case "Author":
				author, err := activity.QueryAuthor().Only(ctx)
				require.NoError(t, err)
				require.Equal(t, author.Email, value)
			case "Activity/Comment":
				activityVal := "changed " + activity.ActivityType.String() + " from " + activity.OldValue + " to " + activity.NewValue
				require.Equal(t, activityVal, value)
			case "Created":
				require.Equal(t, activity.CreateTime.Format(pkgexporter.TimeLayout), value)
			case "Updated":
				require.Equal(t, activity.UpdateTime.Format(pkgexporter.TimeLayout), value)
			}
		}
	}
}

func TestSingleWorkOrderExportChecklist(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log
	ctx := viewertest.NewContext(context.Background(), r.Client)
	e := &pkgexporter.ExcelExporter{Log: log, ExcelFile: pkgexporter.SingleWo{Log: log}}
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

	file, err := excelize.OpenReader(res.Body)
	require.NoError(t, err)

	checklists, err := workOrder.QueryCheckListCategories().All(ctx)
	require.NoError(t, err)

	// Each checklist will be a different tab in the spreadsheet
	for _, checklist := range checklists {
		// Test that the first row contains the checklist column headers
		const checklistHeaderRow = "1"
		for i, checklistHeader := range pkgexporter.ChecklistHeader {
			cell := pkgexporter.Columns[i] + checklistHeaderRow
			header, err := file.GetCellValue(checklist.Title, cell)
			require.NoError(t, err)
			require.Equal(t, checklistHeader, header)
		}

		// Test the checklist items data
		items, err := checklist.QueryCheckListItems().All(ctx)
		require.NoError(t, err)
		const checklistItemStartingRow = 2
		for j, item := range items {
			for i, checklistHeader := range pkgexporter.ChecklistHeader {
				cell := pkgexporter.Columns[i] + strconv.Itoa(checklistItemStartingRow+j)
				value, err := file.GetCellValue(checklist.Title, cell)
				fmt.Fprintf(os.Stderr, "sheet %s, cell: %s, value: %s\n", checklist.Title, pkgexporter.Columns[i]+strconv.Itoa(checklistItemStartingRow+j), value)
				require.NoError(t, err)
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
		data.WriteString(strings.Join(pkgexporter.CellScanHeader, ", "))
		data.WriteString("\n\r")
		cellScans, err := item.QueryCellScan().All(ctx)
		require.NoError(t, err)
		for _, cellScan := range cellScans {
			fields := []string{cellScan.CreateTime.Format(pkgexporter.TimeLayout), cellScan.UpdateTime.Format(pkgexporter.TimeLayout), cellScan.NetworkType.String(), strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.Format(pkgexporter.TimeLayout), fmt.Sprintf("%f", *cellScan.Latitude), fmt.Sprintf("%f", *cellScan.Longitude)}
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
		data.WriteString(strings.Join(pkgexporter.WifiScanHeader, ", "))
		data.WriteString("\n\r")
		wifiScans, err := item.QueryWifiScan().All(ctx)
		require.NoError(t, err)
		for _, wifiScan := range wifiScans {
			fields := []string{wifiScan.CreateTime.Format(pkgexporter.TimeLayout), wifiScan.UpdateTime.Format(pkgexporter.TimeLayout), wifiScan.Band, wifiScan.Bssid, wifiScan.Ssid, wifiScan.Capabilities, strconv.Itoa(wifiScan.Channel), strconv.Itoa(wifiScan.ChannelWidth), strconv.Itoa(wifiScan.Frequency), fmt.Sprintf("%f", *wifiScan.Rssi), strconv.Itoa(wifiScan.Strength), fmt.Sprintf("%f", wifiScan.Latitude), fmt.Sprintf("%f", wifiScan.Longitude)}
			data.WriteString(strings.Join(fields, ", "))
			data.WriteString("\n\r")
		}
		require.Equal(t, data.String(), value)
	}
}
