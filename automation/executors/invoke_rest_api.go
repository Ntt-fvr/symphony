package executors

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/automation/util"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

type ExecutorInvokeRestAPIBlock struct {
	ExecutorBaseBlock
	Timeout          int
	Url              string
	Body             string
	Method           enum.UrlMethod
	Headers          map[string]string
	AuthType         enum.AuthType
	BasicUser        string
	BasicPassword    string
	OidcClientId     string
	OidcClientSecret string
	OidcUrl          string
}

func (b *ExecutorInvokeRestAPIBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorInvokeRestAPIBlock) runLogic() error {
	requestUrl, err := b.getUrl()
	if err != nil {
		return err
	}
	if requestUrl == nil {
		return errors.New("undefined requestUrl")
	}

	requestBody, err := b.getBody()
	if err != nil {
		return err
	}

	body, err := util.ToJsonBytes(requestBody)
	if err != nil {
		return err
	}

	request, err := http.NewRequest(string(b.Method), *requestUrl, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	switch b.AuthType {
	case enum.AuthTypeBasic:
		request.SetBasicAuth(b.BasicUser, b.BasicPassword)
	}

	if b.Headers != nil {
		requestHeaders, err := b.getHeaders()
		if err != nil {
			return err
		}

		if requestHeaders != nil {
			for key, value := range requestHeaders {
				var headerValue string
				switch value.(type) {
				case string:
					headerValue = value.(string)
				default:
					headerValue = fmt.Sprintf("%v", value)
				}

				request.Header.Add(key, headerValue)
			}
		}
	}

	client := &http.Client{}

	if b.Timeout > 0 {
		client.Timeout = util.GetDurationFromSeconds(b.Timeout)
	}

	var status string

	response, err := client.Do(request)
	if err != nil {
		switch err.(type) {
		case *url.Error:
			if timeout := err.(*url.Error); timeout.Timeout() {
				status = "TIMEOUT"
			} else {
				return err
			}
		default:
			return err
		}
	}

	if status == "" {
		status = strconv.Itoa(response.StatusCode)
	}

	defer func(Body io.ReadCloser) { _ = Body.Close() }(response.Body)

	bodyBytes, _ := ioutil.ReadAll(response.Body)

	var responseBody map[string]interface{}
	err = json.Unmarshal(bodyBytes, &responseBody)
	if err != nil {
		return err
	}

	output := map[string]interface{}{
		"invokeResponse": map[string]interface{}{
			"requestBody":  requestBody,
			"responseBody": responseBody,
			"status":       status,
		},
	}

	b.Output = output

	return nil
}

func (b *ExecutorInvokeRestAPIBlock) getUrl() (*string, error) {
	if len(b.Url) == 0 {
		return nil, errors.New("url not found")
	}

	native, err := b.processExpressionLanguage(b.Url)
	if err != nil {
		return nil, err
	}

	requestUrl, ok := native.(string)
	if !ok {
		return nil, errors.New("malformed url")
	}
	return &requestUrl, nil
}

func (b *ExecutorInvokeRestAPIBlock) getBody() (map[string]interface{}, error) {
	if len(b.Body) == 0 {
		return nil, nil
	}

	native, err := b.processExpressionLanguage(b.Body)
	if err != nil {
		return nil, err
	}

	body, ok := native.(map[string]interface{})
	if !ok {
		return nil, errors.New("malformed body")
	}
	return body, nil
}

func (b *ExecutorInvokeRestAPIBlock) getHeaders() (map[string]interface{}, error) {
	if b.Headers == nil || len(b.Headers) == 0 {
		return nil, nil
	}

	headers := make([]string, 0)
	for key, value := range b.Headers {
		var headerKey string
		if !strings.HasPrefix(key, "'") {
			headerKey = fmt.Sprintf("'%s'", key)
		} else {
			headerKey = key
		}

		header := strings.Join([]string{headerKey, value}, ":")
		headers = append(headers, header)
	}

	values := strings.Join(headers, ",")
	invokeHeaders := fmt.Sprintf("{%s}", values)

	native, err := b.processExpressionLanguage(invokeHeaders)
	if err != nil {
		return nil, err
	}

	headerValues, ok := native.(map[string]interface{})
	if !ok {
		return nil, errors.New("malformed headers")
	}
	return headerValues, nil
}

func (b *ExecutorInvokeRestAPIBlock) processExpressionLanguage(expression string) (interface{}, error) {
	inputVariable := celgo.ConvertToValue(b.Input)
	stateVariable := celgo.ConvertToValue(b.State)

	variables := map[string]interface{}{
		celgo.InputVariable: inputVariable,
		celgo.StateVariable: stateVariable,
	}

	result, err := celgo.CompileAndEvaluate(expression, variables)
	if err != nil {
		return nil, err
	}

	return celgo.ConvertToNative(result)
}
