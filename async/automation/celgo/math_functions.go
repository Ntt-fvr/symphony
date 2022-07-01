package celgo

import (
	"math"

	"github.com/google/cel-go/checker/decls"
	"github.com/google/cel-go/common/types"
	"github.com/google/cel-go/common/types/ref"
	"github.com/google/cel-go/interpreter/functions"
	exprpb "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
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

func mathGlobalFunctions() []*exprpb.Decl {
	return []*exprpb.Decl{
		decls.NewFunction("math.abs",
			decls.NewOverload(
				MathAbs,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.acos",
			decls.NewOverload(
				MathACos,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.acosh",
			decls.NewOverload(
				MathArcCosHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.cos",
			decls.NewOverload(
				MathCos,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.cosh",
			decls.NewOverload(
				MathCosHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.asin",
			decls.NewOverload(
				MathArcSin,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.asinh",
			decls.NewOverload(
				MathArcSinHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.sin",
			decls.NewOverload(
				MathSin,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.sinh",
			decls.NewOverload(
				MathSinHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.atan",
			decls.NewOverload(
				MathArcTan,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.atanh",
			decls.NewOverload(
				MathArcTanHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.tan",
			decls.NewOverload(
				MathTan,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.tanh",
			decls.NewOverload(
				MathTanHyper,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.cbrt",
			decls.NewOverload(
				MathCbrt,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.sqrt",
			decls.NewOverload(
				MathSqrt,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.ceil",
			decls.NewOverload(
				MathCeil,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.floor",
			decls.NewOverload(
				MathFloor,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.round",
			decls.NewOverload(
				MathRound,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.trunc",
			decls.NewOverload(
				MathTrunc,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.exp",
			decls.NewOverload(
				MathExp,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.exp2",
			decls.NewOverload(
				MathExp2,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.expm1",
			decls.NewOverload(
				MathExpm1,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.log",
			decls.NewOverload(
				MathLog,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.log10",
			decls.NewOverload(
				MathLog10,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.log1p",
			decls.NewOverload(
				MathLog1p,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.log2",
			decls.NewOverload(
				MathLog2,
				[]*exprpb.Type{decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.pow10",
			decls.NewOverload(
				MathPow10,
				[]*exprpb.Type{decls.Int},
				decls.Double,
			),
		),
		decls.NewFunction("math.pow",
			decls.NewOverload(
				MathPow,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.max",
			decls.NewOverload(
				MathMax,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.min",
			decls.NewOverload(
				MathMin,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.mod",
			decls.NewOverload(
				MathMod,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.remainder",
			decls.NewOverload(
				MathRemainder,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
		decls.NewFunction("math.hypot",
			decls.NewOverload(
				MathHypot,
				[]*exprpb.Type{decls.Dyn, decls.Dyn},
				decls.Double,
			),
		),
	}
}

func mathGlobalFunctionsImpl() []*functions.Overload {
	return []*functions.Overload{
		{
			Operator: MathAbs,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Abs(x))
			},
		},
		{
			Operator: MathACos,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Acos(x))
			},
		},
		{
			Operator: MathArcCosHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Acosh(x))
			},
		},
		{
			Operator: MathCos,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Cos(x))
			},
		},
		{
			Operator: MathCosHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Cosh(x))
			},
		},
		{
			Operator: MathArcSin,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Asin(x))
			},
		},
		{
			Operator: MathArcSinHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Asinh(x))
			},
		},
		{
			Operator: MathSin,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Sin(x))
			},
		},
		{
			Operator: MathSinHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Sinh(x))
			},
		},
		{
			Operator: MathArcTan,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Atan(x))
			},
		},
		{
			Operator: MathArcTanHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Atanh(x))
			},
		},
		{
			Operator: MathTan,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Tan(x))
			},
		},
		{
			Operator: MathTanHyper,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Atanh(x))
			},
		},
		{
			Operator: MathCbrt,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Cbrt(x))
			},
		},
		{
			Operator: MathSqrt,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Sqrt(x))
			},
		},
		{
			Operator: MathCeil,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Ceil(x))
			},
		},
		{
			Operator: MathFloor,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Floor(x))
			},
		},
		{
			Operator: MathRound,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Round(x))
			},
		},
		{
			Operator: MathTrunc,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Trunc(x))
			},
		},
		{
			Operator: MathExp,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Exp(x))
			},
		},
		{
			Operator: MathExp2,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Exp2(x))
			},
		},
		{
			Operator: MathExpm1,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Expm1(x))
			},
		},
		{
			Operator: MathLog,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Log(x))
			},
		},
		{
			Operator: MathLog10,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Log10(x))
			},
		},
		{
			Operator: MathLog1p,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Log1p(x))
			},
		},
		{
			Operator: MathLog2,
			Unary: func(value ref.Val) ref.Val {
				x := getDouble(value)
				return types.Double(math.Log2(x))
			},
		},
		{
			Operator: MathPow10,
			Unary: func(value ref.Val) ref.Val {
				switch v := value.Value(); v.(type) {
				case int64:
					return types.Double(math.Pow10(int(v.(int64))))
				}
				return value
			},
		},
		{
			Operator: MathPow,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Pow(x, y))
			},
		},
		{
			Operator: MathMax,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Max(x, y))
			},
		},
		{
			Operator: MathMin,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Min(x, y))
			},
		},
		{
			Operator: MathMod,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Mod(x, y))
			},
		},
		{
			Operator: MathRemainder,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Remainder(x, y))
			},
		},
		{
			Operator: MathHypot,
			Binary: func(value1, value2 ref.Val) ref.Val {
				x := getDouble(value1)
				y := getDouble(value2)
				return types.Double(math.Hypot(x, y))
			},
		},
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
