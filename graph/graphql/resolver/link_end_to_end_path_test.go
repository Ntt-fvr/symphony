// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func prepareLinks(ctx context.Context, r *TestResolver, t *testing.T) ([]*ent.Link, []*ent.EquipmentPort) {
	mr, qr, pr, _, eqr := r.Mutation(), r.Query(), r.EquipmentPort(), r.Link(), r.Equipment()
	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{Name: "location_type"})
	location, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "location_name",
		Type: locationType.ID,
	})
	require.NoError(t, err)

	visibleLabel := "Eth1"
	bandwidth := "10/100/1000BASE-T"
	portInput1 := models.EquipmentPortInput{
		Name:         "Port 1",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	portInput2 := models.EquipmentPortInput{
		Name:         "Port 2",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
		ConnectedPorts: []*models.EquipmentPortConnectionInput{
			{
				Name: &portInput1.Name,
			},
		},
	}
	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "parent_equipment_type",
		Ports: []*models.EquipmentPortInput{&portInput1, &portInput2},
	})
	require.NoError(t, err)
	portDefs := equipmentType.QueryPortDefinitions().AllX(ctx)
	equipmentA, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_a",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentB, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_b",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentC, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_c",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	equipmentD, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_d",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	availablePorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(true))
	require.NoError(t, err)
	allPorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(false))
	require.NoError(t, err)
	require.Len(t, availablePorts, 2)
	require.Len(t, allPorts, 2)

	createdLink1, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentA.ID, Port: portDefs[1].ID},
			{Equipment: equipmentB.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	createdLink2, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentB.ID, Port: portDefs[1].ID},
			{Equipment: equipmentC.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	createdLink3, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentC.ID, Port: portDefs[1].ID},
			{Equipment: equipmentD.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	nodeA, err := qr.Node(ctx, equipmentA.ID)
	assert.NoError(t, err)
	fetchedEquipmentA, ok := nodeA.(*ent.Equipment)
	assert.True(t, ok)
	nodeB, err := qr.Node(ctx, equipmentB.ID)
	assert.NoError(t, err)
	fetchedEquipmentB, ok := nodeB.(*ent.Equipment)
	assert.True(t, ok)
	nodeC, err := qr.Node(ctx, equipmentC.ID)
	assert.NoError(t, err)
	fetchedEquipmentC, ok := nodeC.(*ent.Equipment)
	assert.True(t, ok)
	nodeD, err := qr.Node(ctx, equipmentD.ID)
	assert.NoError(t, err)
	fetchedEquipmentD, ok := nodeD.(*ent.Equipment)
	assert.True(t, ok)
	fetchedPortsA := fetchedEquipmentA.QueryPorts().AllX(ctx)
	fetchedPortsB := fetchedEquipmentB.QueryPorts().AllX(ctx)
	fetchedPortsC := fetchedEquipmentC.QueryPorts().AllX(ctx)
	fetchedPortsD := fetchedEquipmentD.QueryPorts().AllX(ctx)

	assert.Equal(t, 2, len(fetchedPortsA))
	assert.Equal(t, 2, len(fetchedPortsB))
	assert.Equal(t, 2, len(fetchedPortsC))
	assert.Equal(t, 2, len(fetchedPortsD))

	linkA, _ := pr.Link(ctx, fetchedPortsA[1])
	linkB, _ := pr.Link(ctx, fetchedPortsB[1])
	linkC, _ := pr.Link(ctx, fetchedPortsC[1])
	assert.Equal(t, linkA.ID, createdLink1.ID)
	assert.Equal(t, linkB.ID, createdLink2.ID)
	assert.Equal(t, linkC.ID, createdLink3.ID)
	var ports = []*ent.EquipmentPort{}
	ports = append(ports, fetchedPortsA...)
	ports = append(ports, fetchedPortsB...)
	ports = append(ports, fetchedPortsC...)
	ports = append(ports, fetchedPortsD...)
	return []*ent.Link{linkA, linkB, linkC}, ports
}

func prepareWith1Link(ctx context.Context, r *TestResolver, t *testing.T) ([]*ent.Link, []*ent.EquipmentPort) {
	mr, qr, pr, _, eqr := r.Mutation(), r.Query(), r.EquipmentPort(), r.Link(), r.Equipment()
	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{Name: "location_type"})
	location, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "location_name",
		Type: locationType.ID,
	})
	require.NoError(t, err)

	visibleLabel := "Eth1"
	bandwidth := "10/100/1000BASE-T"
	portInput1 := models.EquipmentPortInput{
		Name:         "Port 1",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	portInput2 := models.EquipmentPortInput{
		Name:         "Port 2",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
		ConnectedPorts: []*models.EquipmentPortConnectionInput{
			{
				Name: &portInput1.Name,
			},
		},
	}
	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "parent_equipment_type",
		Ports: []*models.EquipmentPortInput{&portInput1, &portInput2},
	})
	require.NoError(t, err)
	portDefs := equipmentType.QueryPortDefinitions().AllX(ctx)
	equipmentA, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_a",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentB, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_b",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	availablePorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(true))
	require.NoError(t, err)
	allPorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(false))
	require.NoError(t, err)
	require.Len(t, availablePorts, 2)
	require.Len(t, allPorts, 2)

	createdLink1, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentA.ID, Port: portDefs[1].ID},
			{Equipment: equipmentB.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	nodeA, err := qr.Node(ctx, equipmentA.ID)
	assert.NoError(t, err)
	fetchedEquipmentA, ok := nodeA.(*ent.Equipment)
	assert.True(t, ok)
	nodeB, err := qr.Node(ctx, equipmentB.ID)
	assert.NoError(t, err)
	fetchedEquipmentB, ok := nodeB.(*ent.Equipment)
	assert.True(t, ok)

	fetchedPortsA := fetchedEquipmentA.QueryPorts().AllX(ctx)
	fetchedPortsB := fetchedEquipmentB.QueryPorts().AllX(ctx)
	assert.Equal(t, 2, len(fetchedPortsA))
	assert.Equal(t, 2, len(fetchedPortsB))

	linkA, _ := pr.Link(ctx, fetchedPortsA[1])
	assert.Equal(t, linkA.ID, createdLink1.ID)
	var ports = []*ent.EquipmentPort{}
	ports = append(ports, fetchedPortsA...)
	ports = append(ports, fetchedPortsB...)
	return []*ent.Link{linkA}, ports
}

func prepareWith1LinkNoBackplanePorts(ctx context.Context, r *TestResolver, t *testing.T) ([]*ent.Link, []*ent.EquipmentPort) {
	mr, qr, pr, _, eqr := r.Mutation(), r.Query(), r.EquipmentPort(), r.Link(), r.Equipment()
	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{Name: "location_type"})
	location, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "location_name",
		Type: locationType.ID,
	})
	require.NoError(t, err)

	visibleLabel := "Eth1"
	bandwidth := "10/100/1000BASE-T"
	portInput1 := models.EquipmentPortInput{
		Name:         "Port 1",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	portInput2 := models.EquipmentPortInput{
		Name:         "Port 2",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "parent_equipment_type",
		Ports: []*models.EquipmentPortInput{&portInput1, &portInput2},
	})
	require.NoError(t, err)
	portDefs := equipmentType.QueryPortDefinitions().AllX(ctx)
	equipmentA, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_a",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentB, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_b",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	availablePorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(true))
	require.NoError(t, err)
	allPorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(false))
	require.NoError(t, err)
	require.Len(t, availablePorts, 2)
	require.Len(t, allPorts, 2)

	createdLink1, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentA.ID, Port: portDefs[1].ID},
			{Equipment: equipmentB.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	nodeA, err := qr.Node(ctx, equipmentA.ID)
	assert.NoError(t, err)
	fetchedEquipmentA, ok := nodeA.(*ent.Equipment)
	assert.True(t, ok)
	nodeB, err := qr.Node(ctx, equipmentB.ID)
	assert.NoError(t, err)
	fetchedEquipmentB, ok := nodeB.(*ent.Equipment)
	assert.True(t, ok)

	fetchedPortsA := fetchedEquipmentA.QueryPorts().AllX(ctx)
	fetchedPortsB := fetchedEquipmentB.QueryPorts().AllX(ctx)
	assert.Equal(t, 2, len(fetchedPortsA))
	assert.Equal(t, 2, len(fetchedPortsB))

	linkA, _ := pr.Link(ctx, fetchedPortsA[1])
	assert.Equal(t, linkA.ID, createdLink1.ID)
	var ports = []*ent.EquipmentPort{}
	ports = append(ports, fetchedPortsA...)
	ports = append(ports, fetchedPortsB...)
	return []*ent.Link{linkA}, ports
}

func prepareMultiplePathLinks(ctx context.Context, r *TestResolver, t *testing.T) ([]*ent.Link, []*ent.EquipmentPort) {
	mr, qr, pr, _, eqr := r.Mutation(), r.Query(), r.EquipmentPort(), r.Link(), r.Equipment()
	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{Name: "location_type"})
	location, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "location_name",
		Type: locationType.ID,
	})
	require.NoError(t, err)

	visibleLabel := "Eth1"
	bandwidth := "10/100/1000BASE-T"
	portInput1 := models.EquipmentPortInput{
		Name:         "Port 1",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	portInput2 := models.EquipmentPortInput{
		Name:         "Port 2",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
		ConnectedPorts: []*models.EquipmentPortConnectionInput{
			{
				Name: &portInput1.Name,
			},
		},
	}
	portInput3 := models.EquipmentPortInput{
		Name:         "Port 3",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
		ConnectedPorts: []*models.EquipmentPortConnectionInput{
			{
				Name: &portInput1.Name,
			},
			{
				Name: &portInput2.Name,
			},
		},
	}
	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "parent_equipment_type",
		Ports: []*models.EquipmentPortInput{&portInput1, &portInput2, &portInput3},
	})
	require.NoError(t, err)
	portDefs := equipmentType.QueryPortDefinitions().AllX(ctx)
	equipmentA, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_a",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentB, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_b",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	equipmentC, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_c",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	equipmentD, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_d",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	availablePorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(true))
	require.NoError(t, err)
	allPorts, err := eqr.Ports(ctx, equipmentA, pointer.ToBool(false))
	require.NoError(t, err)
	require.Len(t, availablePorts, 3)
	require.Len(t, allPorts, 3)

	createdLink1, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentA.ID, Port: portDefs[1].ID},
			{Equipment: equipmentB.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	createdLink2, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentB.ID, Port: portDefs[1].ID},
			{Equipment: equipmentC.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	createdLink3, err := mr.AddLink(ctx, models.AddLinkInput{
		Sides: []*models.LinkSide{
			{Equipment: equipmentC.ID, Port: portDefs[1].ID},
			{Equipment: equipmentD.ID, Port: portDefs[0].ID},
		},
	})
	assert.Nil(t, err)

	nodeA, err := qr.Node(ctx, equipmentA.ID)
	assert.NoError(t, err)
	fetchedEquipmentA, ok := nodeA.(*ent.Equipment)
	assert.True(t, ok)
	nodeB, err := qr.Node(ctx, equipmentB.ID)
	assert.NoError(t, err)
	fetchedEquipmentB, ok := nodeB.(*ent.Equipment)
	assert.True(t, ok)
	nodeC, err := qr.Node(ctx, equipmentC.ID)
	assert.NoError(t, err)
	fetchedEquipmentC, ok := nodeC.(*ent.Equipment)
	assert.True(t, ok)
	nodeD, err := qr.Node(ctx, equipmentD.ID)
	assert.NoError(t, err)
	fetchedEquipmentD, ok := nodeD.(*ent.Equipment)
	assert.True(t, ok)
	fetchedPortsA := fetchedEquipmentA.QueryPorts().AllX(ctx)
	fetchedPortsB := fetchedEquipmentB.QueryPorts().AllX(ctx)
	fetchedPortsC := fetchedEquipmentC.QueryPorts().AllX(ctx)
	fetchedPortsD := fetchedEquipmentD.QueryPorts().AllX(ctx)

	assert.Equal(t, 3, len(fetchedPortsA))
	assert.Equal(t, 3, len(fetchedPortsB))
	assert.Equal(t, 3, len(fetchedPortsC))
	assert.Equal(t, 3, len(fetchedPortsD))

	linkA, _ := pr.Link(ctx, fetchedPortsA[1])
	linkB, _ := pr.Link(ctx, fetchedPortsB[1])
	linkC, _ := pr.Link(ctx, fetchedPortsC[1])
	assert.Equal(t, linkA.ID, createdLink1.ID)
	assert.Equal(t, linkB.ID, createdLink2.ID)
	assert.Equal(t, linkC.ID, createdLink3.ID)
	var ports = []*ent.EquipmentPort{}
	ports = append(ports, fetchedPortsA...)
	ports = append(ports, fetchedPortsB...)
	ports = append(ports, fetchedPortsC...)
	ports = append(ports, fetchedPortsD...)
	return []*ent.Link{linkA, linkB, linkC}, ports
}

func prepareStandalonePort(ctx context.Context, r *TestResolver, t *testing.T) *ent.EquipmentPort {
	mr, qr := r.Mutation(), r.Query()
	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{Name: "location_type"})
	location, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "location_name",
		Type: locationType.ID,
	})
	require.NoError(t, err)

	visibleLabel := "Eth1"
	bandwidth := "10/100/1000BASE-T"
	portInput1 := models.EquipmentPortInput{
		Name:         "Port 1",
		VisibleLabel: &visibleLabel,
		Bandwidth:    &bandwidth,
	}
	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "parent_equipment_type",
		Ports: []*models.EquipmentPortInput{&portInput1},
	})
	require.NoError(t, err)
	equipmentA, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipment_a",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})
	nodeA, err := qr.Node(ctx, equipmentA.ID)
	assert.NoError(t, err)
	fetchedEquipmentA, ok := nodeA.(*ent.Equipment)
	assert.True(t, ok)
	fetchedPortsA := fetchedEquipmentA.QueryPorts().AllX(ctx)
	require.Equal(t, 1, len(fetchedPortsA))
	return fetchedPortsA[0]
}

func TestSearchEndToEndPathByLinkID(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	preparedLinks, _ := prepareLinks(ctx, r, t)
	linkA, linkB, linkC := preparedLinks[0], preparedLinks[1], preparedLinks[2]
	qr := r.Query()

	path1, err := qr.EndToEndPath(ctx, &linkA.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 3, len(path1.Links))
	assert.Equal(t, 2, len(path1.Ports))

	path2, err := qr.EndToEndPath(ctx, &linkB.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 3, len(path2.Links))
	assert.Equal(t, 2, len(path2.Ports))

	path3, err := qr.EndToEndPath(ctx, &linkC.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 3, len(path3.Links))
	assert.Equal(t, 2, len(path3.Ports))
}

func TestSearchSingleEndToEndPathByLinkID(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	preparedLinks, _ := prepareWith1Link(ctx, r, t)
	linkA := preparedLinks[0]
	qr := r.Query()

	path1, err := qr.EndToEndPath(ctx, &linkA.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 1, len(path1.Links))
	assert.Equal(t, 2, len(path1.Ports))
}

func TestSearchSingleEndToEndPathByLinkIDWithoutBackplaneConnections(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	preparedLinks, _ := prepareWith1LinkNoBackplanePorts(ctx, r, t)
	linkA := preparedLinks[0]
	qr := r.Query()

	path1, err := qr.EndToEndPath(ctx, &linkA.ID, nil)
	require.NoError(t, err)
	assert.Equal(t, 1, len(path1.Links))
	assert.Equal(t, 0, len(path1.Ports))
}

func TestSearchEndToEndPathByPort(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	_, preparedPorts := prepareLinks(ctx, r, t)
	qr := r.Query()

	// first end port
	path1, err := qr.EndToEndPath(ctx, nil, &preparedPorts[0].ID)
	assert.NoError(t, err)
	assert.Equal(t, 3, len(path1.Links))
	assert.Equal(t, 2, len(path1.Ports))

	// last end port
	path2, err := qr.EndToEndPath(ctx, nil, &preparedPorts[len(preparedPorts)-1].ID)
	assert.NoError(t, err)
	assert.Equal(t, 3, len(path2.Links))
	assert.Equal(t, 2, len(path2.Ports))
}

func TestSearchEndToEndPathMultiplePathsByPort(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	_, preparedPorts := prepareMultiplePathLinks(ctx, r, t)
	qr := r.Query()

	// first end port
	_, err := qr.EndToEndPath(ctx, nil, &preparedPorts[0].ID)
	assert.Error(t, err)

	// last end port
	_, err = qr.EndToEndPath(ctx, nil, &preparedPorts[len(preparedPorts)-1].ID)
	assert.Error(t, err)
}

func TestSearchEndToEndPathStandAlonePort(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	preparedPort := prepareStandalonePort(ctx, r, t)
	qr := r.Query()

	// first end port
	result, err := qr.EndToEndPath(ctx, nil, &preparedPort.ID)
	assert.NoError(t, err)
	assert.Equal(t, 1, len(result.Ports))
	assert.Equal(t, 0, len(result.Links))
}