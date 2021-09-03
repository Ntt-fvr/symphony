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
	"github.com/facebookincubator/symphony/pkg/ent/activity"
	"github.com/facebookincubator/symphony/pkg/ent/appointment"
	"github.com/facebookincubator/symphony/pkg/ent/checklistcategory"
	"github.com/facebookincubator/symphony/pkg/ent/comment"
	"github.com/facebookincubator/symphony/pkg/ent/equipment"
	"github.com/facebookincubator/symphony/pkg/ent/file"
	"github.com/facebookincubator/symphony/pkg/ent/hyperlink"
	"github.com/facebookincubator/symphony/pkg/ent/link"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/project"
	"github.com/facebookincubator/symphony/pkg/ent/property"
	"github.com/facebookincubator/symphony/pkg/ent/user"
	"github.com/facebookincubator/symphony/pkg/ent/workorder"
	"github.com/facebookincubator/symphony/pkg/ent/workordertemplate"
	"github.com/facebookincubator/symphony/pkg/ent/workordertype"
)

// WorkOrderCreate is the builder for creating a WorkOrder entity.
type WorkOrderCreate struct {
	config
	mutation *WorkOrderMutation
	hooks    []Hook
}

// SetCreateTime sets the create_time field.
func (woc *WorkOrderCreate) SetCreateTime(t time.Time) *WorkOrderCreate {
	woc.mutation.SetCreateTime(t)
	return woc
}

// SetNillableCreateTime sets the create_time field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableCreateTime(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetCreateTime(*t)
	}
	return woc
}

// SetUpdateTime sets the update_time field.
func (woc *WorkOrderCreate) SetUpdateTime(t time.Time) *WorkOrderCreate {
	woc.mutation.SetUpdateTime(t)
	return woc
}

// SetNillableUpdateTime sets the update_time field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableUpdateTime(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetUpdateTime(*t)
	}
	return woc
}

// SetName sets the name field.
func (woc *WorkOrderCreate) SetName(s string) *WorkOrderCreate {
	woc.mutation.SetName(s)
	return woc
}

// SetStatus sets the status field.
func (woc *WorkOrderCreate) SetStatus(w workorder.Status) *WorkOrderCreate {
	woc.mutation.SetStatus(w)
	return woc
}

// SetNillableStatus sets the status field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableStatus(w *workorder.Status) *WorkOrderCreate {
	if w != nil {
		woc.SetStatus(*w)
	}
	return woc
}

// SetPriority sets the priority field.
func (woc *WorkOrderCreate) SetPriority(w workorder.Priority) *WorkOrderCreate {
	woc.mutation.SetPriority(w)
	return woc
}

// SetNillablePriority sets the priority field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillablePriority(w *workorder.Priority) *WorkOrderCreate {
	if w != nil {
		woc.SetPriority(*w)
	}
	return woc
}

// SetDescription sets the description field.
func (woc *WorkOrderCreate) SetDescription(s string) *WorkOrderCreate {
	woc.mutation.SetDescription(s)
	return woc
}

// SetNillableDescription sets the description field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableDescription(s *string) *WorkOrderCreate {
	if s != nil {
		woc.SetDescription(*s)
	}
	return woc
}

// SetInstallDate sets the install_date field.
func (woc *WorkOrderCreate) SetInstallDate(t time.Time) *WorkOrderCreate {
	woc.mutation.SetInstallDate(t)
	return woc
}

// SetNillableInstallDate sets the install_date field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableInstallDate(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetInstallDate(*t)
	}
	return woc
}

// SetCreationDate sets the creation_date field.
func (woc *WorkOrderCreate) SetCreationDate(t time.Time) *WorkOrderCreate {
	woc.mutation.SetCreationDate(t)
	return woc
}

// SetIndex sets the index field.
func (woc *WorkOrderCreate) SetIndex(i int) *WorkOrderCreate {
	woc.mutation.SetIndex(i)
	return woc
}

// SetNillableIndex sets the index field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableIndex(i *int) *WorkOrderCreate {
	if i != nil {
		woc.SetIndex(*i)
	}
	return woc
}

// SetCloseDate sets the close_date field.
func (woc *WorkOrderCreate) SetCloseDate(t time.Time) *WorkOrderCreate {
	woc.mutation.SetCloseDate(t)
	return woc
}

// SetNillableCloseDate sets the close_date field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableCloseDate(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetCloseDate(*t)
	}
	return woc
}

// SetDuration sets the duration field.
func (woc *WorkOrderCreate) SetDuration(f float64) *WorkOrderCreate {
	woc.mutation.SetDuration(f)
	return woc
}

// SetNillableDuration sets the duration field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableDuration(f *float64) *WorkOrderCreate {
	if f != nil {
		woc.SetDuration(*f)
	}
	return woc
}

// SetSchedulledAt sets the schedulled_at field.
func (woc *WorkOrderCreate) SetSchedulledAt(t time.Time) *WorkOrderCreate {
	woc.mutation.SetSchedulledAt(t)
	return woc
}

// SetNillableSchedulledAt sets the schedulled_at field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableSchedulledAt(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetSchedulledAt(*t)
	}
	return woc
}

// SetDueDate sets the due_date field.
func (woc *WorkOrderCreate) SetDueDate(t time.Time) *WorkOrderCreate {
	woc.mutation.SetDueDate(t)
	return woc
}

// SetNillableDueDate sets the due_date field if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableDueDate(t *time.Time) *WorkOrderCreate {
	if t != nil {
		woc.SetDueDate(*t)
	}
	return woc
}

// SetTypeID sets the type edge to WorkOrderType by id.
func (woc *WorkOrderCreate) SetTypeID(id int) *WorkOrderCreate {
	woc.mutation.SetTypeID(id)
	return woc
}

// SetNillableTypeID sets the type edge to WorkOrderType by id if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableTypeID(id *int) *WorkOrderCreate {
	if id != nil {
		woc = woc.SetTypeID(*id)
	}
	return woc
}

// SetType sets the type edge to WorkOrderType.
func (woc *WorkOrderCreate) SetType(w *WorkOrderType) *WorkOrderCreate {
	return woc.SetTypeID(w.ID)
}

// SetTemplateID sets the template edge to WorkOrderTemplate by id.
func (woc *WorkOrderCreate) SetTemplateID(id int) *WorkOrderCreate {
	woc.mutation.SetTemplateID(id)
	return woc
}

// SetNillableTemplateID sets the template edge to WorkOrderTemplate by id if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableTemplateID(id *int) *WorkOrderCreate {
	if id != nil {
		woc = woc.SetTemplateID(*id)
	}
	return woc
}

// SetTemplate sets the template edge to WorkOrderTemplate.
func (woc *WorkOrderCreate) SetTemplate(w *WorkOrderTemplate) *WorkOrderCreate {
	return woc.SetTemplateID(w.ID)
}

// AddEquipmentIDs adds the equipment edge to Equipment by ids.
func (woc *WorkOrderCreate) AddEquipmentIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddEquipmentIDs(ids...)
	return woc
}

// AddEquipment adds the equipment edges to Equipment.
func (woc *WorkOrderCreate) AddEquipment(e ...*Equipment) *WorkOrderCreate {
	ids := make([]int, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return woc.AddEquipmentIDs(ids...)
}

// AddLinkIDs adds the links edge to Link by ids.
func (woc *WorkOrderCreate) AddLinkIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddLinkIDs(ids...)
	return woc
}

// AddLinks adds the links edges to Link.
func (woc *WorkOrderCreate) AddLinks(l ...*Link) *WorkOrderCreate {
	ids := make([]int, len(l))
	for i := range l {
		ids[i] = l[i].ID
	}
	return woc.AddLinkIDs(ids...)
}

// AddFileIDs adds the files edge to File by ids.
func (woc *WorkOrderCreate) AddFileIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddFileIDs(ids...)
	return woc
}

// AddFiles adds the files edges to File.
func (woc *WorkOrderCreate) AddFiles(f ...*File) *WorkOrderCreate {
	ids := make([]int, len(f))
	for i := range f {
		ids[i] = f[i].ID
	}
	return woc.AddFileIDs(ids...)
}

// AddHyperlinkIDs adds the hyperlinks edge to Hyperlink by ids.
func (woc *WorkOrderCreate) AddHyperlinkIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddHyperlinkIDs(ids...)
	return woc
}

// AddHyperlinks adds the hyperlinks edges to Hyperlink.
func (woc *WorkOrderCreate) AddHyperlinks(h ...*Hyperlink) *WorkOrderCreate {
	ids := make([]int, len(h))
	for i := range h {
		ids[i] = h[i].ID
	}
	return woc.AddHyperlinkIDs(ids...)
}

// SetLocationID sets the location edge to Location by id.
func (woc *WorkOrderCreate) SetLocationID(id int) *WorkOrderCreate {
	woc.mutation.SetLocationID(id)
	return woc
}

// SetNillableLocationID sets the location edge to Location by id if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableLocationID(id *int) *WorkOrderCreate {
	if id != nil {
		woc = woc.SetLocationID(*id)
	}
	return woc
}

// SetLocation sets the location edge to Location.
func (woc *WorkOrderCreate) SetLocation(l *Location) *WorkOrderCreate {
	return woc.SetLocationID(l.ID)
}

// AddCommentIDs adds the comments edge to Comment by ids.
func (woc *WorkOrderCreate) AddCommentIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddCommentIDs(ids...)
	return woc
}

// AddComments adds the comments edges to Comment.
func (woc *WorkOrderCreate) AddComments(c ...*Comment) *WorkOrderCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return woc.AddCommentIDs(ids...)
}

// AddActivityIDs adds the activities edge to Activity by ids.
func (woc *WorkOrderCreate) AddActivityIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddActivityIDs(ids...)
	return woc
}

// AddActivities adds the activities edges to Activity.
func (woc *WorkOrderCreate) AddActivities(a ...*Activity) *WorkOrderCreate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return woc.AddActivityIDs(ids...)
}

// AddPropertyIDs adds the properties edge to Property by ids.
func (woc *WorkOrderCreate) AddPropertyIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddPropertyIDs(ids...)
	return woc
}

// AddProperties adds the properties edges to Property.
func (woc *WorkOrderCreate) AddProperties(p ...*Property) *WorkOrderCreate {
	ids := make([]int, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return woc.AddPropertyIDs(ids...)
}

// AddCheckListCategoryIDs adds the check_list_categories edge to CheckListCategory by ids.
func (woc *WorkOrderCreate) AddCheckListCategoryIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddCheckListCategoryIDs(ids...)
	return woc
}

// AddCheckListCategories adds the check_list_categories edges to CheckListCategory.
func (woc *WorkOrderCreate) AddCheckListCategories(c ...*CheckListCategory) *WorkOrderCreate {
	ids := make([]int, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return woc.AddCheckListCategoryIDs(ids...)
}

// SetProjectID sets the project edge to Project by id.
func (woc *WorkOrderCreate) SetProjectID(id int) *WorkOrderCreate {
	woc.mutation.SetProjectID(id)
	return woc
}

// SetNillableProjectID sets the project edge to Project by id if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableProjectID(id *int) *WorkOrderCreate {
	if id != nil {
		woc = woc.SetProjectID(*id)
	}
	return woc
}

// SetProject sets the project edge to Project.
func (woc *WorkOrderCreate) SetProject(p *Project) *WorkOrderCreate {
	return woc.SetProjectID(p.ID)
}

// SetOwnerID sets the owner edge to User by id.
func (woc *WorkOrderCreate) SetOwnerID(id int) *WorkOrderCreate {
	woc.mutation.SetOwnerID(id)
	return woc
}

// SetOwner sets the owner edge to User.
func (woc *WorkOrderCreate) SetOwner(u *User) *WorkOrderCreate {
	return woc.SetOwnerID(u.ID)
}

// SetAssigneeID sets the assignee edge to User by id.
func (woc *WorkOrderCreate) SetAssigneeID(id int) *WorkOrderCreate {
	woc.mutation.SetAssigneeID(id)
	return woc
}

// SetNillableAssigneeID sets the assignee edge to User by id if the given value is not nil.
func (woc *WorkOrderCreate) SetNillableAssigneeID(id *int) *WorkOrderCreate {
	if id != nil {
		woc = woc.SetAssigneeID(*id)
	}
	return woc
}

// SetAssignee sets the assignee edge to User.
func (woc *WorkOrderCreate) SetAssignee(u *User) *WorkOrderCreate {
	return woc.SetAssigneeID(u.ID)
}

// AddAppointmentIDs adds the appointment edge to Appointment by ids.
func (woc *WorkOrderCreate) AddAppointmentIDs(ids ...int) *WorkOrderCreate {
	woc.mutation.AddAppointmentIDs(ids...)
	return woc
}

// AddAppointment adds the appointment edges to Appointment.
func (woc *WorkOrderCreate) AddAppointment(a ...*Appointment) *WorkOrderCreate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return woc.AddAppointmentIDs(ids...)
}

// Mutation returns the WorkOrderMutation object of the builder.
func (woc *WorkOrderCreate) Mutation() *WorkOrderMutation {
	return woc.mutation
}

// Save creates the WorkOrder in the database.
func (woc *WorkOrderCreate) Save(ctx context.Context) (*WorkOrder, error) {
	var (
		err  error
		node *WorkOrder
	)
	woc.defaults()
	if len(woc.hooks) == 0 {
		if err = woc.check(); err != nil {
			return nil, err
		}
		node, err = woc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*WorkOrderMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = woc.check(); err != nil {
				return nil, err
			}
			woc.mutation = mutation
			node, err = woc.sqlSave(ctx)
			mutation.done = true
			return node, err
		})
		for i := len(woc.hooks) - 1; i >= 0; i-- {
			mut = woc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, woc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (woc *WorkOrderCreate) SaveX(ctx context.Context) *WorkOrder {
	v, err := woc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// defaults sets the default values of the builder before save.
func (woc *WorkOrderCreate) defaults() {
	if _, ok := woc.mutation.CreateTime(); !ok {
		v := workorder.DefaultCreateTime()
		woc.mutation.SetCreateTime(v)
	}
	if _, ok := woc.mutation.UpdateTime(); !ok {
		v := workorder.DefaultUpdateTime()
		woc.mutation.SetUpdateTime(v)
	}
	if _, ok := woc.mutation.Status(); !ok {
		v := workorder.DefaultStatus
		woc.mutation.SetStatus(v)
	}
	if _, ok := woc.mutation.Priority(); !ok {
		v := workorder.DefaultPriority
		woc.mutation.SetPriority(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (woc *WorkOrderCreate) check() error {
	if _, ok := woc.mutation.CreateTime(); !ok {
		return &ValidationError{Name: "create_time", err: errors.New("ent: missing required field \"create_time\"")}
	}
	if _, ok := woc.mutation.UpdateTime(); !ok {
		return &ValidationError{Name: "update_time", err: errors.New("ent: missing required field \"update_time\"")}
	}
	if _, ok := woc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New("ent: missing required field \"name\"")}
	}
	if v, ok := woc.mutation.Name(); ok {
		if err := workorder.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf("ent: validator failed for field \"name\": %w", err)}
		}
	}
	if _, ok := woc.mutation.Status(); !ok {
		return &ValidationError{Name: "status", err: errors.New("ent: missing required field \"status\"")}
	}
	if v, ok := woc.mutation.Status(); ok {
		if err := workorder.StatusValidator(v); err != nil {
			return &ValidationError{Name: "status", err: fmt.Errorf("ent: validator failed for field \"status\": %w", err)}
		}
	}
	if _, ok := woc.mutation.Priority(); !ok {
		return &ValidationError{Name: "priority", err: errors.New("ent: missing required field \"priority\"")}
	}
	if v, ok := woc.mutation.Priority(); ok {
		if err := workorder.PriorityValidator(v); err != nil {
			return &ValidationError{Name: "priority", err: fmt.Errorf("ent: validator failed for field \"priority\": %w", err)}
		}
	}
	if _, ok := woc.mutation.CreationDate(); !ok {
		return &ValidationError{Name: "creation_date", err: errors.New("ent: missing required field \"creation_date\"")}
	}
	if _, ok := woc.mutation.OwnerID(); !ok {
		return &ValidationError{Name: "owner", err: errors.New("ent: missing required edge \"owner\"")}
	}
	return nil
}

func (woc *WorkOrderCreate) sqlSave(ctx context.Context) (*WorkOrder, error) {
	_node, _spec := woc.createSpec()
	if err := sqlgraph.CreateNode(ctx, woc.driver, _spec); err != nil {
		if cerr, ok := isSQLConstraintError(err); ok {
			err = cerr
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	return _node, nil
}

func (woc *WorkOrderCreate) createSpec() (*WorkOrder, *sqlgraph.CreateSpec) {
	var (
		_node = &WorkOrder{config: woc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: workorder.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeInt,
				Column: workorder.FieldID,
			},
		}
	)
	if value, ok := woc.mutation.CreateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldCreateTime,
		})
		_node.CreateTime = value
	}
	if value, ok := woc.mutation.UpdateTime(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldUpdateTime,
		})
		_node.UpdateTime = value
	}
	if value, ok := woc.mutation.Name(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workorder.FieldName,
		})
		_node.Name = value
	}
	if value, ok := woc.mutation.Status(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: workorder.FieldStatus,
		})
		_node.Status = value
	}
	if value, ok := woc.mutation.Priority(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeEnum,
			Value:  value,
			Column: workorder.FieldPriority,
		})
		_node.Priority = value
	}
	if value, ok := woc.mutation.Description(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: workorder.FieldDescription,
		})
		_node.Description = &value
	}
	if value, ok := woc.mutation.InstallDate(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldInstallDate,
		})
		_node.InstallDate = &value
	}
	if value, ok := woc.mutation.CreationDate(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldCreationDate,
		})
		_node.CreationDate = value
	}
	if value, ok := woc.mutation.Index(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeInt,
			Value:  value,
			Column: workorder.FieldIndex,
		})
		_node.Index = value
	}
	if value, ok := woc.mutation.CloseDate(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldCloseDate,
		})
		_node.CloseDate = &value
	}
	if value, ok := woc.mutation.Duration(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeFloat64,
			Value:  value,
			Column: workorder.FieldDuration,
		})
		_node.Duration = &value
	}
	if value, ok := woc.mutation.SchedulledAt(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldSchedulledAt,
		})
		_node.SchedulledAt = &value
	}
	if value, ok := woc.mutation.DueDate(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeTime,
			Value:  value,
			Column: workorder.FieldDueDate,
		})
		_node.DueDate = &value
	}
	if nodes := woc.mutation.TypeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorder.TypeTable,
			Columns: []string{workorder.TypeColumn},
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
	if nodes := woc.mutation.TemplateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorder.TemplateTable,
			Columns: []string{workorder.TemplateColumn},
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
	if nodes := woc.mutation.EquipmentIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   workorder.EquipmentTable,
			Columns: []string{workorder.EquipmentColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: equipment.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.LinksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: true,
			Table:   workorder.LinksTable,
			Columns: []string{workorder.LinksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: link.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.FilesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.FilesTable,
			Columns: []string{workorder.FilesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: file.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.HyperlinksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.HyperlinksTable,
			Columns: []string{workorder.HyperlinksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: hyperlink.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.LocationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorder.LocationTable,
			Columns: []string{workorder.LocationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: location.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.CommentsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.CommentsTable,
			Columns: []string{workorder.CommentsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: comment.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.ActivitiesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.ActivitiesTable,
			Columns: []string{workorder.ActivitiesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: activity.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.PropertiesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.PropertiesTable,
			Columns: []string{workorder.PropertiesColumn},
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
	if nodes := woc.mutation.CheckListCategoriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.CheckListCategoriesTable,
			Columns: []string{workorder.CheckListCategoriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: checklistcategory.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.ProjectIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   workorder.ProjectTable,
			Columns: []string{workorder.ProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: project.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.OwnerIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorder.OwnerTable,
			Columns: []string{workorder.OwnerColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.AssigneeIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   workorder.AssigneeTable,
			Columns: []string{workorder.AssigneeColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := woc.mutation.AppointmentIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   workorder.AppointmentTable,
			Columns: []string{workorder.AppointmentColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeInt,
					Column: appointment.FieldID,
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

// WorkOrderCreateBulk is the builder for creating a bulk of WorkOrder entities.
type WorkOrderCreateBulk struct {
	config
	builders []*WorkOrderCreate
}

// Save creates the WorkOrder entities in the database.
func (wocb *WorkOrderCreateBulk) Save(ctx context.Context) ([]*WorkOrder, error) {
	specs := make([]*sqlgraph.CreateSpec, len(wocb.builders))
	nodes := make([]*WorkOrder, len(wocb.builders))
	mutators := make([]Mutator, len(wocb.builders))
	for i := range wocb.builders {
		func(i int, root context.Context) {
			builder := wocb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*WorkOrderMutation)
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
					_, err = mutators[i+1].Mutate(root, wocb.builders[i+1].mutation)
				} else {
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, wocb.driver, &sqlgraph.BatchCreateSpec{Nodes: specs}); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, wocb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX calls Save and panics if Save returns an error.
func (wocb *WorkOrderCreateBulk) SaveX(ctx context.Context) []*WorkOrder {
	v, err := wocb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}
