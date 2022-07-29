package domain

import (
	"context"
	"github.com/facebookincubator/symphony/automation/cadence/builder"
	"github.com/facebookincubator/symphony/automation/config"
	"go.uber.org/cadence/.gen/go/shared"
	"go.uber.org/cadence/client"
)

func RegisterDomain(configuration config.CadenceConfig) error {
	cadenceClient := builder.BuildCadenceClient(configuration)

	ctx := context.Background()

	domain := configuration.Domain

	domainClient := client.NewDomainClient(cadenceClient, nil)
	_, err := domainClient.Describe(ctx, domain.Name)
	if err != nil {
		switch err.(type) {
		case *shared.EntityNotExistsError:
			description := "Automation Domain"
			domainRequest := &shared.RegisterDomainRequest{
				Name:                                   &domain.Name,
				Description:                            &description,
				WorkflowExecutionRetentionPeriodInDays: &domain.WorkflowRetention,
				EmitMetric:                             &domain.EmitMetric,
			}

			err = domainClient.Register(ctx, domainRequest)
			if err != nil {
				return err
			}
		default:
			return err
		}
	} else {
		domainConfiguration := &shared.DomainConfiguration{
			WorkflowExecutionRetentionPeriodInDays: &domain.WorkflowRetention,
			EmitMetric:                             &domain.EmitMetric,
		}

		domainUpdateRequest := &shared.UpdateDomainRequest{
			Name:          &domain.Name,
			Configuration: domainConfiguration,
		}

		err = domainClient.Update(ctx, domainUpdateRequest)
		if err != nil {
			return err
		}
	}

	return nil
}
