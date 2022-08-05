package celgo

import (
	"fmt"
	"math"
)

const (
	negVal = -1
	val1   = 0.5
	val2   = 13.7
	powVal = 5
)

func (suite *CellGoTestSuite) testMathFunc(fName string, value float64, f func(x float64) float64) {
	el := fmt.Sprintf("{\"test\": math.%s(input.value)}", fName)
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value": value,
		},
	}
	expected := map[string]interface{}{
		"test": f(value),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) testMathFunc2(fName string, value float64, value2 float64, f func(x float64, y float64) float64) {
	el := fmt.Sprintf("{\"test\": math.%s(input.value, input.value2)}", fName)
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value":  value,
			"value2": value2,
		},
	}
	expected := map[string]interface{}{
		"test": f(value, value2),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestMathAbs() {
	suite.testMathFunc("abs", negVal, math.Abs)
}

func (suite *CellGoTestSuite) TestMathAcos() {
	suite.testMathFunc("acos", val1, math.Acos)
}

func (suite *CellGoTestSuite) TestMathAcosh() {
	suite.testMathFunc("acosh", val2, math.Acosh)
}

func (suite *CellGoTestSuite) TestMathCos() {
	suite.testMathFunc("cos", val1, math.Cos)
}

func (suite *CellGoTestSuite) TestMathCosh() {
	suite.testMathFunc("cosh", val2, math.Cosh)
}

func (suite *CellGoTestSuite) TestMathAsin() {
	suite.testMathFunc("asin", val1, math.Asin)
}

func (suite *CellGoTestSuite) TestMathAsinh() {
	suite.testMathFunc("asinh", val2, math.Asinh)
}

func (suite *CellGoTestSuite) TestMathSin() {
	suite.testMathFunc("sin", val1, math.Sin)
}

func (suite *CellGoTestSuite) TestMathSinInt() {
	el := "{\"test\": math.sin(input.value)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value": negVal,
		},
	}
	expected := map[string]interface{}{
		"test": math.Sin(negVal),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestMathSinh() {
	suite.testMathFunc("sinh", val2, math.Sinh)
}

func (suite *CellGoTestSuite) TestMathAtan() {
	suite.testMathFunc("atan", val1, math.Atan)
}

func (suite *CellGoTestSuite) TestMathAtanh() {
	suite.testMathFunc("atanh", val1, math.Atanh)
}

func (suite *CellGoTestSuite) TestMathTan() {
	suite.testMathFunc("tan", val1, math.Tan)
}

func (suite *CellGoTestSuite) TestMathTanh() {
	suite.testMathFunc("tanh", val1, math.Tanh)
}

func (suite *CellGoTestSuite) TestMathCbrt() {
	suite.testMathFunc("cbrt", val2, math.Cbrt)
}

func (suite *CellGoTestSuite) TestMathSqrt() {
	suite.testMathFunc("sqrt", val2, math.Sqrt)
}

func (suite *CellGoTestSuite) TestMathCeil() {
	suite.testMathFunc("ceil", val2, math.Ceil)
}

func (suite *CellGoTestSuite) TestMathFloor() {
	suite.testMathFunc("floor", val2, math.Floor)
}

func (suite *CellGoTestSuite) TestMathRound() {
	suite.testMathFunc("round", val2, math.Round)
}

func (suite *CellGoTestSuite) TestMathTrunc() {
	suite.testMathFunc("trunc", val2, math.Trunc)
}

func (suite *CellGoTestSuite) TestMathExp() {
	suite.testMathFunc("exp", val2, math.Exp)
}

func (suite *CellGoTestSuite) TestMathExp2() {
	suite.testMathFunc("exp2", val2, math.Exp2)
}

func (suite *CellGoTestSuite) TestMathExpm1() {
	suite.testMathFunc("expm1", val2, math.Expm1)
}

func (suite *CellGoTestSuite) TestMathLog() {
	suite.testMathFunc("log", val2, math.Log)
}

func (suite *CellGoTestSuite) TestMathLog10() {
	suite.testMathFunc("log10", val2, math.Log10)
}

func (suite *CellGoTestSuite) TestMathLog1p() {
	suite.testMathFunc("log1p", val2, math.Log1p)
}

func (suite *CellGoTestSuite) TestMathLog2() {
	suite.testMathFunc("log2", val2, math.Log2)
}

func (suite *CellGoTestSuite) TestMathPow10() {
	el := "{\"test\": math.pow10(input.value)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value": powVal,
		},
	}
	expected := map[string]interface{}{
		"test": math.Pow10(powVal),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestMathPow() {
	suite.testMathFunc2("pow", val2, powVal, math.Pow)
}

func (suite *CellGoTestSuite) TestMathMax() {
	suite.testMathFunc2("max", val1, val2, math.Max)
}

func (suite *CellGoTestSuite) TestMathMin() {
	suite.testMathFunc2("min", val1, val2, math.Min)
}

func (suite *CellGoTestSuite) TestMathMod() {
	suite.testMathFunc2("mod", val1, val2, math.Mod)
}

func (suite *CellGoTestSuite) TestMathRemainder() {
	suite.testMathFunc2("remainder", val1, val2, math.Remainder)
}

func (suite *CellGoTestSuite) TestMathHypot() {
	suite.testMathFunc2("hypot", val1, val2, math.Hypot)
}
