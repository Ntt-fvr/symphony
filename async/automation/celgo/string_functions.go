package celgo

import (
	"reflect"
	"strings"

	"github.com/google/cel-go/checker/decls"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
	"github.com/google/cel-go/interpreter/functions"
	exprpb "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
)

const (
	StringEndWith    = "function_string_end_with"
	StringIndexOf    = "function_string_index_of"
	StringJoin       = "function_string_join"
	StringLower      = "function_string_lower"
	StringReplaceAll = "function_string_replace_all"
	StringSplit      = "function_string_split"
	StringStartWith  = "function_string_start_with"
	StringSubstring1 = "function_string_substring1"
	StringSubstring2 = "function_string_substring2"
	StringTrim       = "function_string_trim"
	StringUpper      = "function_string_upper"
)

func stringGlobalFunctions() []*exprpb.Decl {
	return []*exprpb.Decl{
		decls.NewFunction("strings.join",
			decls.NewOverload(
				StringJoin,
				[]*exprpb.Type{decls.NewListType(decls.String), decls.String},
				decls.String,
			),
		),
	}
}

func stringGlobalFunctionsImpl() []*functions.Overload {
	return []*functions.Overload{
		{
			Operator: StringJoin,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case []ref.Val:
					list, err := value1.ConvertToNative(reflect.TypeOf([]string{}))
					if err != nil {
						return &types.Err{}
					}

					switch sep := value2.Value(); sep.(type) {
					case string:
						return types.String(strings.Join(list.([]string), sep.(string)))
					}
				}
				return nil
			},
		},
	}
}

func stringInstanceFunctions() []*exprpb.Decl {
	return []*exprpb.Decl{
		decls.NewFunction("toLower",
			decls.NewInstanceOverload(
				StringLower,
				[]*exprpb.Type{decls.String},
				decls.String,
			),
		),
		decls.NewFunction("toUpper",
			decls.NewInstanceOverload(
				StringUpper,
				[]*exprpb.Type{decls.String},
				decls.String,
			),
		),
		decls.NewFunction("replaceAll",
			decls.NewInstanceOverload(
				StringReplaceAll,
				[]*exprpb.Type{decls.String, decls.String, decls.String},
				decls.String,
			),
		),
		decls.NewFunction("startWith",
			decls.NewInstanceOverload(
				StringStartWith,
				[]*exprpb.Type{decls.String, decls.String},
				decls.Bool,
			),
		),
		decls.NewFunction("endWith",
			decls.NewInstanceOverload(
				StringEndWith,
				[]*exprpb.Type{decls.String, decls.String},
				decls.Bool,
			),
		),
		decls.NewFunction("indexOf",
			decls.NewInstanceOverload(
				StringIndexOf,
				[]*exprpb.Type{decls.String, decls.String},
				decls.Int,
			),
		),
		decls.NewFunction("split",
			decls.NewInstanceOverload(
				StringSplit,
				[]*exprpb.Type{decls.String, decls.String},
				decls.NewListType(decls.String),
			),
		),
		decls.NewFunction("trim",
			decls.NewInstanceOverload(
				StringTrim,
				[]*exprpb.Type{decls.String},
				decls.String,
			),
		),
		decls.NewFunction("substring",
			decls.NewInstanceOverload(
				StringSubstring1,
				[]*exprpb.Type{decls.String, decls.Int},
				decls.String,
			),
		),
		decls.NewFunction("substring",
			decls.NewInstanceOverload(
				StringSubstring2,
				[]*exprpb.Type{decls.String, decls.Int, decls.Int},
				decls.String,
			),
		),
	}
}

func stringInstanceFunctionsImpl() []*functions.Overload {
	return []*functions.Overload{
		{
			Operator: StringLower,
			Unary: func(value ref.Val) ref.Val {
				switch v := value.Value(); v.(type) {
				case string:
					return types.String(strings.ToLower(v.(string)))
				}
				return value
			},
		},
		{
			Operator: StringUpper,
			Unary: func(value ref.Val) ref.Val {
				switch v := value.Value(); v.(type) {
				case string:
					return types.String(strings.ToUpper(v.(string)))
				}
				return value
			},
		},
		{
			Operator: StringReplaceAll,
			Function: func(values ...ref.Val) ref.Val {
				switch l := len(values); l {
				case 0:
					return nil
				case 1, 2:
					return values[0]
				case 3:
					switch s := values[0].Value(); s.(type) {
					case string:
						switch old := values[1].Value(); old.(type) {
						case string:
							switch value := values[2].Value(); value.(type) {
							case string:
								return types.String(strings.ReplaceAll(s.(string), old.(string), value.(string)))
							}
						}
					}
				}
				return values[0]
			},
		},
		{
			Operator: StringStartWith,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case string:
					switch sw := value2.Value(); sw.(type) {
					case string:
						return types.Bool(strings.HasPrefix(v.(string), sw.(string)))
					}
				}
				return types.Bool(false)
			},
		},
		{
			Operator: StringEndWith,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case string:
					switch sw := value2.Value(); sw.(type) {
					case string:
						return types.Bool(strings.HasSuffix(v.(string), sw.(string)))
					}
				}
				return types.Bool(false)
			},
		},
		{
			Operator: StringIndexOf,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case string:
					switch ew := value2.Value(); ew.(type) {
					case string:
						return types.Int(strings.Index(v.(string), ew.(string)))
					}
				}
				return types.Int(-1)
			},
		},
		{
			Operator: StringSplit,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case string:
					switch sep := value2.Value(); sep.(type) {
					case string:
						return types.DefaultTypeAdapter.NativeToValue(strings.Split(v.(string), sep.(string)))
					}
				}
				return types.DefaultTypeAdapter.NativeToValue([]string{})
			},
		},
		{
			Operator: StringTrim,
			Unary: func(value ref.Val) ref.Val {
				switch v := value.Value(); v.(type) {
				case string:
					return types.String(strings.TrimSpace(v.(string)))
				}
				return value
			},
		},
		{
			Operator: StringSubstring1,
			Binary: func(value1, value2 ref.Val) ref.Val {
				switch v := value1.Value(); v.(type) {
				case string:
					switch st := value2.Value(); st.(type) {
					case int64:
						return types.String(v.(string)[st.(int64):])
					}
				}
				return value1
			},
		},
		{
			Operator: StringSubstring2,
			Function: func(values ...ref.Val) ref.Val {
				switch l := len(values); l {
				case 0:
					return nil
				case 1, 2:
					return values[0]
				case 3:
					switch s := values[0].Value(); s.(type) {
					case string:
						switch st := values[1].Value(); st.(type) {
						case int64:
							switch en := values[2].Value(); en.(type) {
							case int64:
								return types.String(s.(string)[st.(int64):en.(int64)])
							}
						}
					}
				}
				return values[0]
			},
		},
	}
}
