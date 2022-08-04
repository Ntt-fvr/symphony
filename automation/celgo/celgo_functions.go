package celgo

import (
	"reflect"

	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

var programs = map[string]cel.Program{}

func compileAst(expr string) (*cel.Ast, error) {
	ast, iss := environment.Compile(expr)
	if iss.Err() != nil {
		return nil, iss.Err()
	}
	return ast, nil
}

func ConvertToValue(value interface{}) ref.Val {
	if value == nil {
		return nil
	}
	return types.DefaultTypeAdapter.NativeToValue(value)
}

func ConvertToNative(value ref.Val) (map[string]interface{}, error) {
	if value == nil {
		return map[string]interface{}{}, nil
	}

	result, err := value.ConvertToNative(reflect.TypeOf(map[string]interface{}{}))
	if err != nil {
		return nil, err
	}

	return result.(map[string]interface{}), nil
}

func Evaluate(astKey AstKey, variables map[string]interface{}) (ref.Val, error) {
	program, exists := programs[astKey.Key]
	if !exists {
		ast, err := compileAst(astKey.AstValue)
		if err != nil {
			return nil, err
		}

		program, err = environment.Program(ast)
		if err != nil {
			return nil, err
		}

		programs[astKey.Key] = program
	}

	result, _, err := program.Eval(variables)

	return result, err
}

func CompileAndEvaluate(expr string, variables map[string]interface{}) (ref.Val, error) {
	ast, err := compileAst(expr)
	if err != nil {
		return nil, err
	}
	return evaluate(ast, variables)
}

func evaluate(ast *cel.Ast, variables map[string]interface{}) (ref.Val, error) {
	program, err := environment.Program(ast)
	if err != nil {
		return nil, err
	}

	result, _, err := program.Eval(variables)
	return result, err
}
