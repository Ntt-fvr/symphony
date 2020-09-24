// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/comment"

	"github.com/360EntSecGroup-Skylar/excelize/v2"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/zap"
)

type SingleWo struct {
	Log log.Logger
}

var (
	Columns            = []string{"A", "B", "C", "D", "E"}
	SingleWoDataHeader = []string{"ID", "Name", "Description", "Project", "Type", "Priority", "Status", "Created", "Closed", "Location", "Assignee", "Owner"}
	ChecklistHeader    = []string{"Checklist Item", "Is Mandatory", "Response", "Additional Instructions"}
	CellScanHeader     = []string{"Created at", "Updated at", "Network Type", "Signal Strength", "Timestamp", "Latitude", "Longitude"}
	WifiScanHeader     = []string{"Created at", "Updated at", "Band", "BSSID", "SSID", "Capabilities", "Channel", "Channel Width", "Frequency", "RSSI", "Strength", "Latitude", "Longitude"}
	ActivityHeader     = []string{"Author", "Activity/Comment", "Created", "Updated"}
)

const (
	TimeLayout       = "Mon, 02 Jan 2006 15:04:05"
	SummarySheetName = "Summary"
)

func (er SingleWo) CreateExcelFile(ctx context.Context, url *url.URL) (*excelize.File, error) {
	logger := er.Log.For(ctx)
	f := excelize.NewFile()
	id, err := strconv.Atoi(url.Query().Get("id"))
	if err != nil {
		logger.Error("work order ID not found", zap.Error(err))
		return nil, fmt.Errorf("work order ID not found: %w", err)
	}
	client := ent.FromContext(ctx)
	wo, err := client.WorkOrder.Get(ctx, id)
	if err != nil {
		logger.Error("cannot query work order", zap.Error(err))
		return nil, fmt.Errorf("cannot query work order: %w", err)
	}
	if err := generateWoSummary(ctx, f, wo); err != nil {
		logger.Error("cannot generate work order", zap.Error(err))
		return nil, fmt.Errorf("cannot generate work order: %w", err)
	}
	checklists, err := wo.QueryCheckListCategories().All(ctx)
	if err != nil {
		logger.Error("cannot query checklist categories", zap.Error(err))
		return nil, fmt.Errorf("cannot query checklist categories: %w", err)
	}
	for _, checklist := range checklists {
		sheetName := checklist.Title
		f.NewSheet(sheetName)
		items, err := checklist.QueryCheckListItems().All(ctx)
		if err != nil {
			logger.Error("cannot query checklist items", zap.Error(err))
			return nil, fmt.Errorf("cannot query checklist items: %w", err)
		}

		if err := er.generateChecklistItems(ctx, items, sheetName, f); err != nil {
			logger.Error("cannot generate checklist items", zap.Error(err))
			return nil, fmt.Errorf("cannot generate checklist items: %w", err)
		}
	}
	return f, nil
}

func generateWoSummary(ctx context.Context, f *excelize.File, wo *ent.WorkOrder) error {
	f.SetSheetName("Sheet1", SummarySheetName)
	_ = f.SetColWidth(SummarySheetName, "A", "D", 40)
	currRow := 1
	data, err := getSummaryData(ctx, wo)
	if err != nil {
		return err
	}
	for i, value := range data {
		headerCell := "A" + strconv.Itoa(currRow)
		valueCell := "B" + strconv.Itoa(currRow)
		_ = f.SetCellValue(SummarySheetName, headerCell, SingleWoDataHeader[i])
		_ = f.SetCellValue(SummarySheetName, valueCell, value)
		setHeaderStyle(f, SummarySheetName, headerCell)
		currRow++
	}

	comments, err := wo.QueryComments().Order(ent.Asc(comment.FieldCreateTime)).All(ctx)
	if err != nil {
		return err
	}
	activities, err := wo.QueryActivities().Order(ent.Asc(activity.FieldCreateTime)).All(ctx)
	if err != nil {
		return err
	}
	currRow++

	for i, header := range ActivityHeader {
		cell := Columns[i] + strconv.Itoa(currRow)
		_ = f.SetCellValue(SummarySheetName, cell, header)
		setHeaderStyle(f, SummarySheetName, cell)
	}

	for _, comment := range comments {
		currRow++
		row := strconv.Itoa(currRow)
		author, err := comment.QueryAuthor().Only(ctx)
		if err != nil {
			return err
		}
		for j, data := range []string{author.Email, comment.Text, comment.CreateTime.Format(TimeLayout), comment.UpdateTime.Format(TimeLayout)} {
			cell := Columns[j] + row
			_ = f.SetCellValue(SummarySheetName, cell, data)
		}
	}
	for _, activity := range activities {
		currRow++
		author, err := activity.QueryAuthor().Only(ctx)
		if err != nil && !ent.IsNotFound(err) {
			return err
		}
		authorEmail := ""
		if author != nil {
			authorEmail = author.Email
		}
		row := strconv.Itoa(currRow)
		activityVal := "changed " + activity.ActivityType.String() + " from " + activity.OldValue + " to " + activity.NewValue
		if activity.IsCreate {
			activityVal = activity.ActivityType.String() + " set to " + activity.NewValue
		}
		for j, data := range []string{authorEmail, activityVal, activity.CreateTime.Format(TimeLayout), activity.UpdateTime.Format(TimeLayout)} {
			cell := Columns[j] + row
			_ = f.SetCellValue(SummarySheetName, cell, data)
		}
	}
	return nil
}

func (er SingleWo) generateChecklistItems(ctx context.Context, items []*ent.CheckListItem, sheetName string, f *excelize.File) error {
	_ = f.SetColWidth(sheetName, "A", "D", 40)
	_ = f.SetColWidth(sheetName, "B", "B", 11) // Is Mandatory column
	currRow := 1

	for i, header := range ChecklistHeader {
		cell := Columns[i] + strconv.Itoa(currRow)
		_ = f.SetCellValue(sheetName, cell, header)
		setHeaderStyle(f, sheetName, cell)
	}
	currRow++
	for _, item := range items {
		itemString, err := getItemString(ctx, item)
		if err != nil {
			return err
		}
		for j, data := range []string{item.Title, strconv.FormatBool(item.IsMandatory), itemString} {
			_ = f.SetCellValue(sheetName, Columns[j]+strconv.Itoa(currRow), data)
			fmt.Fprintf(os.Stderr, "sheet %s, writing cell: %s, value: %s\n", sheetName, Columns[j]+strconv.Itoa(currRow), data)

		}
		if item.HelpText != nil {
			_ = f.SetCellValue(sheetName, "D"+strconv.Itoa(currRow), *item.HelpText)
		}
		currRow++
	}
	return nil
}

func getItemString(ctx context.Context, item *ent.CheckListItem) (string, error) {
	switch item.Type {
	case enum.CheckListItemTypeEnum:
		return item.SelectedEnumValues, nil
	case enum.CheckListItemTypeSimple:
		return strconv.FormatBool(item.Checked), nil
	case enum.CheckListItemTypeString:
		return item.StringVal, nil
	case enum.CheckListItemTypeYesNo:
		if item.YesNoVal != nil {
			return item.YesNoVal.String(), nil
		}
		return "N/A", nil
	case enum.CheckListItemTypeCellScan:
		data, err := getCellScanData(ctx, item)
		if err != nil {
			return "", err
		}
		return data, nil
	case enum.CheckListItemTypeFiles:
		data, err := getFileData(ctx, item)
		if err != nil {
			return "", err
		}
		return data, nil
	case enum.CheckListItemTypeWifiScan:
		data, err := getWifiScanData(ctx, item)
		if err != nil {
			return "", err
		}
		return data, nil
	}
	return "", nil
}

func getCellScanData(ctx context.Context, item *ent.CheckListItem) (string, error) {
	cellScans, err := item.QueryCellScan().All(ctx)
	if err != nil {
		return "", err
	}
	var data strings.Builder
	data.WriteString(strings.Join(CellScanHeader, ", "))
	data.WriteString("\n\r")
	for _, cellScan := range cellScans {
		fields := []string{cellScan.CreateTime.Format(TimeLayout), cellScan.UpdateTime.Format(TimeLayout), cellScan.NetworkType.String(), strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.Format(TimeLayout), fmt.Sprintf("%f", *cellScan.Latitude), fmt.Sprintf("%f", *cellScan.Longitude)}
		data.WriteString(strings.Join(fields, ", "))
		data.WriteString("\n\r")
	}
	return data.String(), nil
}

func getWifiScanData(ctx context.Context, item *ent.CheckListItem) (string, error) {
	wifiScans, err := item.QueryWifiScan().All(ctx)
	if err != nil {
		return "", err
	}
	var data strings.Builder
	data.WriteString(strings.Join(WifiScanHeader, ", "))
	data.WriteString("\n\r")
	for _, wifiScan := range wifiScans {
		fields := []string{wifiScan.CreateTime.Format(TimeLayout), wifiScan.UpdateTime.Format(TimeLayout), wifiScan.Band, wifiScan.Bssid, wifiScan.Ssid, wifiScan.Capabilities, strconv.Itoa(wifiScan.Channel), strconv.Itoa(wifiScan.ChannelWidth), strconv.Itoa(wifiScan.Frequency), fmt.Sprintf("%f", *wifiScan.Rssi), strconv.Itoa(wifiScan.Strength), fmt.Sprintf("%f", wifiScan.Latitude), fmt.Sprintf("%f", wifiScan.Longitude)}
		data.WriteString(strings.Join(fields, ", "))
		data.WriteString("\n\r")
	}
	return data.String(), nil
}

func getFileData(ctx context.Context, item *ent.CheckListItem) (string, error) {
	files, err := item.QueryFiles().Select(file.FieldName).Strings(ctx)
	if err != nil {
		return "", err
	}
	return strings.Join(files, ", "), nil
}

func getSummaryData(ctx context.Context, wo *ent.WorkOrder) ([]string, error) {
	var (
		projName, woType, woDescription, locName, assigneeEmail, ownerEmail, closedDate string
		err                                                                             error
	)

	assignee, err := wo.QueryAssignee().Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, err
	}
	if assignee != nil {
		assigneeEmail = assignee.Email
	}
	owner, err := wo.QueryOwner().Only(ctx)
	if err != nil {
		return nil, err
	}
	ownerEmail = owner.Email
	project, err := wo.QueryProject().Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, err
	}
	if project != nil {
		projName = project.Name
	}
	location, err := wo.QueryLocation().Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, err
	}
	if location != nil {
		locName = location.Name
	}
	wType, err := wo.QueryType().Only(ctx)
	if err != nil {
		return nil, err
	}
	woType = wType.Name
	if wo.Status == workorder.StatusDone || wo.Status == workorder.StatusClosed {
		closedDate = wo.CloseDate.Format(TimeLayout)
	}
	if wo.Description != nil {
		woDescription = *wo.Description
	}

	return []string{strconv.Itoa(wo.ID), wo.Name, woDescription, projName, woType, wo.Priority.String(), wo.Status.String(), wo.CreationDate.Format(TimeLayout), closedDate, locName, assigneeEmail, ownerEmail}, err
}

func setHeaderStyle(f *excelize.File, sheetName string, cell string) {
	headerStyle, _ := f.NewStyle(`{
		"font":
		{
			"bold": true
		},
		"alignment":
		{
			"wrap_text": true
		}
	}`)
	_ = f.SetCellStyle(sheetName, cell, cell, headerStyle)
}
