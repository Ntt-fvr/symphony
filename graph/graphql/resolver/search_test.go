// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver_test

import (
	"context"
	"strconv"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"

	"github.com/99designs/gqlgen/client"
	"github.com/AlekSi/pointer"
	"github.com/stretchr/testify/require"
)

const (
	woCountQuery = `query($filters: [WorkOrderFilterInput!]!) {
		workOrders(filterBy:$filters) {
			totalCount
		}
	}`

	woAllQuery = `query($filters: [WorkOrderFilterInput!]!) {
		workOrders(filterBy:$filters) {
			totalCount
			edges {
				node {
					id
				}
			}
		}
	}`
)

type (
	equipmentSearchDataModels struct {
		locType1  int
		locType2  int
		loc1      int
		loc2      int
		equType   int
		equ2ExtID string
	}

	woSearchDataModels struct {
		loc1      int
		woType1   int
		assignee1 int
		wo1       int
		owner     int
	}

	woSearchResult struct {
		WorkOrders struct {
			TotalCount int
			Edges      []struct {
				Node struct {
					ID string
				}
			}
		}
	}
)

func prepareEquipmentData(ctx context.Context, r *TestResolver, name string, props []*models.PropertyInput) equipmentSearchDataModels {
	mr := r.Mutation()
	locType1, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: name + "loc_type1",
	})
	locType2, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: name + "loc_type2",
	})

	loc1, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name: name + "loc_inst1",
		Type: locType1.ID,
	})
	loc2, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name: name + "loc_inst2",
		Type: locType2.ID,
	})
	propType := pkgmodels.PropertyTypeInput{
		Name: "Owner",
		Type: propertytype.TypeString,
	}
	equType, _ := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:       name + "eq_type",
		Properties: []*pkgmodels.PropertyTypeInput{&propType},
	})
	if len(props) != 0 {
		props[0].PropertyTypeID = equType.QueryPropertyTypes().OnlyIDX(ctx)
	}
	_, _ = mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:       name + "eq_inst1",
		Type:       equType.ID,
		Location:   &loc1.ID,
		Properties: props,
	})
	extID := name + "123"
	equ2, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:       name + "eq_inst2",
		Type:       equType.ID,
		Location:   &loc2.ID,
		Properties: props,
		ExternalID: &extID,
	})
	return equipmentSearchDataModels{
		locType1.ID,
		locType2.ID,
		loc1.ID,
		loc2.ID,
		equType.ID,
		equ2.ExternalID,
	}
}

func prepareWOData(ctx context.Context, r *TestResolver, name string) woSearchDataModels {
	mr := r.Mutation()
	locType1, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: name + "loc_type1",
	})
	locType2, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: name + "loc_type2",
	})

	loc1, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name:       name + "loc_inst1",
		Type:       locType1.ID,
		ExternalID: pointer.ToString("111"),
	})
	loc2, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name:       name + "loc_inst2",
		Type:       locType2.ID,
		ExternalID: pointer.ToString("222"),
	})

	woType1, _ := mr.AddWorkOrderType(ctx, models.AddWorkOrderTypeInput{Name: "wo_type_a"})
	woType2, _ := mr.AddWorkOrderType(ctx, models.AddWorkOrderTypeInput{Name: "wo_type_b"})
	assigneeName1 := "user1@fb.com"
	assigneeName2 := "user2@fb.com"
	assignee1 := viewer.MustGetOrCreateUser(ctx, assigneeName1, user.RoleOwner)
	assignee2 := viewer.MustGetOrCreateUser(ctx, assigneeName2, user.RoleOwner)
	desc := "random description"

	wo1, _ := mr.AddWorkOrder(ctx, models.AddWorkOrderInput{
		Name:            name + "wo_1",
		Description:     &desc,
		WorkOrderTypeID: woType1.ID,
		LocationID:      &loc1.ID,
		AssigneeID:      &assignee1.ID,
	})
	_, _ = mr.AddWorkOrder(ctx, models.AddWorkOrderInput{
		Name:            name + "wo_2",
		Description:     &desc,
		WorkOrderTypeID: woType1.ID,
		AssigneeID:      &assignee1.ID,
	})
	_, _ = mr.AddWorkOrder(ctx, models.AddWorkOrderInput{
		Name:            name + "wo_3",
		Description:     &desc,
		WorkOrderTypeID: woType2.ID,
		LocationID:      &loc1.ID,
		AssigneeID:      &assignee2.ID,
	})
	_, _ = mr.AddWorkOrder(ctx, models.AddWorkOrderInput{
		Name:            name + "wo_4",
		Description:     &desc,
		WorkOrderTypeID: woType2.ID,
		LocationID:      &loc2.ID,
	})

	ownerName := "owner"
	owner := viewer.MustGetOrCreateUser(ctx, ownerName, user.RoleOwner)
	_, _ = mr.EditWorkOrder(ctx, models.EditWorkOrderInput{
		ID:         wo1.ID,
		Name:       wo1.Name,
		OwnerID:    &owner.ID,
		Status:     workOrderStatusPtr(workorder.StatusClosed),
		Priority:   workOrderPriorityPtr(workorder.PriorityHigh),
		LocationID: &loc1.ID,
		AssigneeID: &assignee1.ID,
	})

	return woSearchDataModels{
		loc1.ID,
		woType1.ID,
		assignee1.ID,
		wo1.ID,
		owner.ID,
	}
}

func TestSearchEquipmentByName(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	c := r.GraphClient()

	mr := r.Mutation()

	locationType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: "location_type",
	})
	location, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "loCaTIon_name",
		Type: locationType.ID,
	})

	equipmentType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name: "equipment_type",
	})
	require.NoError(t, err)
	e, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "EqUiPmEnT",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	var rsp struct {
		SearchForNode struct {
			Edges []struct {
				Node struct {
					Name string
				}
			}
		}
	}
	c.MustPost(
		`query($name: String!) { searchForNode(name: $name, first: 10) { edges { node { ... on Equipment { name } } } } }`,
		&rsp,
		client.Var("name", "equip"),
	)
	require.Len(t, rsp.SearchForNode.Edges, 1)
	require.Equal(t, e.Name, rsp.SearchForNode.Edges[0].Node.Name)
	require.NoError(t, err)

	_, _ = mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "equipMENT",
		Type:     equipmentType.ID,
		Location: &location.ID,
	})

	c.MustPost(
		`query($name: String!) { searchForNode(name: $name, first: 10) { edges { node { ... on Equipment { name } } } } }`,
		&rsp,
		client.Var("name", "ment"),
	)
	require.Len(t, rsp.SearchForNode.Edges, 2)

	c.MustPost(
		`query($name: String!) { searchForNode(name: $name, first: 10) { edges { node { ... on Location { name } } } } }`,
		&rsp,
		client.Var("name", "cation"),
	)
	require.Len(t, rsp.SearchForNode.Edges, 1)
	require.Equal(t, location.Name, rsp.SearchForNode.Edges[0].Node.Name)
	require.NoError(t, err)
}

func TestEquipmentSearch(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	owner := "Ted"
	prop := models.PropertyInput{
		StringValue: &owner,
	}

	model1 := prepareEquipmentData(ctx, r, "A", []*models.PropertyInput{&prop}) // two locations on same type. each has one equipment.
	model2 := prepareEquipmentData(ctx, r, "B", nil)                            // two locations on same type. each has one equipment.
	/*
		helper: data now is of type:
		loctype1:
			inst1
				eq1 (typeA, name "A_") + prop
			inst2
				eq2 (typeA, name "A_") + prop
		loctype2:
			inst1
				eq1 (typeB, name "B_")
			inst2
				eq2 (typeB, name "B_")
	*/
	qr := r.Query()
	limit := 100
	all, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{})
	require.NoError(t, err)
	require.Len(t, all.Edges, 4)
	require.Equal(t, all.TotalCount, 4)

	maxDepth := 5
	f1 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{model1.loc1, model2.loc1},
		MaxDepth:   &maxDepth,
	}
	res1, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1})
	require.NoError(t, err)
	require.Len(t, res1.Edges, 2)
	require.Equal(t, res1.TotalCount, 2)

	f2 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeEquipmentType,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{model1.equType},
		MaxDepth:   &maxDepth,
	}
	res2, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1, &f2})
	require.NoError(t, err)
	require.Len(t, res2.Edges, 1)
	require.Equal(t, res2.TotalCount, 1)

	fetchedPropType := res2.Edges[0].Node.QueryType().QueryPropertyTypes().OnlyX(ctx)
	f3 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeProperty,
		Operator:   enum.FilterOperatorIs,
		PropertyValue: &pkgmodels.PropertyTypeInput{
			Name:        fetchedPropType.Name,
			Type:        fetchedPropType.Type,
			StringValue: &owner,
		},
		MaxDepth: &maxDepth,
	}
	res3, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f3})
	require.NoError(t, err)

	require.Len(t, res3.Edges, 2)
	require.Equal(t, res3.TotalCount, 2)

	subst := "inst1"
	f4 := pkgmodels.EquipmentFilterInput{
		FilterType:  enum.EquipmentFilterTypeEquipInstName,
		Operator:    enum.FilterOperatorContains,
		StringValue: &subst,
		MaxDepth:    &maxDepth,
	}
	res4, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f3, &f4})
	require.NoError(t, err)
	require.Len(t, res4.Edges, 1)
	require.Equal(t, res4.TotalCount, 1)

	f5 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{model2.loc1},
		MaxDepth:   &maxDepth,
	}
	res5, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f3, &f4, &f5})
	require.NoError(t, err)
	require.Empty(t, res5.Edges)
	require.Zero(t, res5.TotalCount)

	f6 := pkgmodels.EquipmentFilterInput{
		FilterType:  enum.EquipmentFilterTypeEquipInstExternalID,
		Operator:    enum.FilterOperatorIs,
		StringValue: &model1.equ2ExtID,
		MaxDepth:    &maxDepth,
	}
	res6, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f6})
	require.NoError(t, err)
	require.Len(t, res6.Edges, 1)
	require.Equal(t, res6.TotalCount, 1)
}

func TestUnsupportedEquipmentSearch(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	qr := r.Query()
	limit := 100

	maxDepth := 5
	f := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeLocationInst,
		Operator:   enum.FilterOperatorContains,
		MaxDepth:   &maxDepth,
	}
	_, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f})
	require.Error(t, err)

	f = pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeProperty,
		Operator:   enum.FilterOperatorContains,
		MaxDepth:   &maxDepth,
	}
	_, err = qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f})
	require.Error(t, err)

	f = pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeEquipmentType,
		Operator:   enum.FilterOperatorContains,
		MaxDepth:   &maxDepth,
	}
	_, err = qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f})
	require.Error(t, err)
}

func TestQueryEquipmentPossibleProperties(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()

	namePropType := pkgmodels.PropertyTypeInput{
		Name: "Name",
		Type: propertytype.TypeString,
	}

	widthPropType := pkgmodels.PropertyTypeInput{
		Name: "Width",
		Type: propertytype.TypeInt,
	}

	_, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:       "example_type_a",
		Properties: []*pkgmodels.PropertyTypeInput{&namePropType, &widthPropType},
	})
	require.NoError(t, err)

	propDefs, err := qr.PossibleProperties(ctx, enum.PropertyEntityEquipment)
	require.NoError(t, err)
	for _, propDef := range propDefs {
		require.True(t, propDef.Name == namePropType.Name || propDef.Name == widthPropType.Name)
	}
	require.Len(t, propDefs, 2)
}

func TestSearchEquipmentByLocation(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()
	locType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: "loc_type1",
	})

	loc1, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name:       "loc_inst1",
		Type:       locType.ID,
		ExternalID: pointer.ToString("111"),
	})
	loc2, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name:   "loc_inst2",
		Type:   locType.ID,
		Parent: &loc1.ID,
	})
	eqType, _ := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name: "eq_type",
	})

	_, _ = mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "eq_inst1",
		Type:     eqType.ID,
		Location: &loc1.ID,
	})
	_, _ = mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "eq_inst2",
		Type:     eqType.ID,
		Location: &loc2.ID,
	})

	maxDepth := 2
	limit := 100
	f1 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{loc1.ID},
		MaxDepth:   &maxDepth,
	}
	res1, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1})
	require.NoError(t, err)
	require.Len(t, res1.Edges, 2)

	f1External := pkgmodels.EquipmentFilterInput{
		FilterType:  enum.EquipmentFilterTypeLocationInstExternalID,
		Operator:    enum.FilterOperatorContains,
		StringValue: pointer.ToString("11"),
	}
	res1, err = qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1External})
	require.NoError(t, err)
	require.Len(t, res1.Edges, 1, "1 equipment on the direct location")

	f2 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{loc2.ID},
		MaxDepth:   &maxDepth,
	}
	res2, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f2})
	require.NoError(t, err)
	require.Len(t, res2.Edges, 1)
}

func TestSearchEquipmentByDate(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)

	mr, qr := r.Mutation(), r.Query()
	locType, _ := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: "loc_type1",
	})

	loc1, _ := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "loc_inst1",
		Type: locType.ID,
	})
	date := "2020-01-01"
	propType := pkgmodels.PropertyTypeInput{
		Name:        "install_date",
		Type:        propertytype.TypeDate,
		StringValue: &date,
	}
	eqType, _ := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:       "eq_type",
		Properties: []*pkgmodels.PropertyTypeInput{&propType},
	})
	date = "2010-01-01"
	ptypeID := eqType.QueryPropertyTypes().OnlyIDX(ctx)

	prop1 := models.PropertyInput{
		PropertyTypeID: ptypeID,
		StringValue:    &date,
	}
	e1, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:       "eq_inst1",
		Type:       eqType.ID,
		Location:   &loc1.ID,
		Properties: []*models.PropertyInput{&prop1},
	})
	e2, _ := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "eq_inst2",
		Type:     eqType.ID,
		Location: &loc1.ID,
	})
	_ = e2
	limit := 100
	date = "2015-05-05"
	f1 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeProperty,
		Operator:   enum.FilterOperatorDateGreaterThan,
		PropertyValue: &pkgmodels.PropertyTypeInput{
			Name:        "install_date",
			Type:        propertytype.TypeDate,
			StringValue: &date,
		},
	}

	res1, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1})
	require.NoError(t, err)
	require.Len(t, res1.Edges, 1)
	require.Equal(t, res1.Edges[0].Node.ID, e2.ID)

	f2 := pkgmodels.EquipmentFilterInput{
		FilterType: enum.EquipmentFilterTypeProperty,
		Operator:   enum.FilterOperatorDateLessThan,
		PropertyValue: &pkgmodels.PropertyTypeInput{
			Name:        "install_date",
			Type:        propertytype.TypeDate,
			StringValue: &date,
		},
	}
	res2, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f2})
	require.NoError(t, err)
	require.Len(t, res2.Edges, 1)
	require.Equal(t, res2.Edges[0].Node.ID, e1.ID)

	res3, err := qr.Equipments(ctx, nil, &limit, nil, nil, nil, []*pkgmodels.EquipmentFilterInput{&f1, &f2})
	require.NoError(t, err)
	require.Len(t, res3.Edges, 0)
}

func TestSearchWO(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := ent.NewContext(viewertest.NewContext(context.Background(), r.client), r.client)

	c := r.GraphClient()
	data := prepareWOData(ctx, r, "A")
	/*
		helper: data now is of type:
		wo type a :
			Awo_1: loc1, assignee1. has "owner" and install date
			Awo_2: no loc, assignee1
		wo type b :
			Awo_3: loc1, assignee2
			Awo_4: loc2, no assignee
	*/

	var result woSearchResult
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{}),
	)
	require.Equal(t, 4, result.WorkOrders.TotalCount)
	require.Empty(t, result.WorkOrders.Edges)

	name := "_1"
	f1 := pkgmodels.WorkOrderFilterInput{
		FilterType:  enum.WorkOrderFilterTypeWorkOrderName,
		Operator:    enum.FilterOperatorContains,
		StringValue: &name,
	}
	c.MustPost(
		woAllQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f1}),
	)
	require.Equal(t, 1, result.WorkOrders.TotalCount)
	require.Equal(t, strconv.Itoa(data.wo1), result.WorkOrders.Edges[0].Node.ID)

	status := workorder.StatusPlanned.String()
	f2 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderStatus,
		Operator:   enum.FilterOperatorIsOneOf,
		StringSet:  []string{status},
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f2}),
	)
	require.Equal(t, 3, result.WorkOrders.TotalCount)

	f3 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderType,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{data.woType1},
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f3}),
	)
	require.Equal(t, 2, result.WorkOrders.TotalCount)

	f4 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderAssignedTo,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{data.assignee1},
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f4}),
	)
	require.Equal(t, 2, result.WorkOrders.TotalCount)

	f5 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{data.loc1},
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f5}),
	)
	require.Equal(t, 2, result.WorkOrders.TotalCount)

	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f4, f5}),
	)
	require.Equal(t, 1, result.WorkOrders.TotalCount)

	f7 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderOwnedBy,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{data.owner},
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f7}),
	)
	require.Equal(t, 1, result.WorkOrders.TotalCount)

	f8 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderCreationDate,
		Operator:   enum.FilterOperatorDateLessOrEqualThan,
		TimeValue:  pointer.ToTime(time.Now()),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f8}),
	)
	require.Equal(t, 4, result.WorkOrders.TotalCount)

	f9 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderCreationDate,
		Operator:   enum.FilterOperatorDateGreaterThan,
		TimeValue:  pointer.ToTime(time.Now()),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f9}),
	)
	require.Zero(t, result.WorkOrders.TotalCount)

	f10 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderCloseDate,
		Operator:   enum.FilterOperatorDateLessOrEqualThan,
		TimeValue:  pointer.ToTime(time.Now()),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f10}),
	)
	require.Equal(t, 1, result.WorkOrders.TotalCount)

	f11 := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderCloseDate,
		Operator:   enum.FilterOperatorDateGreaterThan,
		TimeValue:  pointer.ToTime(time.Now()),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f11}),
	)
	require.Zero(t, result.WorkOrders.TotalCount)
}

func TestSearchWOByPriority(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := ent.NewContext(viewertest.NewContext(context.Background(), r.client), r.client)
	data := prepareWOData(ctx, r, "B")
	c := r.GraphClient()

	var result woSearchResult
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{}),
	)
	require.Equal(t, 4, result.WorkOrders.TotalCount)

	f := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderPriority,
		Operator:   enum.FilterOperatorIsOneOf,
		StringSet:  []string{workorder.PriorityHigh.String()},
	}
	c.MustPost(
		woAllQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f}),
	)
	require.Equal(t, 1, result.WorkOrders.TotalCount)
	require.Equal(t, strconv.Itoa(data.wo1), result.WorkOrders.Edges[0].Node.ID)

	f.StringSet = []string{workorder.PriorityLow.String()}
	c.MustPost(
		woAllQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f}),
	)
	require.Zero(t, result.WorkOrders.TotalCount)
}

func TestSearchWOByLocation(t *testing.T) {
	r := newTestResolver(t)
	defer r.Close()
	ctx := viewertest.NewContext(context.Background(), r.client)
	c := r.GraphClient()

	data := prepareWOData(ctx, r, "A")
	/*
		helper: data now is of type:
		wo type a :
			Awo_1: loc1, assignee1. has "owner" and install date
			Awo_2: no loc, assignee1
		wo type b :
			Awo_3: loc1, assignee2
			Awo_4: loc2, no assignee
	*/
	var result woSearchResult
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{}),
	)
	require.Equal(t, 4, result.WorkOrders.TotalCount)
	f := pkgmodels.WorkOrderFilterInput{
		FilterType: enum.WorkOrderFilterTypeWorkOrderLocationInst,
		Operator:   enum.FilterOperatorIsOneOf,
		IDSet:      []int{data.loc1},
		MaxDepth:   pointer.ToInt(2),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f}),
	)
	require.Equal(t, 2, result.WorkOrders.TotalCount)

	f.IDSet = []int{-1}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f}),
	)
	require.Zero(t, result.WorkOrders.TotalCount)

	f2 := pkgmodels.WorkOrderFilterInput{
		FilterType:  enum.WorkOrderFilterTypeLocationInstExternalID,
		Operator:    enum.FilterOperatorContains,
		StringValue: pointer.ToString("111"),
	}
	c.MustPost(
		woCountQuery,
		&result,
		client.Var("filters", []pkgmodels.WorkOrderFilterInput{f2}),
	)
	require.Equal(t, 2, result.WorkOrders.TotalCount)
}
