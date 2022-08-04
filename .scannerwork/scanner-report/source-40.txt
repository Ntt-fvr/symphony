package celgo

import (
	flat "github.com/everisopennetworks/json-flat-go"
	"github.com/google/cel-go/cel"

	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

const (
	GlobalFlatten   = "function_flatten"
	GlobalUnFlatten = "function_un-flatten"
)

var flatOptions = &flat.Options{
	Delimiter:      ".",
	ArrayDelimiter: "BRACKETS",
}

var unFlatOptions = &flat.Options{
	Delimiter:      ".",
	SliceDeepMerge: true,
	ArrayDelimiter: "BRACKETS",
}

func globalFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("flatten",
			cel.Overload(GlobalFlatten,
				[]*cel.Type{cel.DynType}, cel.MapType(cel.StringType, cel.DynType),
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						native, err := ConvertToNative(value)
						if err != nil {
							return types.NewStringInterfaceMap(types.DefaultTypeAdapter, map[string]interface{}{})
						}
						flatten, err := flat.Flatten(native, flatOptions)
						if err != nil {
							return types.NewStringInterfaceMap(types.DefaultTypeAdapter, map[string]interface{}{})
						}
						return types.NewStringInterfaceMap(types.DefaultTypeAdapter, flatten)
					},
				),
			),
		),
		cel.Function("unflatten",
			cel.Overload(GlobalUnFlatten,
				[]*cel.Type{cel.MapType(cel.StringType, cel.DynType)}, cel.MapType(cel.StringType, cel.DynType),
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						native, err := ConvertToNative(value)
						if err != nil {
							return types.NewStringInterfaceMap(types.DefaultTypeAdapter, map[string]interface{}{})
						}
						flatten, err := flat.Unflatten(native, unFlatOptions)
						if err != nil {
							return types.NewStringInterfaceMap(types.DefaultTypeAdapter, map[string]interface{}{})
						}
						return types.NewStringInterfaceMap(types.DefaultTypeAdapter, flatten)
					},
				),
			),
		),
	}
}
