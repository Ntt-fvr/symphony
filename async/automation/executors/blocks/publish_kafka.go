package blocks

import (
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"strings"
)

type KafkaBlock struct {
	baseBlock
	topic       string
	expression  string
	brokers     []string
	messageType enum.KafkaMessageType
}

func (b *KafkaBlock) Execute() (*ExecutorResult, error) {

	err := b.executeInputTransformation()
	if err != nil {
		return nil, err
	}

	err = b.runLogic()
	if err != nil {
		return nil, err
	}

	err = b.executeOutputTransformation()
	if err != nil {
		return nil, err
	}

	blockResult := ExecutorResult{
		Output:    b.output,
		State:     b.state,
		NextBlock: b.nextBlock,
	}

	return &blockResult, nil
}

func (b *KafkaBlock) runLogic() error {
	brokers := strings.Join(b.brokers, ";")

	kafkaConfig := &kafka.ConfigMap{
		"bootstrap.servers": brokers,
	}

	producer, err := kafka.NewProducer(kafkaConfig)
	if err != nil {
		return err
	}

	defer producer.Close()

	var message map[string]interface{}
	switch b.messageType {
	case "INPUT":
		message = b.input
	case "STATE":
		message = b.state
	case "EXPRESSION":
		inputVariable := celgo.ConvertToValue(b.input)
		stateVariable := celgo.ConvertToValue(b.state)

		variables := map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

		result, err := celgo.CompileAndEvaluate(b.expression, variables)
		if err != nil {
			return err
		}

		native, err := celgo.ConvertToNative(result)
		if err != nil {
			return err
		}

		message = native
	}

	messageBytes, err := json.Marshal(message)
	if err != nil {
		return err
	}

	msg := &kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &b.topic, Partition: kafka.PartitionAny},
		Value:          messageBytes,
	}

	err = producer.Produce(msg, nil)
	if err != nil {
		return err
	}

	producer.Flush(15000)

	b.output = b.input

	return nil
}
