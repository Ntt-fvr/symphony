// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"net/url"
	"strconv"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/log"

	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type singleWoRower struct {
	log log.Logger
}

var (
	columns            = []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "M"}
	singleWoDataHeader = []string{"ID", "Name", "Description", "Project", "Type", "Priority", "Status", "Creation date", "Close date", "Location", "Assignee", "Owner"}
	checklistHeader    = []string{"Description", "Type", "Is Mandatory", "Checked", "Additional instructions"}
	cellScanHeader     = []string{"Created at", "Updated at", "Network Type", "Signal Strength", "Timestamp", "Latitude", "Longitude"}
	fileHeader         = []string{"Name", "Type", "Created at", "Modified at", "Uploaded at", "Size", "Category", "Content-type", "Annotation"}
	activityHeader     = []string{"Author", "Activity/Comment", "Created at", "Updated at"}
)

const (
	timeLayout       = "Mon, 02 Jan 2006 15:04:05"
	summarySheetName = "Summary"
)

func (er singleWoRower) createExcelFile(ctx context.Context, url *url.URL) (*excelize.File, error) {
	logger := er.log.For(ctx)
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
		return nil, errors.Wrap(err, "cannot query work order")
	}
	if err := generateWoSummary(ctx, f, wo); err != nil {
		logger.Error("cannot generate work order", zap.Error(err))
		return nil, errors.Wrap(err, "cannot generate work order")
	}
	checklists, err := wo.QueryCheckListCategories().All(ctx)
	if err != nil {
		logger.Error("cannot query checklist categories", zap.Error(err))
		return nil, errors.Wrap(err, "cannot query checklist categories")
	}
	for i, checklist := range checklists {
		sheetName := "CheckList" + strconv.Itoa(i+1)
		f.NewSheet(sheetName)
		items, err := checklist.QueryCheckListItems().All(ctx)
		if err != nil {
			logger.Error("cannot query checklist items", zap.Error(err))
			return nil, errors.Wrap(err, "cannot query checklist items")
		}

		if err := generateChecklistItems(ctx, items, sheetName, f); err != nil {
			logger.Error("cannot generate checklist items", zap.Error(err))
			return nil, errors.Wrap(err, "cannot generate checklist items")
		}
	}
	return f, nil
}

func generateWoSummary(ctx context.Context, f *excelize.File, wo *ent.WorkOrder) error {
	f.SetSheetName("Sheet1", summarySheetName)
	f.SetColWidth(summarySheetName, "A", "D", 80)
	currRow := 1
	data, err := getSummaryData(ctx, wo)
	if err != nil {
		return err
	}
	for i, value := range data {
		headerCell := "A" + strconv.Itoa(currRow)
		valueCell := "B" + strconv.Itoa(currRow)
		f.SetCellValue(summarySheetName, headerCell, singleWoDataHeader[i])
		f.SetCellValue(summarySheetName, valueCell, value)
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
		f.SetCellValue(summarySheetName, cell, header)
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
			f.SetCellValue(summarySheetName, cell, data)
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
			f.SetCellValue(summarySheetName, cell, data)
		}
	}
	return nil
}

func generateChecklistItems(ctx context.Context, items []*ent.CheckListItem, sheetName string, f *excelize.File) error {
	f.SetColWidth(sheetName, "A", "I", 30)
	currRow := 1

	for i, header := range checklistHeader {
		cell := columns[i] + strconv.Itoa(currRow)
		f.SetCellValue(sheetName, cell, header)
		setHeaderStyle(f, summarySheetName, cell)
	}
	currRow++

	for _, item := range items {
		for j, data := range []string{item.Title, item.Type.String(), strconv.FormatBool(item.IsMandatory), strconv.FormatBool(item.Checked)} {
			f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), data)
		}
		if item.HelpText != nil {
			f.SetCellValue(sheetName, "E"+strconv.Itoa(currRow), *item.HelpText)
		}
		currRow++

		if item.Type == enum.CheckListItemTypeCellScan {
			cellScans, err := item.QueryCellScan().All(ctx)
			if err != nil {
				return err
			}
			for i, header := range cellScanHeader {
				cell := columns[i] + strconv.Itoa(currRow)
				f.SetCellValue(sheetName, cell, header)
				setHeaderStyle(f, summarySheetName, cell)
			}
			currRow++
			for _, cellScan := range cellScans {
				for j, value := range []string{cellScan.CreateTime.Format(timeLayout), cellScan.UpdateTime.Format(timeLayout), cellScan.NetworkType.String(), strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.Format(timeLayout), fmt.Sprintf("%f", *cellScan.Latitude), fmt.Sprintf("%f", *cellScan.Longitude)} {
					f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), value)
				}
				currRow++
			}
		}

		if item.Type == enum.CheckListItemTypeFiles {
			files, err := item.QueryFiles().All(ctx)
			if err != nil {
				return err
			}
			for i, header := range fileHeader {
				cell := columns[i] + strconv.Itoa(currRow)
				f.SetCellValue(sheetName, cell, header)
				setHeaderStyle(f, summarySheetName, cell)
			}
			currRow++
			for _, file := range files {
				for j, data := range []string{file.Name, file.Type.String(), file.CreateTime.Format(timeLayout), file.ModifiedAt.Format(timeLayout), file.UploadedAt.Format(timeLayout), strconv.Itoa(file.Size), file.Category, file.ContentType, file.Annotation} {
					f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), data)
				}
				currRow++
			}
		}
	}
	return nil
}

func getSummaryData(ctx context.Context, wo *ent.WorkOrder) ([]string, error) {
	var (
		projName, woType, locName, assigneeEmail, ownerEmail, closedDate string
		err                                                              error
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

	return []string{strconv.Itoa(wo.ID), wo.Name, *wo.Description, projName, woType, wo.Priority.String(), wo.Status.String(), wo.CreationDate.Format(timeLayout), closedDate, locName, assigneeEmail, ownerEmail}, err
}

func setHeaderStyle(f *excelize.File, sheetName string, cell string) {
	headerStyle, _ := f.NewStyle(`{
		"font":
		{
			"bold": true
		},
		"alignment":
		{
			"horizontal": "center",
			"wrap_text": true
		}
	}`)
	f.SetCellStyle(sheetName, cell, cell, headerStyle)
}
