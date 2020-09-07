// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func TestAddDeleteBlocksOfFlowDraft(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, fdr, br := r.Mutation(), r.FlowDraft(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	blocks, err := fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Empty(t, blocks)

	b, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Start",
	})
	require.NoError(t, err)
	require.Equal(t, block.TypeStart, b.Type)
	require.Equal(t, "Start", b.Name)
	blockFlowID, err := b.QueryFlowDraft().OnlyID(ctx)
	require.NoError(t, err)
	require.Equal(t, flowDraft.ID, blockFlowID)
	blockType, err := br.Details(ctx, b)
	require.NoError(t, err)
	_, ok := blockType.(*models.StartBlock)
	require.True(t, ok)

	b, err = mr.AddEndBlock(ctx, models.AddEndBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Success",
	})
	require.NoError(t, err)
	require.Equal(t, block.TypeEnd, b.Type)
	require.Equal(t, "Success", b.Name)
	blockFlowID, err = b.QueryFlowDraft().OnlyID(ctx)
	require.NoError(t, err)
	require.Equal(t, flowDraft.ID, blockFlowID)
	blockType, err = br.Details(ctx, b)
	require.NoError(t, err)
	_, ok = blockType.(*models.EndBlock)
	require.True(t, ok)

	blocks, err = fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Len(t, blocks, 2)
	_, err = mr.DeleteBlock(ctx, b.ID)
	require.NoError(t, err)
	blocks, err = fdr.Blocks(ctx, flowDraft)
	require.NoError(t, err)
	require.Len(t, blocks, 1)
}

func TestAddDeleteConnectors(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, br := r.Mutation(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	startBlock, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "Start",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddStartBlock(ctx, models.AddStartBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "End",
	})
	require.NoError(t, err)
	b, err := mr.AddConnector(ctx, models.ConnectorInput{
		BlockID:     startBlock.ID,
		NextBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	require.Equal(t, startBlock.ID, b.ID)

	blocks, err := br.NextBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Len(t, blocks, 1)
	require.Equal(t, blocks[0].ID, endBlock.ID)
	blocks, err = br.PrevBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)

	blocks, err = br.NextBlocks(ctx, endBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)
	blocks, err = br.PrevBlocks(ctx, endBlock)
	require.NoError(t, err)
	require.Len(t, blocks, 1)
	require.Equal(t, blocks[0].ID, startBlock.ID)

	_, err = mr.DeleteConnector(ctx, models.ConnectorInput{
		BlockID:     endBlock.ID,
		NextBlockID: startBlock.ID,
	})
	require.Error(t, err)
	_, err = mr.DeleteConnector(ctx, models.ConnectorInput{
		BlockID:     startBlock.ID,
		NextBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	blocks, err = br.NextBlocks(ctx, startBlock)
	require.NoError(t, err)
	require.Empty(t, blocks)
}

func TestGotoBlock(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, br := r.Mutation(), r.Block()
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name: "Flow Name",
	})
	require.NoError(t, err)
	endBlock, err := mr.AddEndBlock(ctx, models.AddEndBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "End",
	})
	require.NoError(t, err)

	b, err := mr.AddGotoBlock(ctx, models.AddGotoBlockInput{
		FlowDraftID: flowDraft.ID,
		Name:        "GotoEnd",
		NextBlockID: endBlock.ID,
	})
	require.NoError(t, err)
	details, err := br.Details(ctx, b)
	require.NoError(t, err)
	goTo, ok := details.(*models.GotoBlock)
	require.True(t, ok)
	require.Equal(t, endBlock.ID, goTo.GotoBlock.ID)
}
