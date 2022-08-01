package builder

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/uber-go/tally"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"go.uber.org/cadence/client"
	"go.uber.org/yarpc"
	"go.uber.org/yarpc/transport/tchannel"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func BuildLogger() *zap.Logger {
	configuration := zap.NewDevelopmentConfig()
	configuration.Level.SetLevel(zapcore.InfoLevel)

	var err error
	logger, err := configuration.Build()
	if err != nil {
		panic("Failed to setup logger")
	}

	return logger
}

func BuildCadenceClient(configuration config.CadenceConfig) workflowserviceclient.Interface {
	hostPort := fmt.Sprintf("%s:%d", configuration.Host, configuration.Port)
	clientName := configuration.Worker.ClientName
	serviceName := configuration.Worker.ServiceName

	ch, err := tchannel.NewChannelTransport(tchannel.ServiceName(clientName))
	if err != nil {
		panic("Failed to setup tchannel")
	}
	dispatcher := yarpc.NewDispatcher(yarpc.Config{
		Name: clientName,
		Outbounds: yarpc.Outbounds{
			serviceName: {Unary: ch.NewSingleOutbound(hostPort)},
		},
	})
	if err := dispatcher.Start(); err != nil {
		panic("Failed to start dispatcher")
	}

	return workflowserviceclient.New(dispatcher.ClientConfig(serviceName))
}

func BuildClient(configuration config.CadenceConfig) client.Client {
	service := BuildCadenceClient(configuration)
	return client.NewClient(service, configuration.Domain.Name,
		&client.Options{MetricsScope: tally.NewTestScope(configuration.Worker.TaskList, map[string]string{})},
	)
}
