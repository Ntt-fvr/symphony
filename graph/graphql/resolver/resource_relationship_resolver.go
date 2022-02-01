// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationship"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceRelationshipResolver struct{}

var condicionEspecial1 = []string{"LOCATED_IN"}

func (resourceRelationshipResolver) ResourceTypeA(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceType, error) {
	variable, err := resourceRelationship.Resourcetypea(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (resourceRelationshipResolver) ResourceTypeB(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceType, error) {
	variable, err := resourceRelationship.Resourcetypeb(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (resourceRelationshipResolver) LocationType(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.LocationType, error) {
	variable, err := resourceRelationship.LocationType(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddResourceRelationship(ctx context.Context, input models.AddResourceRelationshipInput) (*ent.ResourceRelationship, error) {
	client := r.ClientFrom(ctx)

	valor, err := validateCondition(string(input.ResourceRelationshipType), input.LocationType, input.ResourceTypeA, condicionEspecial1)
	if err != nil {
		return nil, err
	}

	fmt.Println("el Valor es: ", valor)
	if valor {
		fmt.Println("Ingreso a valor")
		typ, err := client.
			ResourceRelationship.Create().
			SetNillableLocationTypeID(input.LocationType).
			SetResourceRelationshipMultiplicity(input.ResourceRelationshipMultiplicity).
			SetResourceRelationshipType(input.ResourceRelationshipType).
			SetResourcetypeaID(input.ResourceTypeA).
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, fmt.Errorf("has ocurred error on proces: %v", err)
		}
		return typ, nil

	}
	fmt.Println("Paso a validacion normal")
	typ, err := client.
		ResourceRelationship.Create().
		SetResourceRelationshipMultiplicity(input.ResourceRelationshipMultiplicity).
		SetResourceRelationshipType(input.ResourceRelationshipType).
		SetNillableResourcetypebID(input.ResourceTypeB).
		SetResourcetypeaID(input.ResourceTypeA).
		Save(ctx)
	if err != nil {
		if ent.IsConstraintError(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, fmt.Errorf("has ocurred error on proces: %v", err)
	}
	return typ, nil

}

func (r mutationResolver) RemoveResourceRelationship(ctx context.Context, id int) (int, error) {
	client := r.ClientFrom(ctx)
	t, err := client.ResourceRelationship.Query().
		Where(
			resourcerelationship.ID(id),
		).
		Only(ctx)
	if err != nil {
		return id, errors.Wrapf(err, "has ocurred error on proces: %v", err)
	}
	//TODO: borrar o editar los edges relacionados

	if err := client.ResourceRelationship.DeleteOne(t).Exec(ctx); err != nil {
		return id, errors.Wrap(err, "has ocurred error on proces: %v")
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

func (r mutationResolver) EditResourceRelationship(ctx context.Context, input models.EditResourceRelationshipInput) (*ent.ResourceRelationship, error) {
	client := r.ClientFrom(ctx)
	et, err := client.ResourceRelationship.Get(ctx, input.ID)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
		}
		return nil, errors.Wrapf(err, "has ocurred error on proces: %v", err)
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
		return nil, errors.Wrap(err4, "has ocurred error on proces: %v")
	} else if resourcetypeA != nil {
		resourcetypeAid = resourcetypeA.ID
		change = true

	}

	var resourcetypeB, err5 = et.Resourcetypeb(ctx)
	if err5 != nil {
		return nil, errors.Wrap(err5, "has ocurred error on proces: %v")
	} else if resourcetypeB != nil {
		resourcetypeBid = &resourcetypeB.ID
		change = true

	}

	var locationtype, err3 = et.LocationType(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err3, "has ocurred error on proces: %v")
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
				ResourceRelationship.UpdateOne(et).
				SetNillableLocationTypeID(locationtypeid).
				SetResourceRelationshipMultiplicity(resourceMultiplicity).
				SetResourceRelationshipType(resourceType).
				SetResourcetypeaID(resourcetypeAid).
				ClearResourcetypeb().
				Save(ctx)
			if err != nil {
				if ent.IsConstraintError(err) {
					return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
				}
				return nil, fmt.Errorf("has ocurred error on proces: %v", err)
			}
			return typ, nil

		}
		typ, err := client.
			ResourceRelationship.UpdateOne(et).
			SetResourceRelationshipMultiplicity(resourceMultiplicity).
			SetResourceRelationshipType(resourceType).
			SetResourcetypeaID(resourcetypeAid).
			SetNillableResourcetypebID(resourcetypeBid).
			ClearLocationType().
			Save(ctx)
		if err != nil {
			if ent.IsConstraintError(err) {
				return nil, gqlerror.Errorf("has ocurred error on proces: %v", err)
			}
			return nil, fmt.Errorf("has ocurred error on proces: %v", err)
		}
		return typ, nil

	}
	return et, nil
}
