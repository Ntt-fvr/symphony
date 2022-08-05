package celgo

import (
	"fmt"
	"strings"
)

const (
	str       = "lorem ipsum"
	spacedStr = "      lorem ipsum   "
)

func (suite *CellGoTestSuite) testStringFunc(fName string, value string, f func(x string) interface{}) {
	el := fmt.Sprintf("{\"test\": input.value.%s()}", fName)
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

func (suite *CellGoTestSuite) testStringFunc2(fName string, value string, value2 string, f func(x string, y string) interface{}) {
	el := fmt.Sprintf("{\"test\": input.value.%s(input.value2)}", fName)
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

func (suite *CellGoTestSuite) TestStringToUpper() {
	suite.testStringFunc("toUpper", str, func(x string) interface{} {
		return strings.ToUpper(x)
	})
}

func (suite *CellGoTestSuite) TestStringToLower() {
	suite.testStringFunc("toLower", str, func(x string) interface{} {
		return strings.ToLower(x)
	})
}

func (suite *CellGoTestSuite) TestStringTrim() {
	suite.testStringFunc("trim", spacedStr, func(x string) interface{} {
		return strings.TrimSpace(x)
	})
}

func (suite *CellGoTestSuite) TestStringIndexOf() {
	suite.testStringFunc2("indexOf", str, "em", func(x string, y string) interface{} {
		return int64(strings.Index(x, "em"))
	})
}

func (suite *CellGoTestSuite) TestStringSplit() {
	suite.testStringFunc2("split", str, " ", func(x string, y string) interface{} {
		return strings.Split(x, " ")
	})
}

func (suite *CellGoTestSuite) TestStringAppend() {
	suite.testStringFunc2("append", str, "lorem", func(x string, y string) interface{} {
		return x + y
	})
}

func (suite *CellGoTestSuite) TestStringPrepend() {
	suite.testStringFunc2("prepend", str, "lorem", func(x string, y string) interface{} {
		return y + x
	})
}

func (suite *CellGoTestSuite) TestStringReplaceAll() {
	el := "{\"test\": input.value.replaceAll(input.value2, input.value3)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value":  str,
			"value2": "m",
			"value3": "x",
		},
	}
	expected := map[string]interface{}{
		"test": strings.ReplaceAll(str, "m", "x"),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestStringJoinWith() {
	el := "{\"test\": input.value.joinWith(input.value2, input.sep)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value":  str,
			"value2": "dolor sit",
			"sep":    " ",
		},
	}
	expected := map[string]interface{}{
		"test": strings.Join([]string{str, "dolor sit"}, " "),
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestStringSubstring1() {
	el := "{\"test\": input.value.substring(input.value2)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value":  str,
			"value2": 2,
		},
	}
	expected := map[string]interface{}{
		"test": str[2:],
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestStringSubstring2() {
	el := "{\"test\": input.value.substring(input.value2, input.value3)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value":  str,
			"value2": 3,
			"value3": 7,
		},
	}
	expected := map[string]interface{}{
		"test": str[3:7],
	}

	suite.runCellGo(el, vars, expected)
}

func (suite *CellGoTestSuite) TestStringJoin() {
	el := "{\"test\": strings.join(input.value, input.sep)}"
	vars := map[string]interface{}{
		"input": map[string]interface{}{
			"value": []string{"lorem", "ipsum", "dolor", "sit"},
			"sep":   " ",
		},
	}
	expected := map[string]interface{}{
		"test": str + " dolor sit",
	}

	suite.runCellGo(el, vars, expected)
}
