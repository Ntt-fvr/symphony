package blocks

import (
	"encoding/json"
	"fmt"
	"github.com/Shopify/sarama"
	"github.com/facebookincubator/symphony/async/automation/celgo"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
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
	kafkaConfig := sarama.NewConfig()
	kafkaConfig.Producer.Return.Successes = true
	kafkaConfig.Producer.RequiredAcks = sarama.WaitForAll
	kafkaConfig.Producer.Retry.Max = 3

	producer, err := sarama.NewSyncProducer(b.brokers, kafkaConfig)
	if err != nil {
		return err
	}

	defer func(producer sarama.SyncProducer) {
		err := producer.Close()
		if err != nil {
			fmt.Println("Kafka producer close error:")
			fmt.Println(err)
		}
	}(producer)

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

	msg := &sarama.ProducerMessage{
		Topic: b.topic,
		Value: sarama.StringEncoder(messageBytes),
	}

	_, _, err = producer.SendMessage(msg)
	if err != nil {
		return err
	}

	b.output = b.input

	return nil
}
