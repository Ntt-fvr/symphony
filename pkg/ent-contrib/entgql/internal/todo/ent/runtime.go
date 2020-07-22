// Code generated (@generated) by entc, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent/schema"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent/todo"
)

// The init function reads all schema descriptors with runtime
// code (default values, validators or hooks) and stitches it
// to their package variables.
func init() {
	todoFields := schema.Todo{}.Fields()
	_ = todoFields
	// todoDescCreatedAt is the schema descriptor for created_at field.
	todoDescCreatedAt := todoFields[0].Descriptor()
	// todo.DefaultCreatedAt holds the default value on creation for the created_at field.
	todo.DefaultCreatedAt = todoDescCreatedAt.Default.(func() time.Time)
	// todoDescPriority is the schema descriptor for priority field.
	todoDescPriority := todoFields[2].Descriptor()
	// todo.DefaultPriority holds the default value on creation for the priority field.
	todo.DefaultPriority = todoDescPriority.Default.(int)
	// todoDescText is the schema descriptor for text field.
	todoDescText := todoFields[3].Descriptor()
	// todo.TextValidator is a validator for the "text" field. It is called by the builders before save.
	todo.TextValidator = todoDescText.Validators[0].(func(string) error)
}
