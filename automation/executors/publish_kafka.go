package executors

import (
	"encoding/json"
	"strings"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/enum"
)

type ExecutorKafkaBlock struct {
	ExecutorBaseBlock
	Topic       string
	Expression  string
	Brokers     []string
	MessageType enum.KafkaMessageType
}

func (b *ExecutorKafkaBlock) Execute() (*ExecutorResult, error) {
	b.runLogicFunction = b.runLogic
	return b.execute()
}

func (b *ExecutorKafkaBlock) runLogic() error {
	brokers := strings.Join(b.Brokers, ";")

	kafkaConfig := &kafka.ConfigMap{
		"bootstrap.servers": brokers,
	}

	producer, err := kafka.NewProducer(kafkaConfig)
	if err != nil {
		return err
	}

	defer producer.Close()

	var message map[string]interface{}
	switch b.MessageType {
	case enum.KafkaMessageTypeInput:
		message = b.Input
	case enum.KafkaMessageTypeState:
		message = b.State
	case enum.KafkaMessageTypeExpression:
		inputVariable := celgo.ConvertToValue(b.Input)
		stateVariable := celgo.ConvertToValue(b.State)

		variables := map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

		result, err := celgo.CompileAndEvaluate(b.Expression, variables)
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
		TopicPartition: kafka.TopicPartition{Topic: &b.Topic, Partition: kafka.PartitionAny},
		Value:          messageBytes,
	}

	err = producer.Produce(msg, nil)
	if err != nil {
		return err
	}

	producer.Flush(15000)

	b.Output = b.Input

	return nil
}
