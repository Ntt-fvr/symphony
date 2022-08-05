package celgo

import (
	"reflect"

	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

var programs = map[string]cel.Program{}

var (
	boolType   = reflect.TypeOf((*types.Bool)(nil)).Elem()
	doubleType = reflect.TypeOf((*types.Double)(nil)).Elem()
	intType    = reflect.TypeOf((*types.Int)(nil)).Elem()
	stringType = reflect.TypeOf((*types.String)(nil)).Elem()
)

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

func ConvertToNative(value ref.Val) (interface{}, error) {
	if value == nil {
		return nil, nil
	}

	if !types.IsPrimitiveType(value) {
		result, err := value.ConvertToNative(reflect.TypeOf(map[string]interface{}{}))
		if err != nil {
			return nil, err
		}
		values := result.(map[string]interface{})
		for k, v := range values {
			switch v.(type) {
			case map[ref.Val]ref.Val:
				native := types.DefaultTypeAdapter.NativeToValue(v.(map[ref.Val]ref.Val))
				data, err := ConvertToNative(native)
				if err != nil {
					values[k] = v
				} else {
					values[k] = data
				}
			case []ref.Val:
				val := v.([]ref.Val)
				r := make([]interface{}, len(val))
				for j, v2 := range val {
					data, err := ConvertToNative(v2)
					if err != nil {
						r[j] = v2
					} else {
						r[j] = data
					}
				}
				values[k] = r
			}
		}
		return values, nil
	} else {
		switch reflect.TypeOf(value) {
		case stringType:
			return string(value.(types.String)), nil
		case intType:
			return int64(value.(types.Int)), nil
		case doubleType:
			return float64(value.(types.Double)), nil
		case boolType:
			return bool(value.(types.Bool)), nil
		default:
			return value.(ref.Val).Value(), nil
		}
	}
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
