package main

import (
	"fmt"
	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/automation/cadence/domain"
	"github.com/facebookincubator/symphony/automation/cadence/worker"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/facebookincubator/symphony/automation/executors"
	"github.com/facebookincubator/symphony/automation/handlers"
	"github.com/facebookincubator/symphony/automation/util"
	"github.com/facebookincubator/symphony/pkg/kongtoml"
	"github.com/prometheus/common/log"
	"go.uber.org/zap"
)

func main() {
	var appConfig config.AppConfig
	kong.Parse(&appConfig,
		kong.Configuration(kongtoml.Loader),
	)

	configJson, _ := util.ToJsonString(appConfig)
	fmt.Println(configJson)

	app, cleanup, err := NewApplication(&appConfig)
	if err != nil {
		log.Fatal(err)
	}
	defer cleanup()

	app.logger.Info("[Automation] starting application")
	err = app.run()
	app.logger.Info("terminating application", zap.Error(err))
}

type application struct {
	logger        *zap.Logger
	apiConfig     config.ApiConfig
	cadenceConfig config.CadenceConfig
	graphQLConfig config.GraphQLConfig
}

func (app *application) run() error {
	executors.Setup(app.graphQLConfig)

	err := domain.RegisterDomain(app.cadenceConfig)
	if err != nil {
		panic(err)
	}

	err = worker.StartWorker(app.cadenceConfig)
	if err != nil {
		panic(err)
	}

	handlers.Setup(app.apiConfig, app.cadenceConfig)
	handlers.CreateUrlMappings()
	err = handlers.RunServer()
	if err != nil {
		return err
	}
	return nil
}
