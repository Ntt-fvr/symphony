// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/exporter"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/pkg/errors"
)

func setStatus(ctx context.Context, id int, status exporttask.Status) error {
	client := ent.FromContext(ctx)
	err := client.ExportTask.
		UpdateOneID(id).
		SetStatus(status).
		Exec(ctx)
	if err != nil {
		return fmt.Errorf("setting export task status %v failed: %w", status, err)
	}
	return nil
}

func getLocationRows(ctx context.Context, logger log.Logger, et *ent.ExportTask) ([][]string, error) {
	lr := exporter.LocationsRower{
		Log:        logger,
		Concurrent: false,
	}

	allRows, err := lr.Rows(ctx, et.Filters)
	if err != nil {
		return nil, err
	}

	return allRows, nil
}

func handleExportLocations(ctx context.Context, logger log.Logger, et *ent.ExportTask) error {
	if err := setStatus(ctx, et.ID, exporttask.StatusInProgress); err != nil {
		return err
	}
	_, err := getLocationRows(ctx, logger, et)
	if err != nil {
		return errors.Wrap(err, "failed to get locations rows")
	}
	//TODO: Write allRows to AWS S3
	return nil
}

func HandleExport(ctx context.Context, logger log.Logger, entry event.LogEntry) error {
	if entry.Type != ent.TypeExportTask || !entry.Operation.Is(ent.OpCreate) {
		return nil
	}

	var (
		err       error
		statusErr error
	)
	client := ent.FromContext(ctx)
	etID := entry.CurrState.ID
	et, err := client.ExportTask.Get(ctx, etID)
	if err != nil {
		return err
	}

	switch et.Type {
	case exporttask.TypeLocation:
		err = handleExportLocations(ctx, logger, et)
		if err != nil {
			statusErr = setStatus(ctx, etID, exporttask.StatusFailed)
		} else {
			statusErr = setStatus(ctx, etID, exporttask.StatusSucceeded)
		}
		if statusErr != nil {
			return statusErr
		}
		return err
	default:
		return errors.New("not supported entity for async export")
	}
}
