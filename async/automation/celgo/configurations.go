package celgo

import (
	"github.com/google/cel-go/cel"
)

var environment *cel.Env

func init() {
	envOptions := make([]cel.EnvOption, 0)
	envOptions = append(envOptions, variables()...)
	envOptions = append(envOptions, stringGlobalFunctions()...)
	envOptions = append(envOptions, stringInstanceFunctions()...)
	envOptions = append(envOptions, mathGlobalFunctions()...)

	environment, _ = cel.NewEnv(envOptions...)
}
