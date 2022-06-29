package celgo

import (
	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/interpreter/functions"
	exprpb "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
)

var environment *cel.Env
var functionsImpl cel.ProgramOption

func init() {
	declarations := make([]*exprpb.Decl, 0)
	declarations = append(declarations, variables()...)
	declarations = append(declarations, stringGlobalFunctions()...)
	declarations = append(declarations, stringInstanceFunctions()...)
	declarations = append(declarations, mathGlobalFunctions()...)

	environment, _ = cel.NewEnv(cel.Declarations(declarations...))

	var overloads = make([]*functions.Overload, 0)
	overloads = append(overloads, stringGlobalFunctionsImpl()...)
	overloads = append(overloads, stringInstanceFunctionsImpl()...)
	overloads = append(overloads, mathGlobalFunctionsImpl()...)

	functionsImpl = cel.Functions(overloads...)
}
