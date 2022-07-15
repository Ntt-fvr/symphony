package executors

import (
	"context"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/viewer"
)

type ExecutorStartWorkOrderBlock struct {
	executorBaseBlock
}

func (b *ExecutorStartWorkOrderBlock) runLogic() error {
	ctx := context.Context(nil)
	input := b.input
	mutation := ent.FromContext(nil).
		WorkOrder.Create().
		SetName(input["Name"].(string)).
		SetTemplateID(input["workOrderTypeId"].(int))

	if input["priority"] != nil {
		mutation.SetPriority(workorder.Priority(input["priority"].(string)))
	} else {
		mutation.SetPriority(workorder.DefaultPriority)
	}

	if input["authId"] != nil {
		mutation = mutation.SetOwnerID(input["authId"].(int))
		mutation = mutation.SetAssigneeID(input["authId"].(int))
	} else {
		v, ok := viewer.FromContext(ctx).(*viewer.UserViewer)
		if !ok {
			return nil // gqlerror.Errorf("could not be executed in automation")
		}
		mutation = mutation.SetOwner(v.User())
	}
	/*
		wo, err := mutation.Save(ctx)
		if err != nil {
			return nil //errors.Wrap(err, "creating work order")
		}
		tmpl, err := wo.QueryTemplate().Only(ctx)
		if err != nil {
			return nil // err
		}
		tPropInputs, err := r.convertToTemplatePropertyInputs(ctx, tmpl, input.Properties)
		if err != nil {
			return nil, fmt.Errorf("convert to template property inputs: %w", err)
		}
		skipMandatoryPropertiesCheck = skipMandatoryPropertiesCheck || viewer.FromContext(ctx).Features().Enabled(viewer.FeatureMandatoryPropertiesOnWorkOrderClose)
		propInput, err := r.validatedPropertyInputsFromTemplate(ctx, tPropInputs, tmpl.ID, enum.PropertyEntityWorkOrder, skipMandatoryPropertiesCheck)
		if err != nil {
			return nil, fmt.Errorf("validating property for template : %w", err)
		}

		for _, clInput := range input.CheckListCategories {
			_, err := r.createOrUpdateCheckListCategory(ctx, clInput, wo.ID)
			if err != nil {
				return nil, errors.Wrap(err, "creating check list category")
			}
		}
		if _, err := r.AddProperties(propInput,
			resolverutil.AddPropertyArgs{
				Context:    ctx,
				EntSetter:  func(b *ent.PropertyCreate) { b.SetWorkOrderID(wo.ID) },
				IsTemplate: pointer.ToBool(true),
			},
		); err != nil {
			return nil, errors.Wrap(err, "creating work order properties")
		}
	*/
	return nil
}
