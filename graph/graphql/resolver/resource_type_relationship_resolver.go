// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcetyperelationship"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceTypeRelationshipResolver struct{}

var condicionEspecial1 = []string{"LOCATED_IN"}

func (resourceTypeRelationshipResolver) ResourceTypeA(ctx context.Context, resourceTypeRelationship *ent.ResourceTypeRelationship) (*ent.ResourceType, error) {
	variable, err := resourceTypeRelationship.Resourcetypea(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	} else {
		return variable, nil
	}
}

func (resourceTypeRelationshipResolver) ResourceTypeB(ctx context.Context, resourceTypeRelationship *ent.ResourceTypeRelationship) (*ent.ResourceType, error) {
	variable, err := resourceTypeRelationship.Resourcetypeb(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	} else {
		return variable, nil
	}
}

func (resourceTypeRelationshipResolver) LocationType(ctx context.Context, resourceTypeRelationship *ent.ResourceTypeRelationship) (*ent.LocationType, error) {
	variable, err := resourceTypeRelationship.LocationType(ctx)
	if err != nil {
		return nil, fmt.Errorf("has occurred error on process: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddResourceTypeRelationship(ctx context.Context, input models.AddResourceTypeRelationshipInput) (*ent.ResourceTypeRelationship, error) {
	client := r.ClientFrom(ctx)

	valor, err := validateCondition(string(input.ResourceRelationshipType), input.LocationType, input.ResourceTypeA, condicionEspecial1)
	if err != nil {
		return nil, err
	}

	fmt.Println("el Valor es: ", valor)
	if valor {
		fmt.Println("Ingreso a valor")
		typ, err := client.
			ResourceTypeRelationship.Create().
			SetNillableLocationTypeID(input.LocationType).
			SetResourceRelationshipMultiplicity(input.ResourceRelationshipMultiplicity).
			SetResourceRelationshipType(input.ResourceRelationshipType).
			SetResourcetypeaID(input.ResourceTypeA).
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %v", err)
		}
		return typ, nil
	}
	fmt.Println("Paso a validacion normal")
	typ, err := client.
		ResourceTypeRelationship.Create().
		SetResourceRelationshipMultiplicity(input.ResourceRelationshipMultiplicity).
		SetResourceRelationshipType(input.ResourceRelationshipType).
		SetNillableResourcetypebID(input.ResourceTypeB).
		SetResourcetypeaID(input.ResourceTypeA).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, fmt.Errorf("has occurred error on process: %v", err)
	}
	return typ, nil
}

func (r mutationResolver) RemoveResourceTypeRelationship(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceTypeRelationship.Query().
		Where(
			resourcetyperelationship.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceTypeRelationship.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has occurred error on process: %v")
	}
	return id, nil
}
func validateCondition(multiplicity string, locationID *int, resourcetypea int, condition []string) (bool, error) {
	for _, condicion := range condition {
		fmt.Println("el condicion es: ", condicion)
		fmt.Println("el multiplicity es: ", multiplicity)
		if condicion == multiplicity {
			if locationID != nil {
				return true, nil
			} else {
				return false, gqlerror.Errorf("fiel LocationTypeFk is required.")
			}
		}
	}
	return false, nil
}

func (r mutationResolver) EditResourceTypeRelationship(ctx context.Context, input models.EditResourceTypeRelationshipInput) (*ent.ResourceTypeRelationship, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceTypeRelationship.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has occurred error on process: %v", err)
		}
		return nil, errors.Wrapf(err, "has occurred error on process: %v", err)
	}
	var resourcetypeAid int
	var resourcetypeBid *int
	var locationtypeid *int
	var resourceType, resourceMultiplicity = et.ResourceRelationshipType, et.ResourceRelationshipMultiplicity

	var change = false
	if input.ResourceRelationshipType != et.ResourceRelationshipType {
		resourceType = input.ResourceRelationshipType
		change = true
	}

	if input.ResourceRelationshipMultiplicity != et.ResourceRelationshipMultiplicity {
		resourceMultiplicity = input.ResourceRelationshipMultiplicity
		change = true
	}

	var resourcetypeA, err4 = et.Resourcetypea(ctx)
	if err4 != nil {
		return nil, errors.Wrap(err4, "has occurred error on process: %v")
	} else if resourcetypeA != nil {
		resourcetypeAid = resourcetypeA.ID
		change = true
	}

	var resourcetypeB, err5 = et.Resourcetypeb(ctx)
	if err5 != nil {
		return nil, errors.Wrap(err5, "has occurred error on process: %v")
	} else if resourcetypeB != nil {
		resourcetypeBid = &resourcetypeB.ID
		change = true
	}

	var locationtype, err3 = et.LocationType(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has occurred error on process: %v")
	} else if locationtype != nil {
		locationtypeid = &locationtype.ID
		change = true
	}

	if change {
		valor, err := validateCondition(input.ResourceRelationshipMultiplicity.String(), input.LocationType, input.ResourceTypeA, condicionEspecial1)
		if err != nil {
			return nil, err
		}

		if valor {
			typ, err := client.
				ResourceTypeRelationship.UpdateOne(et).
				SetNillableLocationTypeID(locationtypeid).
				SetResourceRelationshipMultiplicity(resourceMultiplicity).
				SetResourceRelationshipType(resourceType).
				SetResourcetypeaID(resourcetypeAid).
				ClearResourcetypeb().
				Save(ctx)
			if err != nil {
				if ent.IsConstraintError(err) {
					return nil, gqlerror.Errorf("has occurred error on process: %v", err)
				}
				return nil, fmt.Errorf("has occurred error on process: %v", err)
			}
			return typ, nil
		}
		typ, err := client.
			ResourceTypeRelationship.UpdateOne(et).
			SetResourceRelationshipMultiplicity(resourceMultiplicity).
			SetResourceRelationshipType(resourceType).
			SetResourcetypeaID(resourcetypeAid).
			SetNillableResourcetypebID(resourcetypeBid).
			ClearLocationType().
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has occurred error on process: %v", err)
			}
			return nil, fmt.Errorf("has occurred error on process: %v", err)
		}
		return typ, nil
	}
	return et, nil
}
