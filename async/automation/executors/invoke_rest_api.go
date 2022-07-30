package executors

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/async/automation/util"
)

const (
	urlKey  = "url"
	bodyKey = "body"
)

type ExecutorInvokeRestAPIBlock struct {
	executorBaseBlock
}

func (b *ExecutorInvokeRestAPIBlock) runLogic() error {
	invokeRestAPIBlock := b.executorBlock.InvokeRestAPI
	if invokeRestAPIBlock == nil {
		return configNotFound
	}

	url, body, err := b.getUrlAndBody()
	if err != nil {
		return err
	}

	if url == nil {
		return errors.New("undefined url")
	}

	request, err := http.NewRequest(string(invokeRestAPIBlock.Method), *url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	if invokeRestAPIBlock.Headers != nil {
		for key, value := range invokeRestAPIBlock.Headers {
			request.Header.Add(key, value)
		}
	}

	client := &http.Client{}

	if invokeRestAPIBlock.Timeout > 0 {
		client.Timeout = util.GetDurationFromSeconds(invokeRestAPIBlock.Timeout)
	}

	response, err := client.Do(request)
	if err != nil {
		return err
	}

	defer func(Body io.ReadCloser) { _ = Body.Close() }(response.Body)

	bodyBytes, _ := ioutil.ReadAll(response.Body)

	var output map[string]interface{}
	err = json.Unmarshal(bodyBytes, &output)
	if err != nil {
		return err
	}

	b.output = output

	return nil
}

func (b *ExecutorInvokeRestAPIBlock) getUrlAndBody() (*string, []byte, error) {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	invokeRestAPIBlock := b.executorBlock.InvokeRestAPI
	if invokeRestAPIBlock == nil {
		return nil, nil, configNotFound
	}

	var invokeBody string
	if len(invokeRestAPIBlock.Body) > 0 {
		invokeBody = invokeRestAPIBlock.Body
	} else {
		invokeBody = "{}"
	}

	expression := fmt.Sprintf(`{"%s": %s,"%s": %s}`, urlKey, invokeRestAPIBlock.Url, bodyKey, invokeBody)

	result, err := celgo.CompileAndEvaluate(expression, variables)
	if err != nil {
		return nil, nil, err
	}

	native, err := celgo.ConvertToNative(result)
	if err != nil {
		return nil, nil, err
	}

	url := native[urlKey].(string)
	body := native[bodyKey].(map[string]interface{})

	if len(url) <= 0 {
		return nil, nil, errors.New("url not found")
	}

	bodyBytes, err := json.Marshal(body)
	if err != nil {
		return nil, nil, errors.New("parsing body")
	}

	return &url, bodyBytes, nil
}
