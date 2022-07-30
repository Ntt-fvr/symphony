package main

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/cadence/domain"
	"github.com/facebookincubator/symphony/automation/cadence/worker"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/facebookincubator/symphony/automation/executors"
	"github.com/facebookincubator/symphony/automation/handlers"
)

func main() {
	var appConfig config.AppConfig
	appConfig.Setup()

	fmt.Println(appConfig)

	executors.Setup(appConfig.GraphQL)

	err := domain.RegisterDomain(appConfig.Cadence)
	if err != nil {
		panic(err)
	}

	err = worker.StartWorker(appConfig.Cadence)
	if err != nil {
		panic(err)
	}

	handlers.Setup(appConfig)
	handlers.CreateUrlMappings()
	err = handlers.RunServer()
	if err != nil {
		panic(err)
	}
}
