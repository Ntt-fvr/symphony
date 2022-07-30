package executors

import (
	"encoding/json"
	"strings"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
)

type ExecutorKafkaBlock struct {
	executorBaseBlock
}

func (b *ExecutorKafkaBlock) runLogic() error {
	kafkaBlock := b.executorBlock.Kafka
	if kafkaBlock == nil {
		return configNotFound
	}

	brokers := strings.Join(kafkaBlock.Brokers, ";")

	kafkaConfig := &kafka.ConfigMap{
		"bootstrap.servers": brokers,
	}

	producer, err := kafka.NewProducer(kafkaConfig)
	if err != nil {
		return err
	}

	defer producer.Close()

	var message map[string]interface{}
	switch kafkaBlock.MessageType {
	case enum.KafkaMessageTypeInput:
		message = b.input
	case enum.KafkaMessageTypeState:
		message = b.state
	case enum.KafkaMessageTypeExpression:
		inputVariable := celgo.ConvertToValue(b.input)
		stateVariable := celgo.ConvertToValue(b.state)

		variables := map[string]interface{}{
			celgo.InputVariable: inputVariable,
			celgo.StateVariable: stateVariable,
		}

		result, err := celgo.CompileAndEvaluate(kafkaBlock.Expression, variables)
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
		TopicPartition: kafka.TopicPartition{Topic: &kafkaBlock.Topic, Partition: kafka.PartitionAny},
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
