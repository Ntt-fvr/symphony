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
	"github.com/facebookincubator/symphony/pkg/ent/resourcerelationshipmultiplicity"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type resourceRelationshipResolver struct{}

var condicionEspecial1 = []string{"LOCATION IN"}

func (resourceRelationshipResolver) ResourceRelationshipTypeFk(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceRelationshipType, error) {
	variable, err := resourceRelationship.Resourcerelationshiptypefk(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}
func (resourceRelationshipResolver) ResourceRelationshipMultiplicityFk(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceRelationshipMultiplicity, error) {
	variable, err := resourceRelationship.ResourceRelationshipMultiplicityFk(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}
func (resourceRelationshipResolver) ResourceTypeFkA(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceType, error) {
	variable, err := resourceRelationship.Resourcetypea(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}
func (resourceRelationshipResolver) ResourceTypeFkB(ctx context.Context, resourceRelationship *ent.ResourceRelationship) (*ent.ResourceType, error) {
	variable, err := resourceRelationship.Resourcetypeb(ctx)
	if err != nil {
		return nil, fmt.Errorf("has ocurred error on proces: %w", err)
	} else {
		return variable, nil
	}
}

func (r mutationResolver) AddResourceRelationship(ctx context.Context, input models.AddResourceRelationshipInput) (*ent.ResourceRelationship, error) {
	client := r.ClientFrom(ctx)

	//evaluar query multiplicity

	multiplicity, errMulti := client.ResourceRelationshipMultiplicity.Query().Where(resourcerelationshipmultiplicity.IDEQ(input.ResourceRelationshipMultiplicityFk)).First(ctx)

	if errMulti != nil || multiplicity == nil {
		return nil, gqlerror.Errorf("field ResourceRelationshipMultiplicityFk does not exist in the database: %v", errMulti)
	}
	valor, err := validateCondition(multiplicity.Name, input.LocationTypeFk, input.ResourceTypeFkB, condicionEspecial1)
	if err != nil {
		return nil, err
	}

	if valor {
		typ, err := client.
			ResourceRelationship.Create().
			SetNillableLocationtypefkID(input.LocationTypeFk).
			SetResourceRelationshipMultiplicityFkID(input.ResourceRelationshipMultiplicityFk).
			SetResourcerelationshiptypefkID(input.ResourceRelationshipTypeFk).
			SetResourcetypeaID(input.ResourceTypeFkA).
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
		ResourceRelationship.Create().
		SetResourceRelationshipMultiplicityFkID(input.ResourceRelationshipMultiplicityFk).
		SetResourcerelationshiptypefkID(input.ResourceRelationshipTypeFk).
		SetNillableResourcetypebID(input.ResourceTypeFkB).
		SetResourcetypeaID(input.ResourceTypeFkA).
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
func validateCondition(multiplicity string, locationID *int, resourcetypeb *int, condition []string) (bool, error) {
	for _, condicion := range condition {
		if condicion == multiplicity {

			if locationID != nil {
				return true, nil

			} else {
				return false, gqlerror.Errorf("fiel LocationTypeFk is required.")
			}

		}

	}
	if resourcetypeb == nil {
		return false, gqlerror.Errorf("fiel ResourceTypeFkB is required.")
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
	var relationtypeid, relationmulplicityid, resourcetypeAid int
	var resourcetypeBid, locationtypeid *int

	var relationtype, err1 = et.Resourcerelationshiptypefk(ctx)
	var change = false
	if err1 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	} else if relationtype != nil {
		relationtypeid = relationtype.ID

	}

	var relationmulplicity, err2 = et.ResourceRelationshipMultiplicityFk(ctx)
	if err2 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	} else if relationmulplicity != nil {
		relationmulplicityid = relationmulplicity.ID
	}

	var resourcetypeA, err4 = et.Resourcetypea(ctx)
	if err4 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	} else if resourcetypeA != nil {
		resourcetypeAid = resourcetypeA.ID

	}
	var resourcetypeB, err5 = et.Resourcetypeb(ctx)
	if err5 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	} else if resourcetypeB != nil {
		resourcetypeBid = &resourcetypeB.ID

	}
	var locationtype, err3 = et.Locationtypefk(ctx)
	if err3 != nil {
		return nil, errors.Wrap(err1, "has ocurred error on proces: %v")
	} else if locationtype != nil {
		locationtypeid = &locationtype.ID

	}

	if (relationtype != nil && relationtype.ID != input.ResourceRelationshipTypeFk) || relationtype == nil {
		relationtypeid = input.ResourceRelationshipTypeFk
		change = true
	}
	if (relationmulplicity != nil && relationmulplicity.ID != input.ResourceRelationshipMultiplicityFk) || relationmulplicity == nil {
		relationmulplicityid = input.ResourceRelationshipMultiplicityFk
		change = true
	}
	if (resourcetypeA != nil && resourcetypeA.ID != input.ResourceTypeFkA) || resourcetypeA == nil {
		resourcetypeAid = input.ResourceTypeFkA
		change = true
	}
	if input.ResourceTypeFkB != nil && (resourcetypeB == nil || (*resourcetypeBid != *input.ResourceTypeFkB)) {
		resourcetypeBid = input.ResourceTypeFkB
		change = true
	}
	if input.LocationTypeFk != nil && (locationtype == nil || (*locationtypeid != *input.LocationTypeFk)) {
		locationtypeid = input.LocationTypeFk
		change = true
	}

	if change {

		multiplicity, errMulti := client.ResourceRelationshipMultiplicity.Query().Where(resourcerelationshipmultiplicity.IDEQ(input.ResourceRelationshipMultiplicityFk)).First(ctx)

		if errMulti != nil || multiplicity == nil {
			return nil, gqlerror.Errorf("field ResourceRelationshipMultiplicityFk does not exist in the database: %v", errMulti)
		}
		valor, err := validateCondition(multiplicity.Name, input.LocationTypeFk, input.ResourceTypeFkB, condicionEspecial1)
		if err != nil {
			return nil, err
		}

		if valor {
			typ, err := client.
				ResourceRelationship.UpdateOne(et).
				SetNillableLocationtypefkID(locationtypeid).
				SetResourceRelationshipMultiplicityFkID(relationmulplicityid).
				SetResourcerelationshiptypefkID(relationtypeid).
				SetResourcetypeaID(resourcetypeAid).
				SetNillableResourcetypebID(nil).
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
			SetNillableResourcetypebID(resourcetypeBid).
			SetResourceRelationshipMultiplicityFkID(relationmulplicityid).
			SetResourcerelationshiptypefkID(relationtypeid).
			SetResourcetypeaID(resourcetypeAid).
			SetNillableLocationtypefkID(nil).
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
