package authz_test

import (
	"context"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/authz/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
)

func TestFlowWritePolicyRule(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	author := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	flow := c.Flow.Create().
		SetCreationDate(time.Now()).
		SetName("Flow").
		SetAuthor(author).
		SaveX(ctx)
	createBlock := func(ctx context.Context) error {
		_, err := c.Flow.Create().
			SetName("New Flow").
			SetCreationDate(time.Now()).
			SetAuthor(author).
			Save(ctx)
		return err
	}
	updateBlock := func(ctx context.Context) error {
		return c.Flow.UpdateOne(flow).
			SetName("Flow 2").
			Exec(ctx)
	}
	deleteBlock := func(ctx context.Context) error {
		return c.Flow.DeleteOne(flow).
			Exec(ctx)
	}
	runCudPolicyTest(t, cudPolicyTest{
		getCud: func(p *models.PermissionSettings) *models.Cud {
			return p.AutomationPolicy.Templates
		},
		create: createBlock,
		update: updateBlock,
		delete: deleteBlock,
	})
}

func TestFlowDraftWritePolicyRule(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	author := viewer.FromContext(ctx).(*viewer.UserViewer).User()
	flow := c.Flow.Create().
		SetName("Flow").
		SetCreationDate(time.Now()).
		SetAuthor(author).
		SaveX(ctx)
	flow2 := c.Flow.Create().
		SetName("Flow 2").
		SetCreationDate(time.Now()).
		SetAuthor(author).
		SaveX(ctx)
	flowDraft := c.FlowDraft.Create().
		SetName("Flow Draft").
		SetFlow(flow).
		SaveX(ctx)
	createBlock := func(ctx context.Context) error {
		_, err := c.FlowDraft.Create().
			SetName("New Flow Draft").
			SetFlow(flow2).
			Save(ctx)
		return err
	}
	updateBlock := func(ctx context.Context) error {
		return c.FlowDraft.UpdateOne(flowDraft).
			SetName("Flow Draft 2").
			Exec(ctx)
	}
	deleteBlock := func(ctx context.Context) error {
		return c.FlowDraft.DeleteOne(flowDraft).
			Exec(ctx)
	}
	runCudPolicyTest(t, cudPolicyTest{
		getCud: func(p *models.PermissionSettings) *models.Cud {
			return p.AutomationPolicy.Templates
		},
		create: createBlock,
		update: updateBlock,
		delete: deleteBlock,
	})
}

func TestBlockWritePolicyRule(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	block := c.Block.Create().
		SetCid("block").
		SetType("START").
		SaveX(ctx)
	createBlock := func(ctx context.Context) error {
		_, err := c.Block.Create().
			SetCid("New block").
			SetType("START").
			Save(ctx)
		return err
	}
	updateBlock := func(ctx context.Context) error {
		return c.Block.UpdateOne(block).
			SetCid("block 2").
			SetType("START").
			Exec(ctx)
	}
	deleteBlock := func(ctx context.Context) error {
		return c.Block.DeleteOne(block).
			Exec(ctx)
	}
	runCudPolicyTest(t, cudPolicyTest{
		getCud: func(p *models.PermissionSettings) *models.Cud {
			return p.AutomationPolicy.Templates
		},
		create: createBlock,
		update: updateBlock,
		delete: deleteBlock,
	})
}

func TestWorkerTypeWritePolicyRule(t *testing.T) {
	c := viewertest.NewTestClient(t)
	ctx := viewertest.NewContext(context.Background(), c)
	workerType := c.WorkerType.Create().
		SetName("worker").
		SaveX(ctx)
	createBlock := func(ctx context.Context) error {
		_, err := c.WorkerType.Create().
			SetName("new worker").
			Save(ctx)
		return err
	}
	updateBlock := func(ctx context.Context) error {
		return c.WorkerType.UpdateOne(workerType).
			SetName("worker 2").
			Exec(ctx)
	}
	deleteBlock := func(ctx context.Context) error {
		return c.WorkerType.DeleteOne(workerType).
			Exec(ctx)
	}
	runCudPolicyTest(t, cudPolicyTest{
		getCud: func(p *models.PermissionSettings) *models.Cud {
			return p.AutomationPolicy.Templates
		},
		create: createBlock,
		update: updateBlock,
		delete: deleteBlock,
	})
}
