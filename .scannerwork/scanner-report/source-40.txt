package celgo

import (
	"math"

	"github.com/google/cel-go/cel"

	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
)

const (
	MathAbs         = "function_math_abs"
	MathACos        = "function_math_arc_cos"
	MathArcCosHyper = "function_math_arc_cos_hyper"
	MathArcSin      = "function_math_arc_sin"
	MathArcSinHyper = "function_math_arc_sin_hyper"
	MathCos         = "function_math_cos"
	MathCosHyper    = "function_math_cos_hyper"
	MathSin         = "function_math_sin"
	MathSinHyper    = "function_math_sin_hyper"
	MathArcTan      = "function_math_arc_tan"
	MathArcTanHyper = "function_math_arc_tan_hyper"
	MathTan         = "function_math_tan"
	MathTanHyper    = "function_math_tan_hyper"
	MathCbrt        = "function_math_cbrt"
	MathSqrt        = "function_math_sqrt"
	MathCeil        = "function_math_ceil"
	MathFloor       = "function_math_floor"
	MathRound       = "function_math_round"
	MathTrunc       = "function_math_trunc"
	MathExp         = "function_math_exp"
	MathExp2        = "function_math_exp2"
	MathExpm1       = "function_math_expm1"
	MathLog         = "function_math_log"
	MathLog10       = "function_math_log10"
	MathLog1p       = "function_math_log1p"
	MathLog2        = "function_math_log2"
	MathPow         = "function_math_pow"
	MathPow10       = "function_math_pow10"
	MathMax         = "function_math_max"
	MathMin         = "function_math_min"
	MathMod         = "function_math_mod"
	MathRemainder   = "function_math_remainder"
	MathHypot       = "function_math_hypot"
)

func mathGlobalFunctions() []cel.EnvOption {
	return []cel.EnvOption{
		cel.Function("math.abs",
			cel.Overload(MathAbs,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Abs(x))
					},
				),
			),
		),
		cel.Function("math.acos",
			cel.Overload(MathACos,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Acos(x))
					},
				),
			),
		),
		cel.Function("math.acosh",
			cel.Overload(MathArcCosHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Acosh(x))
					},
				),
			),
		),
		cel.Function("math.cos",
			cel.Overload(MathCos,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Cos(x))
					},
				),
			),
		),
		cel.Function("math.cosh",
			cel.Overload(MathCosHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Cosh(x))
					},
				),
			),
		),
		cel.Function("math.asin",
			cel.Overload(MathArcSin,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Asin(x))
					},
				),
			),
		),
		cel.Function("math.asinh",
			cel.Overload(MathArcSinHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Asinh(x))
					},
				),
			),
		),
		cel.Function("math.sin",
			cel.Overload(MathSin,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Sin(x))
					},
				),
			),
		),
		cel.Function("math.sinh",
			cel.Overload(MathSinHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Sinh(x))
					},
				),
			),
		),
		cel.Function("math.atan",
			cel.Overload(MathArcTan,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Atan(x))
					},
				),
			),
		),
		cel.Function("math.atanh",
			cel.Overload(MathArcTanHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Atanh(x))
					},
				),
			),
		),
		cel.Function("math.tan",
			cel.Overload(MathTan,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Tan(x))
					},
				),
			),
		),
		cel.Function("math.tanh",
			cel.Overload(MathTanHyper,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Tanh(x))
					},
				),
			),
		),
		cel.Function("math.cbrt",
			cel.Overload(MathCbrt,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Cbrt(x))
					},
				),
			),
		),
		cel.Function("math.sqrt",
			cel.Overload(MathSqrt,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Sqrt(x))
					},
				),
			),
		),
		cel.Function("math.ceil",
			cel.Overload(MathCeil,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Ceil(x))
					},
				),
			),
		),
		cel.Function("math.floor",
			cel.Overload(MathFloor,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Floor(x))
					},
				),
			),
		),
		cel.Function("math.round",
			cel.Overload(MathRound,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Round(x))
					},
				),
			),
		),
		cel.Function("math.trunc",
			cel.Overload(MathTrunc,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Trunc(x))
					},
				),
			),
		),
		cel.Function("math.exp",
			cel.Overload(MathExp,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Exp(x))
					},
				),
			),
		),
		cel.Function("math.exp2",
			cel.Overload(MathExp2,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Exp2(x))
					},
				),
			),
		),
		cel.Function("math.expm1",
			cel.Overload(MathExpm1,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Expm1(x))
					},
				),
			),
		),
		cel.Function("math.log",
			cel.Overload(MathLog,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Log(x))
					},
				),
			),
		),
		cel.Function("math.log10",
			cel.Overload(MathLog10,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Log10(x))
					},
				),
			),
		),
		cel.Function("math.log1p",
			cel.Overload(MathLog1p,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Log1p(x))
					},
				),
			),
		),
		cel.Function("math.log2",
			cel.Overload(MathLog2,
				[]*cel.Type{cel.DynType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						x := getDouble(value)
						return types.Double(math.Log2(x))
					},
				),
			),
		),
		cel.Function("math.pow10",
			cel.Overload(MathPow10,
				[]*cel.Type{cel.IntType}, cel.DoubleType,
				cel.UnaryBinding(
					func(value ref.Val) ref.Val {
						return types.Double(math.Pow10(int(value.Value().(int64))))
					},
				),
			),
		),
		cel.Function("math.pow",
			cel.Overload(MathPow,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Pow(x, y))
					},
				),
			),
		),
		cel.Function("math.max",
			cel.Overload(MathMax,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Max(x, y))
					},
				),
			),
		),
		cel.Function("math.min",
			cel.Overload(MathMin,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Min(x, y))
					},
				),
			),
		),
		cel.Function("math.mod",
			cel.Overload(MathMod,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Mod(x, y))
					},
				),
			),
		),
		cel.Function("math.remainder",
			cel.Overload(MathRemainder,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Remainder(x, y))
					},
				),
			),
		),
		cel.Function("math.hypot",
			cel.Overload(MathHypot,
				[]*cel.Type{cel.DynType, cel.DynType}, cel.DoubleType,
				cel.BinaryBinding(
					func(value1, value2 ref.Val) ref.Val {
						x := getDouble(value1)
						y := getDouble(value2)
						return types.Double(math.Hypot(x, y))
					},
				),
			),
		),
	}
}

func getDouble(value ref.Val) float64 {
	var x float64
	switch v := value.Value(); v.(type) {
	case float64:
		x = v.(float64)
	case int64:
		x = float64(v.(int64))
	}
	return x
}
