package executors

import (
	"context"
	"fmt"
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/pkg/errors"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

type ExecutorStartWorkOrderBlock struct {
	executorBaseBlock
}

func (b *ExecutorStartWorkOrderBlock) runLogic() error {
	ctx := context.Background()
	input := b.input
	mutation := ent.FromContext(ctx).
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
			return gqlerror.Errorf("could not be executed in automation")
		}
		mutation = mutation.SetOwner(v.User())
	}

	wo, err := mutation.Save(ctx)
	if err != nil {
		return errors.Wrap(err, "creating work order")
	}
	tmpl, err := wo.QueryTemplate().Only(ctx)
	if err != nil {
		return err
	}
	tPropInputs, err := convertToTemplatePropertyInputs(ctx, tmpl, input["woProperties"].([]*models.PropertyInput))
	if err != nil {
		return fmt.Errorf("convert to template property inputs: %w", err)
	}
	if _, err := AddProperties(tPropInputs,
		resolverutil.AddPropertyArgs{
			Context:    ctx,
			EntSetter:  func(b *ent.PropertyCreate) { b.SetWorkOrderID(wo.ID) },
			IsTemplate: pointer.ToBool(true),
		},
	); err != nil {
		return errors.Wrap(err, "creating work order properties")
	}
	b.input["wo_name"] = wo.Name
	b.input["wo_id"] = wo.ID
	b.input["wo_assignee"], err = wo.Assignee(ctx)
	b.output = b.input

	return nil
}

func convertToTemplatePropertyInputs(
	ctx context.Context,
	template *ent.WorkOrderTemplate,
	properties []*models.PropertyInput,
) ([]*models.PropertyInput, error) {
	client := ent.FromContext(ctx).PropertyType
	inputs := make([]*models.PropertyInput, 0, len(properties))
	for _, p := range properties {
		name, err := client.Query().
			Where(propertytype.ID(p.PropertyTypeID)).
			Select(propertytype.FieldName).
			String(ctx)
		if err != nil {
			return nil, fmt.Errorf("cannot query property type name from id: %w", err)
		}
		id, err := template.
			QueryPropertyTypes().
			Where(propertytype.Name(name)).
			OnlyID(ctx)
		if err != nil {
			return nil, err
		}
		input := *p
		input.PropertyTypeID = id
		inputs = append(inputs, &input)
	}
	return inputs, nil
}

func AddProperties(inputs []*models.PropertyInput, args resolverutil.AddPropertyArgs) ([]*ent.Property, error) {
	builders := make([]*ent.PropertyCreate, 0, len(inputs))
	for _, input := range inputs {
		builder, err := AddProperty(input, args)
		if err != nil {
			return nil, err
		}
		if builder != nil {
			builders = append(builders, builder)
		}
	}
	properties, err := ent.FromContext(args).Property.CreateBulk(builders...).Save(args)

	return properties, err
}

func AddProperty(
	input *models.PropertyInput,
	args resolverutil.AddPropertyArgs,
) (*ent.PropertyCreate, error) {
	client := ent.FromContext(args)
	propType, err := client.PropertyType.Get(args, input.PropertyTypeID)
	if err != nil {
		return nil, err
	}
	isTemplate := args.IsTemplate != nil && *args.IsTemplate
	if !isTemplate && !propType.IsInstanceProperty {
		return nil, nil
	}
	builder := client.Property.Create()
	if args.EntSetter != nil {
		args.EntSetter(builder)
	}
	builder = builder.
		SetTypeID(input.PropertyTypeID).
		SetNillableStringVal(input.StringValue).
		SetNillableIntVal(input.IntValue).
		SetNillableBoolVal(input.BooleanValue).
		SetNillableFloatVal(input.FloatValue).
		SetNillableLatitudeVal(input.LatitudeValue).
		SetNillableLongitudeVal(input.LongitudeValue).
		SetNillableRangeFromVal(input.RangeFromValue).
		SetNillableRangeToVal(input.RangeToValue).
		SetNillablePropertyTypeValueID(input.PropertyTypeValueID)
	return builder, nil
}