package celgo

import (
	"github.com/google/cel-go/cel"
	"time"

	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

const (
	DateFormat = "function_date_format"
	DateNow    = "function_date_now"
)

func dateGlobalFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("time.now",
			cel.Overload(DateNow,
				[]*cel.Type{}, cel.TimestampType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
						return types.Timestamp{Time: time.Now()}
					},
				),
			),
		),
	}
}

func dateInstanceFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("format",
			cel.MemberOverload(DateFormat,
				[]*cel.Type{cel.TimestampType, cel.StringType}, cel.StringType,
				cel.BinaryBinding(
					func(value, value2 ref.Val) ref.Val {
						switch v := value.Value(); v.(type) {
						case time.Time:
							switch f := value2.Value(); f.(type) {
							case string:
								return types.String((v.(time.Time)).Format(f.(string)))
							}
						}
						return types.String("")
					},
				),
			),
		),
	}
}
