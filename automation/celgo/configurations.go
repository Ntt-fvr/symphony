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
	envOptions = append(envOptions, dateGlobalFunctions()...)
	envOptions = append(envOptions, dateInstanceFunctions()...)
	envOptions = append(envOptions, mathGlobalFunctions()...)
	envOptions = append(envOptions, globalFunctions()...)

	environment, _ = cel.NewEnv(envOptions...)
}
