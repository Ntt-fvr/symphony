package worker

import (
	"github.com/facebookincubator/symphony/automation/cadence/activity"
	"github.com/facebookincubator/symphony/automation/cadence/builder"
	"github.com/facebookincubator/symphony/automation/cadence/flow"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/uber-go/tally"
	"go.uber.org/cadence/worker"
	"go.uber.org/zap"
)

func StartWorker(configuration config.CadenceConfig) error {
	logger := builder.BuildLogger()
	service := builder.BuildCadenceClient(configuration)

	taskListName := configuration.Worker.TaskList

	workerOptions := worker.Options{
		Logger:       logger,
		MetricsScope: tally.NewTestScope(taskListName, map[string]string{}),
	}

	newWorker := worker.New(
		service,
		configuration.Domain.Name,
		taskListName,
		workerOptions,
	)

	newWorker.RegisterWorkflow(flow.AutomationWorkflow)

	newWorker.RegisterActivity(activity.StartActivity)
	newWorker.RegisterActivity(activity.EndActivity)
	newWorker.RegisterActivity(activity.GotoActivity)
	newWorker.RegisterActivity(activity.ChoiceActivity)
	newWorker.RegisterActivity(activity.InvokeRestAPIActivity)
	newWorker.RegisterActivity(activity.PublishKafkaActivity)

	err := newWorker.Start()
	if err != nil {
		return err
	}

	logger.Info("Started Worker.", zap.String("worker", taskListName))

	return nil
}
