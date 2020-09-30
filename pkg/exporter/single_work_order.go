// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"net/url"
	"strconv"
	"strings"

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
	columns            = []string{"A", "B", "C", "D", "E"}
	singleWoDataHeader = []string{"ID", "Name", "Description", "Project", "Type", "Priority", "Status", "Created", "Closed", "Location", "Assignee", "Owner"}
	checklistHeader    = []string{"Checklist Item", "Is Mandatory", "Response", "Additional instructions"}
	cellScanHeader     = []string{"Created at", "Updated at", "Network Type", "Signal Strength", "Timestamp", "Latitude", "Longitude"}
	wifiScanHeader     = []string{"Created at", "Updated at", "Band", "BSSID", "SSID", "Capabilities", "Channel", "Channel Width", "Frequency", "RSSI", "Strength", "Latitude", "Longitude"}
	activityHeader     = []string{"Author", "Activity/Comment", "Created", "Updated"}
)

const (
	timeLayout       = "Mon, 02 Jan 2006 15:04:05"
	summarySheetName = "Summary"
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
	f.SetSheetName("Sheet1", summarySheetName)
	_ = f.SetColWidth(summarySheetName, "A", "D", 40)
	currRow := 1
	data, err := getSummaryData(ctx, wo)
	if err != nil {
		return err
	}
	for i, value := range data {
		headerCell := "A" + strconv.Itoa(currRow)
		valueCell := "B" + strconv.Itoa(currRow)
		_ = f.SetCellValue(summarySheetName, headerCell, singleWoDataHeader[i])
		_ = f.SetCellValue(summarySheetName, valueCell, value)
		setHeaderStyle(f, summarySheetName, headerCell)
		currRow++
	}

	comments, err := wo.QueryComments().All(ctx)
	if err != nil {
		return err
	}
	activities, err := wo.QueryActivities().All(ctx)
	if err != nil {
		return err
	}
	currRow++

	for i, header := range activityHeader {
		cell := columns[i] + strconv.Itoa(currRow)
		_ = f.SetCellValue(summarySheetName, cell, header)
		setHeaderStyle(f, summarySheetName, cell)
	}

	for _, comment := range comments {
		currRow++
		row := strconv.Itoa(currRow)
		author, err := comment.QueryAuthor().Only(ctx)
		if err != nil {
			return err
		}
		for j, data := range []string{author.Email, comment.Text, comment.CreateTime.Format(timeLayout), comment.UpdateTime.Format(timeLayout)} {
			cell := columns[j] + row
			_ = f.SetCellValue(summarySheetName, cell, data)
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
		for j, data := range []string{authorEmail, activityVal, activity.CreateTime.Format(timeLayout), activity.UpdateTime.Format(timeLayout)} {
			cell := columns[j] + row
			_ = f.SetCellValue(summarySheetName, cell, data)
		}
	}
	return nil
}

func (er SingleWo) generateChecklistItems(ctx context.Context, items []*ent.CheckListItem, sheetName string, f *excelize.File) error {
	_ = f.SetColWidth(sheetName, "A", "D", 40)
	_ = f.SetColWidth(sheetName, "B", "B", 11) // Is Mandatory column
	currRow := 1

	for i, header := range checklistHeader {
		cell := columns[i] + strconv.Itoa(currRow)
		_ = f.SetCellValue(sheetName, cell, header)
		setHeaderStyle(f, sheetName, cell)
	}
	currRow++
	for _, item := range items {
		for j, data := range []string{item.Title, strconv.FormatBool(item.IsMandatory), getItemString(ctx, item)} {
<<<<<<< HEAD
			_ = f.SetCellValue(sheetName, Columns[j]+strconv.Itoa(currRow), data)
			fmt.Fprintf(os.Stderr, "sheet %s, writing cell: %s, value: %s\n", sheetName, Columns[j]+strconv.Itoa(currRow), data)
=======
			_ = f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), data)
>>>>>>> parent of a609247f... Extended single_work_order export tests to include all item types
		}
		if item.HelpText != nil {
			_ = f.SetCellValue(sheetName, "D"+strconv.Itoa(currRow), *item.HelpText)
		}
		currRow++
	}
	return nil
}

func getItemString(ctx context.Context, item *ent.CheckListItem) string {
	switch item.Type {
	case enum.CheckListItemTypeEnum:
		return item.SelectedEnumValues
	case enum.CheckListItemTypeSimple:
		return strconv.FormatBool(item.Checked)
	case enum.CheckListItemTypeString:
		return item.StringVal
	case enum.CheckListItemTypeYesNo:
		if item.YesNoVal != nil {
			return item.YesNoVal.String()
		}
		return "N/A"
	case enum.CheckListItemTypeCellScan:
		data, err := getCellScanData(ctx, item)
		if err != nil {
			return ""
		}
		return data
	case enum.CheckListItemTypeFiles:
		data, err := getFileData(ctx, item)
		if err != nil {
			return ""
		}
		return data
	case enum.CheckListItemTypeWifiScan:
		data, err := getWifiScanData(ctx, item)
		if err != nil {
			return ""
		}
		return data
	}
	return ""
}

func getCellScanData(ctx context.Context, item *ent.CheckListItem) (string, error) {
	cellScans, err := item.QueryCellScan().All(ctx)
	if err != nil {
		return "", err
	}
	var data strings.Builder
	data.WriteString(strings.Join(cellScanHeader, ", "))
	data.WriteString("\n\r")
	for _, cellScan := range cellScans {
		fields := []string{cellScan.CreateTime.Format(timeLayout), cellScan.UpdateTime.Format(timeLayout), cellScan.NetworkType.String(), strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.Format(timeLayout), fmt.Sprintf("%f", *cellScan.Latitude), fmt.Sprintf("%f", *cellScan.Longitude)}
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
	data.WriteString(strings.Join(wifiScanHeader, ", "))
	data.WriteString("\n\r")
	for _, wifiScan := range wifiScans {
		fields := []string{wifiScan.CreateTime.Format(timeLayout), wifiScan.UpdateTime.Format(timeLayout), wifiScan.Band, wifiScan.Bssid, wifiScan.Ssid, wifiScan.Capabilities, strconv.Itoa(wifiScan.Channel), strconv.Itoa(wifiScan.ChannelWidth), strconv.Itoa(wifiScan.Frequency), fmt.Sprintf("%f", *wifiScan.Rssi), strconv.Itoa(wifiScan.Strength), fmt.Sprintf("%f", wifiScan.Latitude), fmt.Sprintf("%f", wifiScan.Longitude)}
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
		closedDate = wo.CloseDate.Format(timeLayout)
	}
	if wo.Description != nil {
		woDescription = *wo.Description
	}

	return []string{strconv.Itoa(wo.ID), wo.Name, woDescription, projName, woType, wo.Priority.String(), wo.Status.String(), wo.CreationDate.Format(timeLayout), closedDate, locName, assigneeEmail, ownerEmail}, err
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
