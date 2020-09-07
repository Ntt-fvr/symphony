// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
)

type flowDraftResolver struct{}

func (r flowDraftResolver) Blocks(ctx context.Context, obj *ent.FlowDraft) ([]*ent.Block, error) {
	if blocks, err := obj.Edges.BlocksOrErr(); !ent.IsNotLoaded(err) {
		return blocks, err
	}
	return obj.QueryBlocks().All(ctx)
}

func (r mutationResolver) AddFlowDraft(ctx context.Context, input models.AddFlowDraftInput) (*ent.FlowDraft, error) {
	client := r.ClientFrom(ctx)
	return client.FlowDraft.Create().
		SetName(input.Name).
		SetNillableDescription(input.Description).
		Save(ctx)
}

func (r mutationResolver) DeleteFlowDraft(ctx context.Context, id int) (bool, error) {
	client := r.ClientFrom(ctx)
	if err := client.FlowDraft.DeleteOneID(id).
		Exec(ctx); err != nil {
		return false, err
	}
	return true, nil
}
