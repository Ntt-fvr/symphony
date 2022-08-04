package celgo

import (
	"reflect"
	"strings"

	"github.com/google/cel-go/cel"

	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

const (
	StringAppend     = "function_string_append"
	StringIndexOf    = "function_string_index_of"
	StringJoin       = "function_string_join"
	StringJoinWith   = "function_string_join_with"
	StringLower      = "function_string_lower"
	StringPrepend    = "function_string_prepend"
	StringReplaceAll = "function_string_replace_all"
	StringSplit      = "function_string_split"
	StringSubstring1 = "function_string_substring1"
	StringSubstring2 = "function_string_substring2"
	StringTrim       = "function_string_trim"
	StringUpper      = "function_string_upper"
)

func stringGlobalFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("strings.join",
			cel.Overload(StringJoin,
				[]*cel.Type{cel.ListType(cel.StringType), cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						list, err := value1.ConvertToNative(reflect.TypeOf([]string{}))
						if err != nil {
							return &types.Err{}
						}

						sep := value2.Value().(string)
						return types.String(strings.Join(list.([]string), sep))
					},
				),
			),
		),
	}
}

func stringInstanceFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("toLower",
			cel.MemberOverload(StringLower,
				[]*cel.Type{cel.StringType}, cel.StringType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						v := value.Value().(string)
						return types.String(strings.ToLower(v))
					},
				),
			),
		),
		cel.Function("toUpper",
			cel.MemberOverload(StringUpper,
				[]*cel.Type{cel.StringType}, cel.StringType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						v := value.Value().(string)
						return types.String(strings.ToUpper(v))
					},
				),
			),
		),
		cel.Function("replaceAll",
			cel.MemberOverload(StringReplaceAll,
				[]*cel.Type{cel.StringType, cel.StringType, cel.StringType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
						s := values[0].Value().(string)
						old := values[1].Value().(string)
						value := values[2].Value().(string)
						return types.String(strings.ReplaceAll(s, old, value))
					},
				),
			),
		),
		cel.Function("joinWith",
			cel.MemberOverload(StringJoinWith,
				[]*cel.Type{cel.StringType, cel.StringType, cel.StringType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
						s := values[0].Value().(string)
						elem := values[1].Value().(string)
						sep := values[2].Value().(string)
						return types.String(strings.Join([]string{s, elem}, sep))
					},
				),
			),
		),
		cel.Function("indexOf",
			cel.MemberOverload(StringIndexOf,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.IntType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						v := value1.Value().(string)
						ew := value2.Value().(string)
						return types.Int(strings.Index(v, ew))
					},
				),
			),
		),
		cel.Function("split",
			cel.MemberOverload(StringSplit,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.ListType(cel.StringType),
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						v := value1.Value().(string)
						sep := value2.Value().(string)
						return types.DefaultTypeAdapter.NativeToValue(strings.Split(v, sep))
					},
				),
			),
		),
		cel.Function("trim",
			cel.MemberOverload(StringTrim,
				[]*cel.Type{cel.StringType}, cel.StringType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						v := value.Value().(string)
						return types.String(strings.TrimSpace(v))
					},
				),
			),
		),
		cel.Function("substring",
			cel.MemberOverload(StringSubstring1,
				[]*cel.Type{cel.StringType, cel.IntType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						v := value1.Value().(string)
						st := value2.Value().(int64)
						return types.String(v[st:])
					},
				),
			),
			cel.MemberOverload(StringSubstring2,
				[]*cel.Type{cel.StringType, cel.IntType, cel.IntType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
						s := values[0].Value().(string)
						st := values[1].Value().(int64)
						en := values[2].Value().(int64)
						return types.String(s[st:en])
					},
				),
			),
		),
		cel.Function("append",
			cel.MemberOverload(StringAppend,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						v := value1.Value().(string)
						a := value2.Value().(string)
						return types.String(v + a)
					},
				),
			),
		),
		cel.Function("prepend",
			cel.MemberOverload(StringPrepend,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						v := value1.Value().(string)
						a := value2.Value().(string)
						return types.String(a + v)
					},
				),
			),
		),
	}
}
