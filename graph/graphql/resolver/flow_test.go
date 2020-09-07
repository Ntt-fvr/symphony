// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

func TestAddDeleteFlowDraft(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()
	name := "5G Deployment"
	description := "Flow used for managing all technical operation around deployment"
	flowDraft, err := mr.AddFlowDraft(ctx, models.AddFlowDraftInput{
		Name:        name,
		Description: &description,
	})
	require.NoError(t, err)
	require.Equal(t, name, flowDraft.Name)
	require.Equal(t, description, *flowDraft.Description)

	node, err := qr.Node(ctx, flowDraft.ID)
	require.NoError(t, err)
	flowDraft, ok := node.(*ent.FlowDraft)
	require.True(t, ok)
	require.Equal(t, name, flowDraft.Name)
	require.Equal(t, description, *flowDraft.Description)

	_, err = mr.DeleteFlowDraft(ctx, flowDraft.ID)
	require.NoError(t, err)
	_, err = qr.Node(ctx, flowDraft.ID)
	require.Error(t, err)
}
