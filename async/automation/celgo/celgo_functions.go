package celgo

import (
	"errors"
	"fmt"
	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
	exprpb "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
	"google.golang.org/protobuf/proto"
	"reflect"
)

var programs = map[string]cel.Program{}

func Compile(expr string, exprType *exprpb.Type) (string, error) {
	ast, err := compile(expr, exprType)
	if err != nil {
		return "", err
	}
	return astToString(ast)
}

func compileAst(expr string) (*cel.Ast, error) {
	ast, iss := environment.Compile(expr)
	if iss.Err() != nil {
		return nil, iss.Err()
	}
	return ast, nil
}

func compile(expr string, exprType *exprpb.Type) (*cel.Ast, error) {
	ast, iss := compileAst(expr)
	if iss != nil {
		return nil, iss
	}
	if !proto.Equal(ast.ResultType(), exprType) {
		err := fmt.Sprintf("Got %v, wanted %v result type", ast.ResultType(), exprType)
		return nil, errors.New(err)
	}
	return ast, nil
}

func astToString(ast *cel.Ast) (string, error) {
	return cel.AstToString(ast)
}

func ConvertToAst(astValue string) (*cel.Ast, error) {
	ast, iss := environment.Parse(astValue)
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

	values := result.(map[string]interface{})
	for k, v := range values {
		switch v.(type) {
		case ref.Val:
			data, err := ConvertToNative(v.(ref.Val))
			if err != nil {
				values[k] = v
			} else {
				values[k] = data
			}
		case map[ref.Val]ref.Val:
			native := types.DefaultTypeAdapter.NativeToValue(v.(map[ref.Val]ref.Val))
			data, err := ConvertToNative(native)
			if err != nil {
				values[k] = v
			} else {
				values[k] = data
			}
		}
	}

	return values, nil
}

func Evaluate(astKey AstKey, variables map[string]interface{}) (ref.Val, error) {
	program, exists := programs[astKey.Key]
	if !exists {
		ast, err := ConvertToAst(astKey.AstValue)
		if err != nil {
			return nil, err
		}

		program, err = environment.Program(ast, functionsImpl)
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
	program, err := environment.Program(ast, functionsImpl)
	if err != nil {
		return nil, err
	}

	result, _, err := program.Eval(variables)
	return result, err
}
