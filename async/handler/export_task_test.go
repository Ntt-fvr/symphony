// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package handler_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/async/handler"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/suite"
	"gocloud.dev/blob"
	"gocloud.dev/blob/memblob"
)

type exportTestSuite struct {
	suite.Suite
	client  *ent.Client
	ctx     context.Context
	bucket  *blob.Bucket
	logger  log.Logger
	handler *handler.ExportHandler
}

func (s *exportTestSuite) SetupSuite() {
	s.client = viewertest.NewTestClient(s.T())
	s.ctx = viewertest.NewContext(context.Background(), s.client)
	s.bucket = memblob.OpenBucket(nil)
	s.logger = logtest.NewTestLogger(s.T())
	s.handler = handler.NewExportHandler(s.bucket)
	s.Require().NotNil(s.handler)
}

func TestExports(t *testing.T) {
	suite.Run(t, &exportTestSuite{})
}

func (s *exportTestSuite) TestLocations() {
	task, err := s.createExportTask(s.ctx, s.client, exporttask.TypeLocation)
	s.Require().NoError(err)
	event := s.createLogEntry(task.ID)

	err = s.handler.Handle(s.ctx, s.logger, event)
	s.Require().NoError(err)

	task, err = s.client.ExportTask.Get(s.ctx, task.ID)
	s.Require().NoError(err)
	s.Require().NotNil(task.StoreKey)
	s.Require().Equal(exporttask.StatusSucceeded, task.Status)

	r, err := s.bucket.NewReader(s.ctx, *task.StoreKey, nil)
	s.Require().NoError(err)
	defer r.Close()
	s.Require().Equal("text/csv", r.ContentType())
}

func (s *exportTestSuite) TestBadLocations() {
	task, err := s.createExportTask(s.ctx, s.client, exporttask.TypeEquipment)
	s.Require().NoError(err)
	event := s.createLogEntry(task.ID)

	err = s.handler.Handle(s.ctx, s.logger, event)
	s.Require().Error(err)

	task, err = s.client.ExportTask.Query().Only(s.ctx)
	s.Require().NoError(err)
	s.Require().Nil(task.StoreKey)
	s.Require().Equal(exporttask.StatusFailed, task.Status)
}

func (s *exportTestSuite) createLogEntry(id int) event.LogEntry {
	return event.LogEntry{
		Type:      ent.TypeExportTask,
		Operation: ent.OpCreate,
		CurrState: &ent.Node{
			ID: id,
		},
	}
}

func (s *exportTestSuite) createExportTask(ctx context.Context, client *ent.Client, taskType exporttask.Type) (*ent.ExportTask, error) {
	return client.ExportTask.Create().
		SetType(taskType).
		SetStatus(exporttask.StatusPending).
		Save(ctx)
}
