// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"
	"net/url"
	"strconv"

	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type singleWoRower struct {
	log log.Logger
}

var columns = []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "M"}

func (er singleWoRower) createExcelFile(ctx context.Context, url *url.URL) (*excelize.File, error) {
	var (
		logger = er.log.For(ctx)
		err    error
		id     int
	)
	f := excelize.NewFile()
	id, err = strconv.Atoi(url.Query().Get("id"))
	if err != nil {
		logger.Error("work order ID not found", zap.Error(err))
		return nil, errors.Wrap(err, "work order ID not found")
	}

	client := ent.FromContext(ctx)
	node, err := client.Noder(ctx, id)
	if err != nil {
		logger.Error("cannot query work order", zap.Error(err))
		return nil, errors.Wrap(err, "cannot query work order")
	}
	if node == nil {
		return nil, nil
	}
	wo, _ := node.(*ent.WorkOrder)

	err = generateWoSummary(ctx, f, wo)
	if err != nil {
		logger.Error("cannot generate work order", zap.Error(err))
		return nil, errors.Wrap(err, "cannot generate work order")
	}

	checklists, err := wo.QueryCheckListCategories().All(ctx)
	if err != nil {
		logger.Error("cannot query checklist categories", zap.Error(err))
		return nil, errors.Wrap(err, "cannot query checklist categories")
	}

	for i := range checklists {
		sheetName := "CheckList" + strconv.Itoa(i+1)
		f.NewSheet(sheetName)
		items, err := checklists[i].QueryCheckListItems().All(ctx)
		if err != nil {
			logger.Error("cannot query checklist items", zap.Error(err))
			return nil, errors.Wrap(err, "cannot query checklist items")
		}

		err = generateChecklistItems(ctx, items, sheetName, f)
		if err != nil {
			logger.Error("cannot generate checklist items", zap.Error(err))
			return nil, errors.Wrap(err, "cannot generate checklist items")
		}
	}
	return f, nil
}

func generateWoSummary(ctx context.Context, f *excelize.File, wo *ent.WorkOrder) error {
	sheetName := "Summary"
	f.SetSheetName("Sheet1", sheetName)
	currRow := 1
	var projName, woType, locName, assigneeEmail, ownerEmail, closedDate string

	assignee, err := wo.QueryAssignee().Only(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}
	if assignee != nil {
		assigneeEmail = assignee.Email
	}

	owner, err := wo.QueryOwner().Only(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}
	if owner != nil {
		ownerEmail = owner.Email
	}

	project, err := wo.QueryProject().Only(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}
	if project != nil {
		projName = project.Name
	}

	location, err := wo.QueryLocation().Only(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}
	if location != nil {
		locName = location.Name
	}

	wType, err := wo.QueryType().Only(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}
	if wType != nil {
		woType = wType.Name
	}

	comments, err := wo.QueryComments().All(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}

	activities, err := wo.QueryActivities().All(ctx)
	if ent.MaskNotFound(err) != nil {
		return err
	}

	if wo.Status == "DONE" {
		closedDate = wo.CloseDate.String()
	}

	woDataHeader := []string{"ID", "Name", "Description", "Project", "Type", "Priority", "Status", "Creation date", "Close date", "Location", "Assignee", "Owner"}
	data := []string{strconv.Itoa(wo.ID), wo.Name, wo.Description, projName, woType, wo.Priority, wo.Status, wo.CreationDate.String(), closedDate, locName, assigneeEmail, ownerEmail}

	f.SetColWidth(sheetName, "A", "C", 80)
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

	style, _ := f.NewStyle(`{
		"alignment":
		{
			"horizontal": "center",
			"wrap_text": true
		}
	}`)

	for i := 0; i < len(woDataHeader); i++ {
		headerCell := "A" + strconv.Itoa(currRow)
		valueCell := "B" + strconv.Itoa(currRow)
		f.SetCellValue(sheetName, headerCell, woDataHeader[i])
		f.SetCellStyle(sheetName, headerCell, headerCell, headerStyle)
		f.SetCellValue(sheetName, valueCell, data[i])
		f.SetCellStyle(sheetName, valueCell, valueCell, style)
		currRow++
	}

	commentsHeader := []string{"Activity/Comment", "Created at", "Updated at"}

	for i := 0; i < len(commentsHeader); i++ {
		cell := columns[i] + strconv.Itoa(currRow)
		f.SetCellValue(sheetName, cell, commentsHeader[i])
		f.SetCellStyle(sheetName, cell, cell, headerStyle)
	}

	for i := range comments {
		if comments[i] != nil {
			currRow++
			row := strconv.Itoa(currRow)
			f.SetCellValue(sheetName, "A"+row, comments[i].Text)
			f.SetCellValue(sheetName, "B"+row, comments[i].CreateTime.String())
			f.SetCellValue(sheetName, "C"+row, comments[i].UpdateTime.String())
			f.SetCellStyle(sheetName, "A"+row, "C"+row, style)
		}
	}

	for i := range activities {
		currRow++
		author, err := activities[i].QueryAuthor().Only(ctx)
		if ent.MaskNotFound(err) != nil {
			return err
		}
		if author != nil && activities[i] != nil {
			row := strconv.Itoa(currRow)
			f.SetCellValue(sheetName, "A"+row, author.Email+" changed "+activities[i].ChangedField.String()+" from "+activities[i].OldValue+" to "+activities[i].NewValue)
			f.SetCellValue(sheetName, "B"+row, activities[i].CreateTime.String())
			f.SetCellValue(sheetName, "C"+row, activities[i].UpdateTime.String())
			f.SetCellStyle(sheetName, "A"+row, "C"+row, style)
		}
	}

	return nil
}

func generateChecklistItems(ctx context.Context, items []*ent.CheckListItem, sheetName string, f *excelize.File) error {
	checklistHeader := []string{"Description", "Additional instructions", "Type", "Checked"}
	currRow := 1
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

	f.SetColWidth(sheetName, "A", "I", 30)

	for i := range checklistHeader {
		cell := columns[i] + strconv.Itoa(currRow)
		f.SetCellValue(sheetName, cell, checklistHeader[i])
		f.SetCellStyle(sheetName, cell, cell, headerStyle)
	}

	currRow++

	for i := range items {
		item := items[i]
		f.SetCellValue(sheetName, "A"+strconv.Itoa(currRow), item.Title)
		if item.HelpText != nil {
			f.SetCellValue(sheetName, "B"+strconv.Itoa(currRow), *item.HelpText)
		}
		f.SetCellValue(sheetName, "C"+strconv.Itoa(currRow), item.Type)
		f.SetCellValue(sheetName, "D"+strconv.Itoa(currRow), item.Checked)

		currRow++

		if item.Type == "cell_scan" {
			cellScans, err := item.QueryCellScan().All(ctx)
			if ent.MaskNotFound(err) != nil {
				return err
			}

			cellScanHeader := []string{"Created at", "Updated at", "Network Type", "Signal Strength", "Timestamp", "Latitude", "Longitude"}
			for i := range cellScanHeader {
				cell := columns[i] + strconv.Itoa(currRow)
				f.SetCellValue(sheetName, cell, cellScanHeader[i])
				f.SetCellStyle(sheetName, cell, cell, headerStyle)
			}

			currRow++

			for i := range cellScans {
				cellScan := cellScans[i]
				for j := range cellScanHeader {
					data := []string{cellScan.CreateTime.String(), cellScan.UpdateTime.String(), cellScan.NetworkType, strconv.Itoa(cellScan.SignalStrength), cellScan.Timestamp.String(), fmt.Sprintf("%f", cellScan.Latitude), fmt.Sprintf("%f", cellScan.Longitude)}
					f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), data[j])
				}
				currRow++
			}
			currRow++
		}

		if item.Type == "files" {
			files, err := item.QueryFiles().All(ctx)
			if ent.MaskNotFound(err) != nil {
				return err
			}

			fileHeader := []string{"Name", "Type", "Created at", "Modified at", "Uploaded at", "Size", "Category", "Content-type", "Annotation"}
			for i := range fileHeader {
				cell := columns[i] + strconv.Itoa(currRow)
				f.SetCellValue(sheetName, cell, fileHeader[i])
				f.SetCellStyle(sheetName, cell, cell, headerStyle)
			}

			currRow++

			for i := range files {
				file := files[i]
				for j := range fileHeader {
					data := []string{file.Name, file.Type, file.CreateTime.String(), file.ModifiedAt.String(), file.UploadedAt.String(), strconv.Itoa(file.Size), file.Category, file.ContentType, file.Annotation}
					f.SetCellValue(sheetName, columns[j]+strconv.Itoa(currRow), data[j])
				}
				currRow++
			}
			currRow++
		}
	}
	return nil
}
