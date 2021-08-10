package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/edge"
	"github.com/facebook/ent/schema/field"
	"github.com/facebookincubator/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/authz"
)

// Appointment defines de appointment schema
type Appointment struct {
	schema
}

// Fields returns Appointment fields.
func (Appointment) Fields() []ent.Field {
	return []ent.Field{
		field.Time("appointment_date"),
		field.Enum("status").
			NamedValues(
				"Active", "ACTIVE",
				"Cancelled", "CANCELLED",
			).
			Default("ACTIVE"),
		field.Time("creation_date").
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
	}
}

func (Appointment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("workorder", WorkOrder.Type).
			Ref("appointment").
			Unique(),
		edge.From("assignee", User.Type).
			Ref("appointment").
			Unique(),
	}
}

func (Appointment) Policy() ent.Policy {
	return authz.NewPolicy(
		authz.WithQueryRules(
			authz.WorkOrderReadPolicyRule(),
		),
		authz.WithMutationRules(
			authz.WorkOrderWritePolicyRule(),
			authz.AllowWorkOrderOwnerWrite(),
			authz.AllowWorkOrderAssigneeWrite(),
		),
	)
}
