//go:build wireinject
// +build wireinject

package main

import (
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/google/wire"
)

func NewApplication(appConfig *config.AppConfig) (*application, func(), error) {
	wire.Build(
		wire.FieldsOf(new(*config.AppConfig), "LogConfig"),
		log.Provider,
		config.ApiConfiguration,
		config.CadenceConfiguration,
		config.GraphQLConfiguration,
		wire.Struct(
			new(application), "*",
		),
	)
	return nil, nil, nil
}
