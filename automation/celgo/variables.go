package celgo

import (
	"github.com/google/cel-go/cel"
)

const (
	InputVariable = "input"
	StateVariable = "state"
)

type AstKey struct {
	Key      string
	AstValue string
}

func variables() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Variable(InputVariable, cel.MapType(cel.StringType, cel.DynType)),
		cel.Variable(StateVariable, cel.MapType(cel.StringType, cel.DynType)),
	}
}
