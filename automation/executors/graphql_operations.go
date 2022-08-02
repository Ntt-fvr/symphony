package executors

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"github.com/Khan/genqlient/graphql"
	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/automation/symphony"
	"github.com/facebookincubator/symphony/automation/util"
	"net/http"
	"sort"
	"time"
)

const tenantKey = "tenant-key"

var graphqlClient graphql.Client

type authedTransport struct {
	authentication config.GraphQLAuthentication
	wrapped        http.RoundTripper
}

func (t *authedTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	auth := t.authentication

	switch auth.Type {
	case enum.GraphQLAuthenticationTypeBasic:
		basic := auth.Basic
		req.SetBasicAuth(basic.User, basic.Password)

		req.Header.Set("x-auth-user-email", basic.User)
	}
	// req.Header.Set("Authorization", "bearer "+t.key)

	tenantValue := req.Context().Value(tenantKey)
	if tenantValue != nil {
		req.Header.Set("x-auth-organization", tenantValue.(string))
	}

	req.Header.Set("x-auth-user-role", auth.UserRole)

	// TODO Remove it
	fmt.Println()
	fmt.Println("**************************************")
	fmt.Println("[Automation - GraphQL]")
	fmt.Printf("Email: %s\n", req.Header.Get("x-auth-user-email"))
	fmt.Printf("Tenant: %s\n", req.Header.Get("x-auth-organization"))
	fmt.Printf("Role: %s\n", req.Header.Get("x-auth-user-role"))
	fmt.Println("**************************************")
	fmt.Println()

	return t.wrapped.RoundTrip(req)
}

func Setup(configuration config.GraphQLConfig) {
	transport := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	auth := &authedTransport{
		authentication: configuration.Authentication,
		wrapped:        transport,
	}

	httpClient := http.Client{
		Transport: auth,
	}

	graphqlClient = graphql.NewClient(configuration.Endpoint, &httpClient)
}

func CreateBlockInstance(tenant, flowInstanceID, blockID string, input map[string]interface{}) (*string, error) {

	inputJson, err := util.ToJsonString(input)
	if err != nil {
		return nil, err
	}

	blockInput := symphony.AddBlockInstanceInput{
		Status:    enum.BlockInstanceStatusPending,
		InputJSON: &inputJson,
		BlockId:   blockID,
		StartDate: time.Now(),
	}

	ctx := context.WithValue(context.Background(), tenantKey, tenant)

	response, err := symphony.AddBlockInstance(ctx, graphqlClient, flowInstanceID, blockInput)
	if err != nil {
		return nil, err
	}

	if response == nil {
		return nil, errors.New("no response")
	}

	return &response.AddBlockInstance.Id, nil
}

func UpdateBlockStatus(
	tenant, blockInstanceID string, status enum.BlockInstanceStatus,
	close bool, output map[string]interface{}, failureReason string,
) error {
	blockEdit := symphony.EditBlockInstanceInput{
		Id:     blockInstanceID,
		Status: &status,
	}

	if close {
		outputJson, err := util.ToJsonString(output)
		if err != nil {
			return err
		}

		endDate := time.Now()

		blockEdit.OutputJSON = &outputJson
		blockEdit.Failure_reason = &failureReason
		blockEdit.EndDate = &endDate
	}

	ctx := context.WithValue(context.Background(), tenantKey, tenant)

	response, err := symphony.EditBlockInstance(ctx, graphqlClient, blockEdit)
	if err != nil {
		return err
	}

	if response == nil {
		return errors.New("no response")
	}

	return nil
}

func UpdateFlowInstance(
	tenant, flowInstanceID, workflowID, runID string,
) error {
	status := enum.FlowInstanceStatusRunning

	flowEdit := symphony.EditFlowInstanceInput{
		Id:                  flowInstanceID,
		BssCode:             &workflowID,
		ServiceInstanceCode: &runID,
		Status:              &status,
	}

	ctx := context.WithValue(context.Background(), tenantKey, tenant)

	response, err := symphony.EditFlowInstance(ctx, graphqlClient, flowEdit)
	if err != nil {
		return err
	}

	if response == nil {
		return errors.New("no response")
	}

	return nil
}

func UpdateFlowInstanceStatus(
	tenant, flowInstanceID string, status enum.FlowInstanceStatus, close bool,
) error {
	flowEdit := symphony.EditFlowInstanceInput{
		Id:     flowInstanceID,
		Status: &status,
	}

	if close {
		endDate := time.Now()

		flowEdit.EndDate = &endDate
	}

	ctx := context.WithValue(context.Background(), tenantKey, tenant)

	response, err := symphony.EditFlowInstance(ctx, graphqlClient, flowEdit)
	if err != nil {
		return err
	}

	if response == nil {
		return errors.New("no response")
	}

	return nil
}

func GetInputAndExecutors(
	tenant, flowInstanceID string,
) (map[string]interface{}, map[string]ExecutorBlock, error) {
	response, err := symphony.FlowInstanceQuery(context.Background(), graphqlClient, flowInstanceID)
	if err != nil {
		return nil, nil, err
	}

	input := make(map[string]interface{})

	for _, param := range response.FlowInstance.StartParams {
		input[param.VariableDefinitionKey] = param.Value
	}

	blocks := make(map[string]ExecutorBlock)

	templateBlocks := response.FlowInstance.Template.Blocks
	if templateBlocks != nil {
		for _, templateBlock := range templateBlocks {

			transformations := getTransformation(templateBlock)

			blockType := enum.ParseBlockType(templateBlock.Details.GetTypename())

			executorBaseBlock := createExecutorBaseBlock(
				blockType, templateBlock, transformations, tenant, flowInstanceID,
			)

			switch blockType {
			case enum.BlockTypeStart:
				startBlock, err := createExecutorStartBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if startBlock != nil {
					blocks[templateBlock.Id] = startBlock
				}
			case enum.BlockTypeEnd:
				endBlock, err := createExecutorEndBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if endBlock != nil {
					blocks[templateBlock.Id] = endBlock
				}
			case enum.BlockTypeGoto:
				gotoBlock, err := createExecutorGotoBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if gotoBlock != nil {
					blocks[templateBlock.Id] = gotoBlock
				}
			case enum.BlockTypeChoice:
				choiceBlock, err := createExecutorChoiceBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if choiceBlock != nil {
					blocks[templateBlock.Id] = choiceBlock
				}
			case enum.BlockTypeExecuteFlow:
				executeFlowBlock, err := createExecutorExecuteFlowBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if executeFlowBlock != nil {
					blocks[templateBlock.Id] = executeFlowBlock
				}
			case enum.BlockTypeForEach:
				forEachBlock, err := createExecutorForEachBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if forEachBlock != nil {
					blocks[templateBlock.Id] = forEachBlock
				}
			case enum.BlockTypeInvokeRestAPI:
				invokeBlock, err := createExecutorInvokeBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if invokeBlock != nil {
					blocks[templateBlock.Id] = invokeBlock
				}
			case enum.BlockTypeKafka:
				kafkaBlock, err := createExecutorKafkaBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if kafkaBlock != nil {
					blocks[templateBlock.Id] = kafkaBlock
				}
			case enum.BlockTypeParallel:
				parallelBlock, err := createExecutorParallelBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if parallelBlock != nil {
					blocks[templateBlock.Id] = parallelBlock
				}
			case enum.BlockTypeTimer:
				timerBlock, err := createExecutorTimerBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if timerBlock != nil {
					blocks[templateBlock.Id] = timerBlock
				}
			case enum.BlockTypeWaitForSignal:
				waitForSignalBlock, err := createWaitForSignalBlock(templateBlock, executorBaseBlock)
				if err != nil {
					return nil, nil, err
				}

				if waitForSignalBlock != nil {
					blocks[templateBlock.Id] = waitForSignalBlock
				}
			}
		}
	}
	return input, blocks, nil
}

func getTransformation(block symphony.BaseBlock) BlockTransformations {

	transformations := BlockTransformations{}

	if block.EnableInputTransformation {
		if value := block.InputTransformation; value != "" {
			transformations.Input = BlockTransformationValue{
				Enabled: block.EnableInputTransformation,
				Key: celgo.AstKey{
					Key:      fmt.Sprintf("%s-%s", block.Id, "IN"),
					AstValue: value,
				},
				Strategy: block.InputTransfStrategy,
			}
		}
	}

	if block.EnableInputStateTransformation {
		if value := block.InputStateTransformation; value != "" {
			transformations.InputState = BlockTransformationValue{
				Enabled: block.EnableInputStateTransformation,
				Key: celgo.AstKey{
					Key:      fmt.Sprintf("%s-%s", block.Id, "IS"),
					AstValue: value,
				},
				Strategy: block.InputStateTransfStrategy,
			}
		}
	}

	if block.EnableOutputTransformation {
		if value := block.OutputTransformation; value != "" {
			transformations.Output = BlockTransformationValue{
				Enabled: block.EnableOutputTransformation,
				Key: celgo.AstKey{
					Key:      fmt.Sprintf("%s-%s", block.Id, "OU"),
					AstValue: value,
				},
				Strategy: block.OutputTransfStrategy,
			}
		}
	}

	if block.EnableOutputStateTransformation {
		if value := block.OutputStateTransformation; value != "" {
			transformations.OutputState = BlockTransformationValue{
				Enabled: block.EnableOutputStateTransformation,
				Key: celgo.AstKey{
					Key:      fmt.Sprintf("%s-%s", block.Id, "OS"),
					AstValue: value,
				},
				Strategy: block.OutputStateTransfStrategy,
			}
		}
	}

	return transformations
}

func createExecutorBaseBlock(
	blockType enum.BlockType, block symphony.BaseBlock,
	transformations BlockTransformations, tenant, flowInstanceID string,
) ExecutorBaseBlock {

	return ExecutorBaseBlock{
		Tenant:          tenant,
		Type:            blockType,
		BlockID:         block.Id,
		FlowInstanceID:  flowInstanceID,
		MaxAttempts:     block.MaxAttemps,
		BackOffRate:     block.BackoffRate,
		ErrorHandling:   block.EnableErrorHandling,
		RetryPolicy:     block.EnableRetryPolicy,
		RetryInterval:   block.RetryInterval,
		RetryUnit:       block.Units,
		Transformations: transformations,
	}
}

func createExecutorStartBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorStartBlock, error) {

	start, ok := block.Details.(*symphony.BlockDetailStartBlock)
	if !ok {
		return nil, errors.New("start block not assignable")
	}

	if start != nil {
		entryPoints := start.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}
	}

	return &ExecutorStartBlock{ExecutorBaseBlock: executorBaseBlock}, nil
}

func createExecutorEndBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorEndBlock, error) {

	_, ok := block.Details.(*symphony.BlockDetailEndBlock)
	if !ok {
		return nil, errors.New("end block not assignable")
	}

	return &ExecutorEndBlock{ExecutorBaseBlock: executorBaseBlock}, nil
}

func createExecutorGotoBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorGotoBlock, error) {

	goTo, ok := block.Details.(*symphony.BlockDetailGotoBlock)
	if !ok {
		return nil, errors.New("goto block not assignable")
	}

	if goTo != nil {
		executorBaseBlock.NextBlockID = goTo.Target.Id
	}

	return &ExecutorGotoBlock{ExecutorBaseBlock: executorBaseBlock}, nil
}

func createExecutorChoiceBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorChoiceBlock, error) {

	choice, ok := block.Details.(*symphony.BlockDetailChoiceBlock)
	if !ok {
		return nil, errors.New("choice block not assignable")
	}

	choiceRules := make([]ExecutorChoiceRule, 0)

	if choice != nil {
		entryPoints := choice.DefaultExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		for _, rule := range choice.Rules {
			index := rule.ExitPoint.Index
			condition := rule.ExitPoint.Condition.Expression

			var nextBlockID string

			ruleEntryPoints := rule.ExitPoint.NextEntryPoints
			if len(ruleEntryPoints) > 0 {
				nextBlockID = ruleEntryPoints[0].ParentBlock.Id
			}

			choiceRule := ExecutorChoiceRule{
				Index:     index,
				BlockID:   nextBlockID,
				Condition: condition,
			}

			choiceRules = append(choiceRules, choiceRule)
		}
	}

	sort.SliceStable(choiceRules, func(i, j int) bool {
		return choiceRules[i].Index < choiceRules[j].Index
	})

	executorBlock := &ExecutorChoiceBlock{ExecutorBaseBlock: executorBaseBlock, Rules: choiceRules}

	return executorBlock, nil
}

func createExecutorExecuteFlowBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorExecuteFlowBlock, error) {

	executeFlowBlock, ok := block.Details.(*symphony.BlockDetailExecuteFlowBlock)
	if !ok {
		return nil, errors.New("execute flow block not assignable")
	}

	var flowID string
	if executeFlowBlock != nil {
		entryPoints := executeFlowBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		flowID = executeFlowBlock.Flow.Id
	}

	executorBlock := &ExecutorExecuteFlowBlock{ExecutorBaseBlock: executorBaseBlock, FlowID: flowID}

	return executorBlock, nil
}

func createExecutorForEachBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorForEachBlock, error) {

	forEachBlock, ok := block.Details.(*symphony.BlockDetailForEachBlock)
	if !ok {
		return nil, errors.New("foreach block not assignable")
	}

	forEachKey := forEachBlock.Typename

	var internalNextBlockID string
	if forEachBlock != nil {
		entryPoints := forEachBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		internalEntryPoints := forEachBlock.InternalExitPoint.NextEntryPoints
		if len(internalEntryPoints) > 0 {
			internalNextBlockID = internalEntryPoints[0].ParentBlock.Id
		}
	}

	executorBlock := &ExecutorForEachBlock{
		ExecutorBaseBlock: executorBaseBlock,
		StartBlockID:      internalNextBlockID,
		Key:               forEachKey,
	}

	return executorBlock, nil
}

func createExecutorInvokeBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorInvokeRestAPIBlock, error) {

	invokeBlock, ok := block.Details.(*symphony.BlockDetailInvokeRestAPIBlock)
	if !ok {
		return nil, errors.New("invoke rest api block not assignable")
	}

	var authType enum.AuthType
	var method enum.UrlMethod
	var url, body, basicUser, basicPassword string
	var oidcClientId, oidcClientSecret, oidcUrl string
	var timeout int

	headers := make(map[string]string)

	if invokeBlock != nil {
		entryPoints := invokeBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		authType = invokeBlock.AuthType
		basicUser = invokeBlock.User
		basicPassword = invokeBlock.Password
		oidcClientId = invokeBlock.ClientId
		oidcClientSecret = invokeBlock.ClientSecret
		oidcUrl = invokeBlock.OidcUrl

		url = invokeBlock.Url
		body = invokeBlock.Body
		method = invokeBlock.Method
		timeout = invokeBlock.Timeout

		for _, header := range invokeBlock.Headers {
			headers[header.Key] = header.Value
		}
	}

	return &ExecutorInvokeRestAPIBlock{
		ExecutorBaseBlock: executorBaseBlock,
		Timeout:           timeout,
		Url:               url,
		Body:              body,
		Method:            method,
		Headers:           headers,
		AuthType:          authType,
		BasicUser:         basicUser,
		BasicPassword:     basicPassword,
		OidcClientId:      oidcClientId,
		OidcClientSecret:  oidcClientSecret,
		OidcUrl:           oidcUrl,
	}, nil
}

func createExecutorKafkaBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorKafkaBlock, error) {

	kafkaBlock, ok := block.Details.(*symphony.BlockDetailKafkaBlock)
	if !ok {
		return nil, errors.New("kafka block not assignable")
	}

	var topic, message string
	var brokers []string
	var messageType enum.KafkaMessageType

	if kafkaBlock != nil {
		entryPoints := kafkaBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		topic = kafkaBlock.Topic
		message = kafkaBlock.Message
		brokers = kafkaBlock.Brokers
		messageType = kafkaBlock.MessageType
	}

	return &ExecutorKafkaBlock{
		ExecutorBaseBlock: executorBaseBlock,
		Topic:             topic,
		Expression:        message,
		Brokers:           brokers,
		MessageType:       messageType,
	}, nil
}

func createExecutorParallelBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorParallelBlock, error) {

	parallelBlock, ok := block.Details.(*symphony.BlockDetailParallelBlock)
	if !ok {
		return nil, errors.New("foreach block not assignable")
	}

	forEachKey := parallelBlock.Typename

	var internalNextBlockID string
	if parallelBlock != nil {
		entryPoints := parallelBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		internalEntryPoints := parallelBlock.InternalExitPoint.NextEntryPoints
		if len(internalEntryPoints) > 0 {
			internalNextBlockID = internalEntryPoints[0].ParentBlock.Id
		}
	}

	return &ExecutorParallelBlock{
		ExecutorBaseBlock: executorBaseBlock,
		StartBlockID:      internalNextBlockID,
		Key:               forEachKey,
	}, nil
}

func createExecutorTimerBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorTimerBlock, error) {

	timerBlock, ok := block.Details.(*symphony.BlockDetailTimerBlock)
	if !ok {
		return nil, errors.New("timer block not assignable")
	}

	var seconds int
	var expression string
	var enableExpression bool
	var specificDate time.Time
	var behavior enum.TimerBehavior

	if timerBlock != nil {
		entryPoints := timerBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		behavior = timerBlock.Behavior
		seconds = timerBlock.Seconds
		expression = timerBlock.Expression
		specificDate = timerBlock.Datetime
		enableExpression = timerBlock.EnableExpressionL
	}

	return &ExecutorTimerBlock{
		ExecutorBaseBlock: executorBaseBlock,
		Behavior:          behavior,
		Seconds:           seconds,
		EnableExpression:  enableExpression,
		Expression:        expression,
		SpecificDate:      specificDate,
	}, nil
}

func createWaitForSignalBlock(
	block symphony.BaseBlock, executorBaseBlock ExecutorBaseBlock,
) (*ExecutorWaitForSignalBlock, error) {

	waitBlock, ok := block.Details.(*symphony.BlockDetailWaitForSignalBlock)
	if !ok {
		return nil, errors.New("timer block not assignable")
	}

	var blocked bool
	var customFilter string
	var signalType enum.SignalType
	var signalModule enum.SignalModule

	if waitBlock != nil {
		entryPoints := waitBlock.ExitPoint.NextEntryPoints
		if len(entryPoints) > 0 {
			executorBaseBlock.NextBlockID = entryPoints[0].ParentBlock.Id
		}

		blocked = waitBlock.Blocked
		customFilter = waitBlock.CustomFilter
		signalType = waitBlock.Type
		signalModule = waitBlock.SignalModule
	}

	return &ExecutorWaitForSignalBlock{
		ExecutorBaseBlock: executorBaseBlock,
		Blocked:           blocked,
		CustomFilter:      customFilter,
		SignalType:        signalType,
		SignalModule:      signalModule,
	}, nil
}
