// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package cmd

import (
	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/pkg/cadence"
	"go.uber.org/cadence/.gen/go/cadence/workflowserviceclient"
	"go.uber.org/cadence/.gen/go/shared"
	"go.uber.org/cadence/client"
	"go.uber.org/zap"
)

// CadenceCmd implements migrate cadence command.
type CadenceCmd struct {
	Address   string `name:"address" placeholder:"<address>" required:"" env:"CADENCE_ADDR" help:"Cadence server address."`
	Domain    string `name:"domain" placeholder:"<domain>" required:"" env:"CADENCE_DOMAIN" help:"Cadence domain name."`
	Retention int32  `name:"retention" placeholder:"<days>" env:"CADENCE_RETENTION" help:"Cadence retention in days."`
}

// Run runs the migrate cadence command.
func (c *CadenceCmd) Run(ctx *Context) error {
	ctx.Info("creating cadence client",
		zap.String("address", c.Address),
	)
	cc, cleanup, err := cadence.ProvideClient(ctx.Logger, c.Address)
	if err != nil {
		return err
	}
	defer cleanup()

	ctx.Info("registering domain",
		zap.String("domain", c.Domain),
	)
	if err := c.register(ctx, cc); err != nil {
		return err
	}
	return nil
}

func (c *CadenceCmd) register(ctx *Context, cc workflowserviceclient.Interface) error {
	domainClient := client.NewDomainClient(cc, nil)
	if _, err := domainClient.Describe(ctx, c.Domain); err != nil {
		switch err := err.(type) {
		case *shared.EntityNotExistsError:
			if err := domainClient.Register(ctx, &shared.RegisterDomainRequest{
				Name:                                   &c.Domain,
				WorkflowExecutionRetentionPeriodInDays: &c.Retention,
				EmitMetric:                             pointer.ToBool(true),
			}); err != nil {
				ctx.Error("cannot register domain", zap.Error(err))
				return err
			}
		default:
			ctx.Error("cannot find domain", zap.Error(err))
			return err
		}
	} else if err := domainClient.Update(ctx, &shared.UpdateDomainRequest{
		Name: pointer.ToString(c.Domain),
		Configuration: &shared.DomainConfiguration{
			WorkflowExecutionRetentionPeriodInDays: pointer.ToInt32OrNil(c.Retention),
			EmitMetric:                             pointer.ToBool(true),
		},
	}); err != nil {
		ctx.Error("cannot update domain", zap.Error(err))
		return err
	}
	return nil
}
