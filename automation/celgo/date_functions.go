package celgo

import (
	"github.com/golang-module/carbon"
	"github.com/google/cel-go/cel"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
	"time"
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
				[]*cel.Type{cel.TimestampType, cel.StringType, cel.StringType}, cel.StringType,
				cel.FunctionBinding(
					func(values ...ref.Val) ref.Val {
						v := values[0].Value().(time.Time)
						f := values[1].Value().(string)
						tz := values[2].Value().(string)
						return types.String(carbon.CreateFromTimestampMilli(v.UnixMilli()).Format(f, tz))
					},
				),
			),
		),
	}
}
