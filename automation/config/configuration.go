package config

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/spf13/viper"
)

type ApiConfig struct {
	Address string
	Port    int
}

type CadenceDomain struct {
	Name              string
	WorkflowRetention int32
	EmitMetric        bool
}

type CadenceWorker struct {
	ClientName  string
	ServiceName string
	TaskList    string
}

type CadenceConfig struct {
	Host   string
	Port   int
	Domain CadenceDomain
	Worker CadenceWorker
}

type GraphQLBasic struct {
	User     string
	Password string
}

type GraphQLAuthentication struct {
	Type  enum.GraphQLAuthenticationType
	Basic GraphQLBasic
}

type GraphQLConfig struct {
	Endpoint       string
	Authentication GraphQLAuthentication
}

type AppConfig struct {
	Cadence CadenceConfig
	GraphQL GraphQLConfig
	Api     ApiConfig
}

func (h *AppConfig) Setup() {
	viper.SetConfigName("application")
	viper.AddConfigPath("resources")
	viper.AutomaticEnv()
	viper.SetConfigType("yml")
	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("Error reading config file, %s", err)
	}

	err := viper.Unmarshal(&h)
	if err != nil {
		fmt.Printf("Unable to decode into struct, %v", err)
	}
}
