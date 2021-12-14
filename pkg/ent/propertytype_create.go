// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/facebook/ent/dialect/sql/sqlgraph"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentporttype"
	"github.com/facebookincubator/symphony/pkg/ent/equipmenttype"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/projecttemplate"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/ent/property"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/servicetype"
	"github.com/facebookincubator/symphony/pkg/ent/workertype"
	"github.com/facebookincubator/symphony/pkg/ent/workordertemplate"
	"github.com/facebookincubator/symphony/pkg/ent/workordertype"
)

// PropertyTypeCreate is the builder for creating a PropertyType entity.
type PropertyTypeCreate struct {
	config
	mutation *PropertyTypeMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (ptc *PropertyTypeCreate) SetCreateTime(t time.Time) *PropertyTypeCreate {
	ptc.mutation.SetCreateTime(t)
	return ptc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableCreateTime(t *time.Time) *PropertyTypeCreate {
	if t != nil {
		ptc.SetCreateTime(*t)
	}
	return ptc
}

// SetUpdateTime sets the update_time field.
func (ptc *PropertyTypeCreate) SetUpdateTime(t time.Time) *PropertyTypeCreate {
	ptc.mutation.SetUpdateTime(t)
	return ptc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableUpdateTime(t *time.Time) *PropertyTypeCreate {
	if t != nil {
		ptc.SetUpdateTime(*t)
	}
	return ptc
}

// SetType sets the type field.
func (ptc *PropertyTypeCreate) SetType(pr propertytype.Type) *PropertyTypeCreate {
	ptc.mutation.SetType(pr)
	return ptc
}

// SetName sets the name field.
func (ptc *PropertyTypeCreate) SetName(s string) *PropertyTypeCreate {
	ptc.mutation.SetName(s)
	return ptc
}

// SetExternalID sets the external_id field.
func (ptc *PropertyTypeCreate) SetExternalID(s string) *PropertyTypeCreate {
	ptc.mutation.SetExternalID(s)
	return ptc
}

// SetNillableExternalID sets the external_id field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableExternalID(s *string) *PropertyTypeCreate {
	if s != nil {
		ptc.SetExternalID(*s)
	}
	return ptc
}

// SetIndex sets the index field.
func (ptc *PropertyTypeCreate) SetIndex(i int) *PropertyTypeCreate {
	ptc.mutation.SetIndex(i)
	return ptc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableIndex(i *int) *PropertyTypeCreate {
	if i != nil {
		ptc.SetIndex(*i)
	}
	return ptc
}

// SetCategory sets the category field.
func (ptc *PropertyTypeCreate) SetCategory(s string) *PropertyTypeCreate {
	ptc.mutation.SetCategory(s)
	return ptc
}

// SetNillableCategory sets the category field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableCategory(s *string) *PropertyTypeCreate {
	if s != nil {
		ptc.SetCategory(*s)
	}
	return ptc
}

// SetIntVal sets the int_val field.
func (ptc *PropertyTypeCreate) SetIntVal(i int) *PropertyTypeCreate {
	ptc.mutation.SetIntVal(i)
	return ptc
}

// SetNillableIntVal sets the int_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableIntVal(i *int) *PropertyTypeCreate {
	if i != nil {
		ptc.SetIntVal(*i)
	}
	return ptc
}

// SetBoolVal sets the bool_val field.
func (ptc *PropertyTypeCreate) SetBoolVal(b bool) *PropertyTypeCreate {
	ptc.mutation.SetBoolVal(b)
	return ptc
}

// SetNillableBoolVal sets the bool_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableBoolVal(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetBoolVal(*b)
	}
	return ptc
}

// SetFloatVal sets the float_val field.
func (ptc *PropertyTypeCreate) SetFloatVal(f float64) *PropertyTypeCreate {
	ptc.mutation.SetFloatVal(f)
	return ptc
}

// SetNillableFloatVal sets the float_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableFloatVal(f *float64) *PropertyTypeCreate {
	if f != nil {
		ptc.SetFloatVal(*f)
	}
	return ptc
}

// SetLatitudeVal sets the latitude_val field.
func (ptc *PropertyTypeCreate) SetLatitudeVal(f float64) *PropertyTypeCreate {
	ptc.mutation.SetLatitudeVal(f)
	return ptc
}

// SetNillableLatitudeVal sets the latitude_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableLatitudeVal(f *float64) *PropertyTypeCreate {
	if f != nil {
		ptc.SetLatitudeVal(*f)
	}
	return ptc
}

// SetLongitudeVal sets the longitude_val field.
func (ptc *PropertyTypeCreate) SetLongitudeVal(f float64) *PropertyTypeCreate {
	ptc.mutation.SetLongitudeVal(f)
	return ptc
}

// SetNillableLongitudeVal sets the longitude_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableLongitudeVal(f *float64) *PropertyTypeCreate {
	if f != nil {
		ptc.SetLongitudeVal(*f)
	}
	return ptc
}

// SetStringVal sets the string_val field.
func (ptc *PropertyTypeCreate) SetStringVal(s string) *PropertyTypeCreate {
	ptc.mutation.SetStringVal(s)
	return ptc
}

// SetNillableStringVal sets the string_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableStringVal(s *string) *PropertyTypeCreate {
	if s != nil {
		ptc.SetStringVal(*s)
	}
	return ptc
}

// SetRangeFromVal sets the range_from_val field.
func (ptc *PropertyTypeCreate) SetRangeFromVal(f float64) *PropertyTypeCreate {
	ptc.mutation.SetRangeFromVal(f)
	return ptc
}

// SetNillableRangeFromVal sets the range_from_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableRangeFromVal(f *float64) *PropertyTypeCreate {
	if f != nil {
		ptc.SetRangeFromVal(*f)
	}
	return ptc
}

// SetRangeToVal sets the range_to_val field.
func (ptc *PropertyTypeCreate) SetRangeToVal(f float64) *PropertyTypeCreate {
	ptc.mutation.SetRangeToVal(f)
	return ptc
}

// SetNillableRangeToVal sets the range_to_val field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableRangeToVal(f *float64) *PropertyTypeCreate {
	if f != nil {
		ptc.SetRangeToVal(*f)
	}
	return ptc
}

// SetIsInstanceProperty sets the is_instance_property field.
func (ptc *PropertyTypeCreate) SetIsInstanceProperty(b bool) *PropertyTypeCreate {
	ptc.mutation.SetIsInstanceProperty(b)
	return ptc
}

// SetNillableIsInstanceProperty sets the is_instance_property field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableIsInstanceProperty(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetIsInstanceProperty(*b)
	}
	return ptc
}

// SetEditable sets the editable field.
func (ptc *PropertyTypeCreate) SetEditable(b bool) *PropertyTypeCreate {
	ptc.mutation.SetEditable(b)
	return ptc
}

// SetNillableEditable sets the editable field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableEditable(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetEditable(*b)
	}
	return ptc
}

// SetMandatory sets the mandatory field.
func (ptc *PropertyTypeCreate) SetMandatory(b bool) *PropertyTypeCreate {
	ptc.mutation.SetMandatory(b)
	return ptc
}

// SetNillableMandatory sets the mandatory field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableMandatory(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetMandatory(*b)
	}
	return ptc
}

// SetDeleted sets the deleted field.
func (ptc *PropertyTypeCreate) SetDeleted(b bool) *PropertyTypeCreate {
	ptc.mutation.SetDeleted(b)
	return ptc
}

// SetNillableDeleted sets the deleted field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableDeleted(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetDeleted(*b)
	}
	return ptc
}

// SetListable sets the listable field.
func (ptc *PropertyTypeCreate) SetListable(b bool) *PropertyTypeCreate {
	ptc.mutation.SetListable(b)
	return ptc
}

// SetNillableListable sets the listable field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableListable(b *bool) *PropertyTypeCreate {
	if b != nil {
		ptc.SetListable(*b)
	}
	return ptc
}

// SetNodeType sets the nodeType field.
func (ptc *PropertyTypeCreate) SetNodeType(s string) *PropertyTypeCreate {
	ptc.mutation.SetNodeType(s)
	return ptc
}

// SetNillableNodeType sets the nodeType field if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableNodeType(s *string) *PropertyTypeCreate {
	if s != nil {
		ptc.SetNodeType(*s)
	}
	return ptc
}

// AddPropertyIDs adds the properties edge to Property by ids.
func (ptc *PropertyTypeCreate) AddPropertyIDs(ids ...int) *PropertyTypeCreate {
	ptc.mutation.AddPropertyIDs(ids...)
	return ptc
}

// AddProperties adds the properties edges to Property.
func (ptc *PropertyTypeCreate) AddProperties(p ...*Property) *PropertyTypeCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return ptc.AddPropertyIDs(ids...)
}

// SetLocationTypeID sets the location_type edge to LocationType by id.
func (ptc *PropertyTypeCreate) SetLocationTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetLocationTypeID(id)
	return ptc
}

// SetNillableLocationTypeID sets the location_type edge to LocationType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableLocationTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetLocationTypeID(*id)
	}
	return ptc
}

// SetLocationType sets the location_type edge to LocationType.
func (ptc *PropertyTypeCreate) SetLocationType(l *LocationType) *PropertyTypeCreate {
	return ptc.SetLocationTypeID(l.ID)
}

// SetEquipmentPortTypeID sets the equipment_port_type edge to EquipmentPortType by id.
func (ptc *PropertyTypeCreate) SetEquipmentPortTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetEquipmentPortTypeID(id)
	return ptc
}

// SetNillableEquipmentPortTypeID sets the equipment_port_type edge to EquipmentPortType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableEquipmentPortTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetEquipmentPortTypeID(*id)
	}
	return ptc
}

// SetEquipmentPortType sets the equipment_port_type edge to EquipmentPortType.
func (ptc *PropertyTypeCreate) SetEquipmentPortType(e *EquipmentPortType) *PropertyTypeCreate {
	return ptc.SetEquipmentPortTypeID(e.ID)
}

// SetLinkEquipmentPortTypeID sets the link_equipment_port_type edge to EquipmentPortType by id.
func (ptc *PropertyTypeCreate) SetLinkEquipmentPortTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetLinkEquipmentPortTypeID(id)
	return ptc
}

// SetNillableLinkEquipmentPortTypeID sets the link_equipment_port_type edge to EquipmentPortType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableLinkEquipmentPortTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetLinkEquipmentPortTypeID(*id)
	}
	return ptc
}

// SetLinkEquipmentPortType sets the link_equipment_port_type edge to EquipmentPortType.
func (ptc *PropertyTypeCreate) SetLinkEquipmentPortType(e *EquipmentPortType) *PropertyTypeCreate {
	return ptc.SetLinkEquipmentPortTypeID(e.ID)
}

// SetEquipmentTypeID sets the equipment_type edge to EquipmentType by id.
func (ptc *PropertyTypeCreate) SetEquipmentTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetEquipmentTypeID(id)
	return ptc
}

// SetNillableEquipmentTypeID sets the equipment_type edge to EquipmentType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableEquipmentTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetEquipmentTypeID(*id)
	}
	return ptc
}

// SetEquipmentType sets the equipment_type edge to EquipmentType.
func (ptc *PropertyTypeCreate) SetEquipmentType(e *EquipmentType) *PropertyTypeCreate {
	return ptc.SetEquipmentTypeID(e.ID)
}

// SetServiceTypeID sets the service_type edge to ServiceType by id.
func (ptc *PropertyTypeCreate) SetServiceTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetServiceTypeID(id)
	return ptc
}

// SetNillableServiceTypeID sets the service_type edge to ServiceType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableServiceTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetServiceTypeID(*id)
	}
	return ptc
}

// SetServiceType sets the service_type edge to ServiceType.
func (ptc *PropertyTypeCreate) SetServiceType(s *ServiceType) *PropertyTypeCreate {
	return ptc.SetServiceTypeID(s.ID)
}

// SetWorkOrderTypeID sets the work_order_type edge to WorkOrderType by id.
func (ptc *PropertyTypeCreate) SetWorkOrderTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetWorkOrderTypeID(id)
	return ptc
}

// SetNillableWorkOrderTypeID sets the work_order_type edge to WorkOrderType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableWorkOrderTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetWorkOrderTypeID(*id)
	}
	return ptc
}

// SetWorkOrderType sets the work_order_type edge to WorkOrderType.
func (ptc *PropertyTypeCreate) SetWorkOrderType(w *WorkOrderType) *PropertyTypeCreate {
	return ptc.SetWorkOrderTypeID(w.ID)
}

// SetWorkOrderTemplateID sets the work_order_template edge to WorkOrderTemplate by id.
func (ptc *PropertyTypeCreate) SetWorkOrderTemplateID(id int) *PropertyTypeCreate {
	ptc.mutation.SetWorkOrderTemplateID(id)
	return ptc
}

// SetNillableWorkOrderTemplateID sets the work_order_template edge to WorkOrderTemplate by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableWorkOrderTemplateID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetWorkOrderTemplateID(*id)
	}
	return ptc
}

// SetWorkOrderTemplate sets the work_order_template edge to WorkOrderTemplate.
func (ptc *PropertyTypeCreate) SetWorkOrderTemplate(w *WorkOrderTemplate) *PropertyTypeCreate {
	return ptc.SetWorkOrderTemplateID(w.ID)
}

// SetProjectTypeID sets the project_type edge to ProjectType by id.
func (ptc *PropertyTypeCreate) SetProjectTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetProjectTypeID(id)
	return ptc
}

// SetNillableProjectTypeID sets the project_type edge to ProjectType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableProjectTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetProjectTypeID(*id)
	}
	return ptc
}

// SetProjectType sets the project_type edge to ProjectType.
func (ptc *PropertyTypeCreate) SetProjectType(p *ProjectType) *PropertyTypeCreate {
	return ptc.SetProjectTypeID(p.ID)
}

// SetProjectTemplateID sets the project_template edge to ProjectTemplate by id.
func (ptc *PropertyTypeCreate) SetProjectTemplateID(id int) *PropertyTypeCreate {
	ptc.mutation.SetProjectTemplateID(id)
	return ptc
}

// SetNillableProjectTemplateID sets the project_template edge to ProjectTemplate by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableProjectTemplateID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetProjectTemplateID(*id)
	}
	return ptc
}

// SetProjectTemplate sets the project_template edge to ProjectTemplate.
func (ptc *PropertyTypeCreate) SetProjectTemplate(p *ProjectTemplate) *PropertyTypeCreate {
	return ptc.SetProjectTemplateID(p.ID)
}

// SetWorkerTypeID sets the worker_type edge to WorkerType by id.
func (ptc *PropertyTypeCreate) SetWorkerTypeID(id int) *PropertyTypeCreate {
	ptc.mutation.SetWorkerTypeID(id)
	return ptc
}

// SetNillableWorkerTypeID sets the worker_type edge to WorkerType by id if the given value is not nil.
func (ptc *PropertyTypeCreate) SetNillableWorkerTypeID(id *int) *PropertyTypeCreate {
	if id != nil {
		ptc = ptc.SetWorkerTypeID(*id)
	}
	return ptc
}

// SetWorkerType sets the worker_type edge to WorkerType.
func (ptc *PropertyTypeCreate) SetWorkerType(w *WorkerType) *PropertyTypeCreate {
	return ptc.SetWorkerTypeID(w.ID)
}

// Mutation returns the PropertyTypeMutation object of the builder.
func (ptc *PropertyTypeCreate) Mutation() *PropertyTypeMutation {
	return ptc.mutation
}

// Save creates the PropertyType in the database.
func (ptc *PropertyTypeCreate) Save(ctx context.Context) (*PropertyType, error) {
	var (
		err  error
		node *PropertyType
	)
	ptc.defaults()
	if len(ptc.hooks) == 0 {
		if err = ptc.check(); err != nil {
			return nil, err
		}
		node, err = ptc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*PropertyTypeMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ptc.check(); err != nil {
				return nil, err
			}
			ptc.mutation = mutation
			node, err = ptc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(ptc.hooks) - 1; i >= 0; i-- {
			mut = ptc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ptc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ptc *PropertyTypeCreate) SaveX(ctx context.Context) *PropertyType {
	v, err := ptc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (ptc *PropertyTypeCreate) defaults() {
	if _, ok := ptc.mutation.CreateTime(); !ok {
		v := propertytype.DefaultCreateTime()
		ptc.mutation.SetCreateTime(v)
	}
	if _, ok := ptc.mutation.UpdateTime(); !ok {
		v := propertytype.DefaultUpdateTime()
		ptc.mutation.SetUpdateTime(v)
	}
	if _, ok := ptc.mutation.IsInstanceProperty(); !ok {
		v := propertytype.DefaultIsInstanceProperty
		ptc.mutation.SetIsInstanceProperty(v)
	}
	if _, ok := ptc.mutation.Editable(); !ok {
		v := propertytype.DefaultEditable
		ptc.mutation.SetEditable(v)
	}
	if _, ok := ptc.mutation.Mandatory(); !ok {
		v := propertytype.DefaultMandatory
		ptc.mutation.SetMandatory(v)
	}
	if _, ok := ptc.mutation.Deleted(); !ok {
		v := propertytype.DefaultDeleted
		ptc.mutation.SetDeleted(v)
	}
	if _, ok := ptc.mutation.Listable(); !ok {
		v := propertytype.DefaultListable
		ptc.mutation.SetListable(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ptc *PropertyTypeCreate) check() error {
	if _, ok := ptc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := ptc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := ptc.mutation.GetType(); !ok {
		return &ValidationError{Name: "type", err: errors.New("ent: missing required field \"type\"")}
	}
	if v, ok := ptc.mutation.GetType(); ok {
		if err := propertytype.TypeValidator(v); err != nil {
			return &ValidationError{Name: "type", err: fmt.Errorf("ent: validator failed for field \"type\": %w", err)}
		}
	}
	if _, ok := ptc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if _, ok := ptc.mutation.IsInstanceProperty(); !ok {
		return &ValidationError{Name: "is_instance_property", err: errors.New("ent: missing required field \"is_instance_property\"")}
	}
	if _, ok := ptc.mutation.Editable(); !ok {
		return &ValidationError{Name: "editable", err: errors.New("ent: missing required field \"editable\"")}
	}
	if _, ok := ptc.mutation.Mandatory(); !ok {
		return &ValidationError{Name: "mandatory", err: errors.New("ent: missing required field \"mandatory\"")}
	}
	if _, ok := ptc.mutation.Deleted(); !ok {
		return &ValidationError{Name: "deleted", err: errors.New("ent: missing required field \"deleted\"")}
	}
	if _, ok := ptc.mutation.Listable(); !ok {
		return &ValidationError{Name: "listable", err: errors.New("ent: missing required field \"listable\"")}
	}
	return nil
}

func (ptc *PropertyTypeCreate) sqlSave(ctx context.Context) (*PropertyType, error) {
	_node, _spec := ptc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ptc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (ptc *PropertyTypeCreate) createSpec() (*PropertyType, *sqlgraph.CreateSpec) {
	var (
		_node = &PropertyType{config: ptc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: propertytype.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: propertytype.FieldID,
			},
		}
	)
	if value, ok := ptc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertytype.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := ptc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: propertytype.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := ptc.mutation.GetType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: propertytype.FieldType,
		})
		_node.Type = value
	}
	if value, ok := ptc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytype.FieldName,
		})
		_node.Name = value
	}
	if value, ok := ptc.mutation.ExternalID(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytype.FieldExternalID,
		})
		_node.ExternalID = value
	}
	if value, ok := ptc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: propertytype.FieldIndex,
		})
		_node.Index = value
	}
	if value, ok := ptc.mutation.Category(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytype.FieldCategory,
		})
		_node.Category = value
	}
	if value, ok := ptc.mutation.IntVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: propertytype.FieldIntVal,
		})
		_node.IntVal = &value
	}
	if value, ok := ptc.mutation.BoolVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldBoolVal,
		})
		_node.BoolVal = &value
	}
	if value, ok := ptc.mutation.FloatVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: propertytype.FieldFloatVal,
		})
		_node.FloatVal = &value
	}
	if value, ok := ptc.mutation.LatitudeVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: propertytype.FieldLatitudeVal,
		})
		_node.LatitudeVal = &value
	}
	if value, ok := ptc.mutation.LongitudeVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: propertytype.FieldLongitudeVal,
		})
		_node.LongitudeVal = &value
	}
	if value, ok := ptc.mutation.StringVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytype.FieldStringVal,
		})
		_node.StringVal = &value
	}
	if value, ok := ptc.mutation.RangeFromVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: propertytype.FieldRangeFromVal,
		})
		_node.RangeFromVal = &value
	}
	if value, ok := ptc.mutation.RangeToVal(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: propertytype.FieldRangeToVal,
		})
		_node.RangeToVal = &value
	}
	if value, ok := ptc.mutation.IsInstanceProperty(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldIsInstanceProperty,
		})
		_node.IsInstanceProperty = value
	}
	if value, ok := ptc.mutation.Editable(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldEditable,
		})
		_node.Editable = value
	}
	if value, ok := ptc.mutation.Mandatory(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldMandatory,
		})
		_node.Mandatory = value
	}
	if value, ok := ptc.mutation.Deleted(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldDeleted,
		})
		_node.Deleted = value
	}
	if value, ok := ptc.mutation.Listable(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeBool,
			Value:  value,
			Column: propertytype.FieldListable,
		})
		_node.Listable = value
	}
	if value, ok := ptc.mutation.NodeType(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: propertytype.FieldNodeType,
		})
		_node.NodeType = value
	}
	if nodes := ptc.mutation.PropertiesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   propertytype.PropertiesTable,
			Columns: []string{propertytype.PropertiesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: property.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.LocationTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.LocationTypeTable,
			Columns: []string{propertytype.LocationTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: locationtype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.EquipmentPortTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.EquipmentPortTypeTable,
			Columns: []string{propertytype.EquipmentPortTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmentporttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.LinkEquipmentPortTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.LinkEquipmentPortTypeTable,
			Columns: []string{propertytype.LinkEquipmentPortTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmentporttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.EquipmentTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.EquipmentTypeTable,
			Columns: []string{propertytype.EquipmentTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipmenttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.ServiceTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.ServiceTypeTable,
			Columns: []string{propertytype.ServiceTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: servicetype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.WorkOrderTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.WorkOrderTypeTable,
			Columns: []string{propertytype.WorkOrderTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workordertype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.WorkOrderTemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.WorkOrderTemplateTable,
			Columns: []string{propertytype.WorkOrderTemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workordertemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.ProjectTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.ProjectTypeTable,
			Columns: []string{propertytype.ProjectTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: projecttype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.ProjectTemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.ProjectTemplateTable,
			Columns: []string{propertytype.ProjectTemplateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: projecttemplate.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ptc.mutation.WorkerTypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   propertytype.WorkerTypeTable,
			Columns: []string{propertytype.WorkerTypeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: workertype.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// PropertyTypeCreateBulk is the builder for creating a bulk of PropertyType entities.
type PropertyTypeCreateBulk struct {
	config
	builders []*PropertyTypeCreate
}

// Save creates the PropertyType entities in the database.
func (ptcb *PropertyTypeCreateBulk) Save(ctx context.Context) ([]*PropertyType, error) {
	specs := make([]*sqlgraph.CreateSpec, len(ptcb.builders))
	nodes := make([]*PropertyType, len(ptcb.builders))
	mutators := make([]Mutator, len(ptcb.builders))
	for i := range ptcb.builders {
		func(i int, root context.Context) {
			builder := ptcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*PropertyTypeMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ptcb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ptcb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
						if cerr, ok := isSQLConstraintError(err); ok {
							err = cerr
						}
					}
				}
				mutation.done = true
				if err != nil {
					return nil, err
				}
				id := specs[i].ID.Value.(int64)
				nodes[i].ID = int(id)
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ptcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (ptcb *PropertyTypeCreateBulk) SaveX(ctx context.Context) []*PropertyType {
	v, err := ptcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
