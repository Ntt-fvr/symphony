// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ent/flow"
	"github.com/facebookincubator/symphony/pkg/ent/flowdraft"
	"github.com/facebookincubator/symphony/pkg/flowengine"
)

type flowResolver struct{}

func (r flowResolver) Blocks(ctx context.Context, obj *ent.Flow) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.BlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryBlocks().All(ctx)
}

func (r flowResolver) Draft(ctx context.Context, obj *ent.Flow) (*ent.FlowDraft, error) {
	draft, err := obj.QueryDraft().
		Only(ctx)
	return draft, ent.MaskNotFound(err)
}

type flowDraftResolver struct{}

func (r flowDraftResolver) Blocks(ctx context.Context, obj *ent.FlowDraft) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.BlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryBlocks().All(ctx)
}

func (r mutationResolver) AddFlowDraft(ctx context.Context, input models.AddFlowDraftInput) (*ent.FlowDraft, error) {
	client := r.ClientFrom(ctx)
	flowDraft, err := client.FlowDraft.Create().
		SetName(input.Name).
		SetNillableDescription(input.Description).
		SetNillableFlowID(input.FlowID).
		SetEndParamDefinitions(input.EndParamDefinitions).
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create flow draft: %w", err)
	}
	if input.FlowID != nil {
		blockQuery := client.Block.Query().
			Where(block.HasFlowWith(flow.ID(*input.FlowID)))
		setFlowDraft := func(b *ent.BlockCreate) {
			b.SetFlowDraft(flowDraft)
		}
		if err := flowengine.CopyBlocks(ctx, blockQuery, setFlowDraft); err != nil {
			return nil, err
		}
	}
	return flowDraft, nil
}

func (r mutationResolver) PublishFlow(ctx context.Context, input models.PublishFlowInput) (*ent.Flow, error) {
	var err error
	client := r.ClientFrom(ctx)
	flowDraft, err := client.FlowDraft.Query().
		Where(flowdraft.ID(input.FlowDraftID)).
		WithBlocks().
		WithFlow().
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("flow draft not found: %w", err)
	}
	outputFlow := flowDraft.Edges.Flow
	if outputFlow == nil {
		outputFlow, err = client.Flow.Create().
			SetName(flowDraft.Name).
			SetNillableDescription(flowDraft.Description).
			SetEndParamDefinitions(flowDraft.EndParamDefinitions).
			Save(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to create flow: %w", err)
		}
	} else {
		outputFlow, err = client.Flow.UpdateOne(outputFlow).
			SetName(flowDraft.Name).
			SetNillableDescription(flowDraft.Description).
			SetEndParamDefinitions(flowDraft.EndParamDefinitions).
			ClearBlocks().
			Save(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to update flow: %w", err)
		}
	}
	for _, draftBlock := range flowDraft.Edges.Blocks {
		if err := client.Block.UpdateOne(draftBlock).
			ClearFlowDraft().
			SetFlow(outputFlow).
			Exec(ctx); err != nil {
			return nil, fmt.Errorf("failed to set flow: %w", err)
		}
	}
	if err := client.FlowDraft.DeleteOne(flowDraft).
		Exec(ctx); err != nil {
		return nil, fmt.Errorf("failed to delete flow draft: %w", err)
	}
	return outputFlow, nil
}

func (r mutationResolver) DeleteFlowDraft(ctx context.Context, id int) (bool, error) {
	client := r.ClientFrom(ctx)
	if err := client.FlowDraft.DeleteOneID(id).
		Exec(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r mutationResolver) StartFlow(ctx context.Context, input models.StartFlowInput) (*ent.FlowInstance, error) {
	client := r.ClientFrom(ctx)
	flowInstance, err := client.FlowInstance.Create().
		SetFlowID(input.FlowID).
		Save(ctx)
	if err != nil {
		return nil, err
	}
	startBlock, err := flowInstance.QueryTemplate().
		QueryBlocks().
		Where(block.TypeEQ(block.TypeStart)).
		Only(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to find flow start block. id=%q", flowInstance.ID)
	}
	if _, err = client.BlockInstance.Create().
		SetBlock(startBlock).
		SetFlowInstance(flowInstance).
		SetInputs(input.Params).
		Save(ctx); err != nil {
		return nil, err
	}
	return flowInstance, nil
}
