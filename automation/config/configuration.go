package config

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/spf13/viper"
)

type appConfig struct {
	ApiAddress                            string                         `mapstructure:"AUTOMATION_ADDRESS"`
	ApiPort                               int                            `mapstructure:"AUTOMATION_PORT"`
	CadenceAddress                        string                         `mapstructure:"CADENCE_ADDRESS"`
	CadencePort                           int                            `mapstructure:"CADENCE_PORT"`
	DomainName                            string                         `mapstructure:"DOMAIN_NAME"`
	DomainWorkflowRetention               int32                          `mapstructure:"DOMAIN_WORKFLOW_RETENTION"`
	DomainEmitMetrics                     bool                           `mapstructure:"DOMAIN_EMIT_METRICS"`
	WorkerClientName                      string                         `mapstructure:"WORKER_CLIENT_NAME"`
	WorkerServiceName                     string                         `mapstructure:"WORKER_SERVICE_NAME"`
	WorkerTaskList                        string                         `mapstructure:"WORKER_TASK_LIST"`
	GraphQLEndpoint                       string                         `mapstructure:"GRAPHQL_ENDPOINT"`
	GraphQLAuthenticationType             enum.GraphQLAuthenticationType `mapstructure:"GRAPHQL_AUTHENTICATION_TYPE"`
	GraphQLAuthenticationBasicUser        string                         `mapstructure:"GRAPHQL_AUTHENTICATION_BASIC_USER"`
	GraphQLAuthenticationBasicPassword    string                         `mapstructure:"GRAPHQL_AUTHENTICATION_BASIC_PASSWORD"`
	GraphQLAuthenticationOidcClientId     string                         `mapstructure:"GRAPHQL_AUTHENTICATION_OIDC_CLIENT_ID"`
	GraphQLAuthenticationOidcClientSecret string                         `mapstructure:"GRAPHQL_AUTHENTICATION_OIDC_CLIENT_SECRET"`
	GraphQLAuthenticationOidcUrl          string                         `mapstructure:"GRAPHQL_AUTHENTICATION_OIDC_URL"`
}

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

type GraphQLOidc struct {
	ClientId     string
	ClientSecret string
	Url          string
}

type GraphQLBasic struct {
	User     string
	Password string
}

type GraphQLAuthentication struct {
	Type  enum.GraphQLAuthenticationType
	Basic GraphQLBasic
	Oidc  GraphQLOidc
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
	viper.SetConfigName("automation")
	viper.SetConfigType("env")
	viper.AddConfigPath("/bin")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("Error reading config file, %s", err)
	}

	var envConfig appConfig
	err := viper.Unmarshal(&envConfig)
	if err != nil {
		fmt.Printf("Unable to decode into struct, %v", err)
	}

	h.Api = ApiConfig{
		Address: envConfig.ApiAddress,
		Port:    envConfig.ApiPort,
	}

	h.Cadence = CadenceConfig{
		Host: envConfig.CadenceAddress,
		Port: envConfig.CadencePort,
		Domain: CadenceDomain{
			Name:              envConfig.DomainName,
			WorkflowRetention: envConfig.DomainWorkflowRetention,
			EmitMetric:        envConfig.DomainEmitMetrics,
		},
		Worker: CadenceWorker{
			ClientName:  envConfig.WorkerClientName,
			ServiceName: envConfig.WorkerServiceName,
			TaskList:    envConfig.WorkerTaskList,
		},
	}

	h.GraphQL = GraphQLConfig{
		Endpoint: envConfig.GraphQLEndpoint,
		Authentication: GraphQLAuthentication{
			Type: envConfig.GraphQLAuthenticationType,
			Basic: GraphQLBasic{
				User:     envConfig.GraphQLAuthenticationBasicUser,
				Password: envConfig.GraphQLAuthenticationBasicPassword,
			},
			Oidc: GraphQLOidc{
				ClientId:     envConfig.GraphQLAuthenticationOidcClientId,
				ClientSecret: envConfig.GraphQLAuthenticationOidcClientSecret,
				Url:          envConfig.GraphQLAuthenticationOidcUrl,
			},
		},
	}
}
