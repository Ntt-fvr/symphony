package celgo

import (
	"github.com/golang-module/carbon"
	"github.com/google/cel-go/common/types"
	"github.com/stretchr/testify/suite"
	"strings"
	"testing"
	"time"
)

const (
	timeFormat = "Y-m-d H:i:s"
)

type CellGoTestSuite struct {
	suite.Suite
}

func (suite *CellGoTestSuite) runCellGo(el string, vars map[string]interface{}, expected map[string]interface{}) {
	r, e := CompileAndEvaluate(el, vars)
	suite.Require().NoError(e)

	n, e2 := ConvertToNative(r)
	suite.Require().NoError(e2)

	suite.Require().EqualValues(expected, n)
}

func (suite *CellGoTestSuite) TestMapFlatten() {
	el := "{\"test\": flatten(input)}"

	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"hello": map[string]interface{}{
				"world": []interface{}{
					map[string]interface{}{
						"id":   1,
						"desc": "one",
					},
					map[string]interface{}{
						"id":   2,
						"desc": "two",
					},
					map[string]interface{}{
						"id":   3,
						"desc": "three",
					},
				},
			},
		},
	}

	expected := map[string]interface{}{
		"test": map[string]interface{}{
			"hello.world[0].id":   1,
			"hello.world[0].desc": "one",
			"hello.world[1].id":   2,
			"hello.world[1].desc": "two",
			"hello.world[2].id":   3,
			"hello.world[2].desc": "three",
		},
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestMapUnflatten() {
	el := "{\"test\": unflatten(input)}"

	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"hello.world[0].id":   1,
			"hello.world[0].desc": "one",
			"hello.world[1].id":   2,
			"hello.world[1].desc": "two",
			"hello.world[2].id":   3,
			"hello.world[2].desc": "three",
		},
	}

	expected := map[string]interface{}{
		"test": map[string]interface{}{
			"hello": map[string]interface{}{
				"world": []interface{}{
					map[string]interface{}{
						"id":   1,
						"desc": "one",
					},
					map[string]interface{}{
						"id":   2,
						"desc": "two",
					},
					map[string]interface{}{
						"id":   3,
						"desc": "three",
					},
				},
			},
		},
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestDateNowAndFormat() {
	el := "{\"test\": time.now().format(input.format, input.tz)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"format": timeFormat,
			"tz":     "UTC",
		},
	}
	expected := map[string]interface{}{
		"test": carbon.CreateFromTimestampMilli(time.Now().UnixMilli()).Format(timeFormat, "UTC"),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestCelgoEvaluate() {
	el := "{\"test\": input.value.toUpper()}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value": "value",
		},
	}
	expected := map[string]interface{}{
		"test": strings.ToUpper("value"),
	}

	r, e := Evaluate(AstKey{Key: "key", AstValue: el}, vars)
	suite.Require().NoError(e)

	n, e2 := ConvertToNative(r)
	suite.Require().NoError(e2)

	suite.Require().EqualValues(expected, n)
}

func (suite *CellGoTestSuite) TestCelgoConvertToValue() {
	v := ConvertToValue("value")
	suite.Require().Equal(v.Value().(string), "value")
}

func (suite *CellGoTestSuite) TestCelgoConvertToValueNil() {
	suite.Require().Nil(ConvertToValue(nil))
}

func (suite *CellGoTestSuite) TestCelgoCompileAstError() {
	_, err := compileAst("xyz.abc")
	suite.Require().Error(err)
}

func (suite *CellGoTestSuite) TestCelgoEvaluateError() {
	el := "xyz.abc"
	vars := map[string]interface{}{}

	_, e := Evaluate(AstKey{Key: "key", AstValue: el}, vars)
	suite.Require().Error(e)
}

func (suite *CellGoTestSuite) TestCelgoCompileAndEvaluateError() {
	el := "xyz.abc"
	vars := map[string]interface{}{}

	_, e := CompileAndEvaluate(el, vars)
	suite.Require().Error(e)
}

func (suite *CellGoTestSuite) TestCelgoConvertToNativeNil() {
	v, _ := ConvertToNative(nil)
	suite.Require().EqualValues(v, map[string]interface{}{})
}

func (suite *CellGoTestSuite) TestCelgoConvertToNativeError() {
	_, err := ConvertToNative(types.String("abc"))
	suite.Require().Error(err)
}

func TestCellGoTestSuite(t *testing.T) {
	suite.Run(t, new(CellGoTestSuite))
}
