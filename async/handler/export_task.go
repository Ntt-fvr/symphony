// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler

import (
	"context"
	"encoding/csv"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/exporter"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/google/uuid"
	"github.com/hashicorp/go-multierror"
	"go.uber.org/zap"
	"gocloud.dev/blob"
)

// ExportHandler is the handler struct for export tasks.
type ExportHandler struct {
	bucket       *blob.Bucket
	bucketPrefix string
}

// Interface for getting data rows.
type rower interface {
	Rows(ctx context.Context, filters string) ([][]string, error)
}

// NewExportHandler returns an ExportHandler object with a bucket.
func NewExportHandler(bucket *blob.Bucket, bucketPrefix string) *ExportHandler {
	return &ExportHandler{
		bucket:       bucket,
		bucketPrefix: bucketPrefix,
	}
}

// Handle handles async exports.
func (eh *ExportHandler) Handle(ctx context.Context, logger log.Logger, evt ev.EventObject) error {
	entry, ok := evt.(event.LogEntry)
	if !ok || entry.Type != ent.TypeExportTask || !entry.Operation.Is(ent.OpCreate) {
		return nil
	}
	task, err := ent.FromContext(ctx).ExportTask.Get(ctx, entry.CurrState.ID)
	if err != nil {
		logger.For(ctx).Error("cannot get export task", zap.Error(err), zap.Int("id", entry.CurrState.ID))
		return err
	}

	if err := task.Update().
		SetStatus(exporttask.StatusInProgress).
		Exec(ctx); err != nil {
		logger.For(ctx).Error("cannot update task status", zap.Error(err), zap.Int("id", task.ID))
		return err
	}

	var key string
	switch task.Type {
	case exporttask.TypeLocation, exporttask.TypeEquipment, exporttask.TypePort, exporttask.TypeLink, exporttask.TypeService, exporttask.TypeWorkOrder:
		key, err = eh.export(ctx, logger, task)
	case exporttask.TypeSingleWorkOrder:
		key, err = eh.exportSingleWO(ctx, logger, task)
	default:
		if err = task.Update().SetStatus(exporttask.StatusFailed).Exec(ctx); err != nil {
			logger.For(ctx).Error("cannot update task status", zap.Error(err))
		}
		return fmt.Errorf("unsupported entity type %s", task.Type)
	}

	mutation := task.Update()
	if err != nil {
		mutation.SetStatus(exporttask.StatusFailed)
	} else {
		mutation.SetStatus(exporttask.StatusSucceeded).
			SetStoreKey(key)
	}
	if err := mutation.Exec(ctx); err != nil {
		logger.For(ctx).Error("cannot update task status", zap.Error(err), zap.Int("id", task.ID))
		return err
	}
	return nil
}

// export queries and writes rows to a file, returning the key.
func (eh *ExportHandler) export(ctx context.Context, logger log.Logger, task *ent.ExportTask) (string, error) {
	var (
		exportEntity string
		rower        rower
	)
	switch task.Type {
	case exporttask.TypeLocation:
		rower = exporter.LocationsRower{
			Log: logger,
		}
		exportEntity = "locations"
	case exporttask.TypeEquipment:
		rower = exporter.EquipmentRower{
			Log: logger,
		}
		exportEntity = "equipment"
	case exporttask.TypePort:
		rower = exporter.PortsRower{
			Log: logger,
		}
		exportEntity = "ports"
	case exporttask.TypeLink:
		rower = exporter.LinksRower{
			Log: logger,
		}
		exportEntity = "links"
	case exporttask.TypeService:
		rower = exporter.ServicesRower{
			Log: logger,
		}
		exportEntity = "services"
	case exporttask.TypeWorkOrder:
		rower = exporter.WoRower{
			Log: logger,
		}
		exportEntity = "work-orders"
	default:
		logger.For(ctx).Error("unsupported entity type for export", zap.String("type", task.Type.String()))
		return "", fmt.Errorf("unsupported entity type %s", task.Type)
	}
	rows, err := rower.Rows(ctx, task.Filters)
	if err != nil {
		return "", err
	}

	tenant := viewer.FromContext(ctx).Tenant()
	key := eh.bucketPrefix + uuid.New().String()
	writeKey := tenant + "/" + key
	if err := eh.writeRows(ctx, writeKey, rows, exportEntity); err != nil {
		logger.For(ctx).Error("cannot write rows", zap.Error(err))
		return "", err
	}

	return key, nil
}

// writeRows writer rows into a blob with key as name.
func (eh *ExportHandler) writeRows(ctx context.Context, key string, rows [][]string, exportEntity string) (err error) {
	b, err := eh.bucket.NewWriter(ctx, key, &blob.WriterOptions{
		ContentType: "text/csv",
		ContentDisposition: fmt.Sprintf(
			"attachment; filename=%s-%s.csv",
			exportEntity,
			time.Now().Format(time.RFC3339),
		),
		BeforeWrite: func(asFunc func(interface{}) bool) error {
			var req *s3manager.UploadInput
			if asFunc(&req) {
				req.Tagging = aws.String("autoclean=true")
			}
			return nil
		},
	})
	if err != nil {
		return fmt.Errorf("cannot create bucket writer: %w", err)
	}

	defer func() {
		if cerr := b.Close(); cerr != nil {
			cerr = fmt.Errorf("cannot close writer: %w", cerr)
			err = multierror.Append(err, cerr).ErrorOrNil()
		}
	}()

	if err := csv.NewWriter(b).WriteAll(rows); err != nil {
		return fmt.Errorf("cannot write rows: %w", err)
	}

	return nil
}

func (eh *ExportHandler) exportSingleWO(ctx context.Context, logger log.Logger, task *ent.ExportTask) (string, error) {
	excelExporter := exporter.SingleWo{
		Log: logger,
	}
	if task.WoIDToExport == nil {
		logger.For(ctx).Error("cannot create single work order file, work order id is nil", zap.Int("id", task.ID))
		return "", fmt.Errorf("cannot create single work order file: work order id is nil")
	}

	excelFile, err := excelExporter.CreateExcelFile(ctx, *task.WoIDToExport)
	if err != nil {
		logger.For(ctx).Error("cannot create single work order file", zap.Error(err), zap.Int("id", task.ID))
		return "", fmt.Errorf("cannot create single work order file: %w", err)
	}
	tenant := viewer.FromContext(ctx).Tenant()
	key := eh.bucketPrefix + uuid.New().String()
	writeKey := tenant + "/" + key

	b, err := eh.bucket.NewWriter(ctx, writeKey, &blob.WriterOptions{
		ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		ContentDisposition: fmt.Sprintf(
			"attachment; filename=work-order-%d-%s.xlsx",
			*task.WoIDToExport,
			time.Now().Format(time.RFC3339),
		),
		BeforeWrite: func(asFunc func(interface{}) bool) error {
			var req *s3manager.UploadInput
			if asFunc(&req) {
				req.Tagging = aws.String("autoclean=true")
			}
			return nil
		},
	})
	if err != nil {
		return "", fmt.Errorf("cannot create bucket writer: %w", err)
	}

	defer func() {
		if cerr := b.Close(); cerr != nil {
			cerr = fmt.Errorf("cannot close writer: %w", cerr)
			err = multierror.Append(err, cerr).ErrorOrNil()
		}
	}()

	err = excelFile.Write(b)
	if err != nil {
		logger.For(ctx).Error("cannot write file to bucket", zap.Error(err))
		return "", err
	}

	return key, nil
}
