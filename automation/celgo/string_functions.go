package celgo

import (
	"github.com/google/cel-go/cel"
	"reflect"
	"strings"

	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

const (
	StringAppend     = "function_string_append"
	StringEndWith    = "function_string_end_with"
	StringIndexOf    = "function_string_index_of"
	StringJoin       = "function_string_join"
	StringLower      = "function_string_lower"
	StringPrepend    = "function_string_prepend"
	StringReplaceAll = "function_string_replace_all"
	StringSplit      = "function_string_split"
	StringStartWith  = "function_string_start_with"
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
						switch v := value.Value(); v.(type) {
						case string:
							return types.String(strings.ToLower(v.(string)))
						}
						return value
					},
				),
			),
		),
		cel.Function("toUpper",
			cel.MemberOverload(StringUpper,
				[]*cel.Type{cel.StringType}, cel.StringType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						switch v := value.Value(); v.(type) {
						case string:
							return types.String(strings.ToUpper(v.(string)))
						}
						return value
					},
				),
			),
		),
		cel.Function("replaceAll",
			cel.MemberOverload(StringReplaceAll,
				[]*cel.Type{cel.StringType, cel.StringType, cel.StringType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
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
				),
			),
		),
		cel.Function("startWith",
			cel.MemberOverload(StringStartWith,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.BoolType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch sw := value2.Value(); sw.(type) {
							case string:
								return types.Bool(strings.HasPrefix(v.(string), sw.(string)))
							}
						}
						return types.Bool(false)
					},
				),
			),
		),
		cel.Function("endWith",
			cel.MemberOverload(StringEndWith,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.BoolType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch sw := value2.Value(); sw.(type) {
							case string:
								return types.Bool(strings.HasSuffix(v.(string), sw.(string)))
							}
						}
						return types.Bool(false)
					},
				),
			),
		),
		cel.Function("indexOf",
			cel.MemberOverload(StringIndexOf,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.IntType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch ew := value2.Value(); ew.(type) {
							case string:
								return types.Int(strings.Index(v.(string), ew.(string)))
							}
						}
						return types.Int(-1)
					},
				),
			),
		),
		cel.Function("split",
			cel.MemberOverload(StringSplit,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.ListType(cel.StringType),
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch sep := value2.Value(); sep.(type) {
							case string:
								return types.DefaultTypeAdapter.NativeToValue(strings.Split(v.(string), sep.(string)))
							}
						}
						return types.DefaultTypeAdapter.NativeToValue([]string{})
					},
				),
			),
		),
		cel.Function("trim",
			cel.MemberOverload(StringTrim,
				[]*cel.Type{cel.StringType}, cel.StringType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						switch v := value.Value(); v.(type) {
						case string:
							return types.String(strings.TrimSpace(v.(string)))
						}
						return value
					},
				),
			),
		),
		cel.Function("substring",
			cel.MemberOverload(StringSubstring1,
				[]*cel.Type{cel.StringType, cel.IntType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch st := value2.Value(); st.(type) {
							case int64:
								return types.String(v.(string)[st.(int64):])
							}
						}
						return value1
					},
				),
			),
			cel.MemberOverload(StringSubstring2,
				[]*cel.Type{cel.StringType, cel.IntType, cel.IntType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
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
				),
			),
		),
		cel.Function("append",
			cel.MemberOverload(StringAppend,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch a := value2.Value(); a.(type) {
							case string:
								return types.String(v.(string) + a.(string))
							}
						}
						return types.String("")
					},
				),
			),
		),
		cel.Function("prepend",
			cel.MemberOverload(StringPrepend,
				[]*cel.Type{cel.StringType, cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						switch v := value1.Value(); v.(type) {
						case string:
							switch a := value2.Value(); a.(type) {
							case string:
								return types.String(a.(string) +  v.(string))
							}
						}
						return types.String("")
					},
				),
			),
		),
	}
}
