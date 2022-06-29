package blocks

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"io"
	"io/ioutil"
	"net/http"
)

const (
	urlKey  = "url"
	bodyKey = "body"
)

type InvokeRestAPIBlock struct {
	baseBlock
	timeout int
	url     string
	method  string
	body    string
	headers map[string]string
}

func (b *InvokeRestAPIBlock) Execute() (*ExecutorResult, error) {
	b.updateBlockInProgress()

	err := b.executeInputTransformation()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	err = b.runLogic()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	err = b.executeOutputTransformation()
	if err != nil {
		b.updateBlockFailed()
		return nil, err
	}

	blockResult := ExecutorResult{
		Output:    b.output,
		State:     b.state,
		NextBlock: b.nextBlock,
	}

	b.updateBlockCompleted()
	return &blockResult, nil
}

func (b *InvokeRestAPIBlock) runLogic() error {
	url, body, err := b.getUrlAndBody()
	if err != nil {
		return err
	}

	if url == nil {
		return errors.New("undefined url")
	}

	request, err := http.NewRequest(b.method, *url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	if b.headers != nil {
		for key, value := range b.headers {
			request.Header.Add(key, value)
		}
	}

	client := &http.Client{}

	if b.timeout > 0 {
		client.Timeout = getDurationFromSeconds(b.timeout)
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

func (b *InvokeRestAPIBlock) getUrlAndBody() (*string, []byte, error) {
	inputVariable := celgo.ConvertToValue(b.input)
	stateVariable := celgo.ConvertToValue(b.state)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	var invokeBody string
	if len(b.body) > 0 {
		invokeBody = b.body
	} else {
		invokeBody = "{}"
	}

	expression := fmt.Sprintf(`{"%s": %s,"%s": %s}`, urlKey, b.url, bodyKey, invokeBody)

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
