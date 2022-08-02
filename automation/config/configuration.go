package config

import (
	"github.com/facebookincubator/symphony/automation/enum"
	"github.com/facebookincubator/symphony/pkg/log"
)

type AppConfig struct {
	ApiAddress                            string                         `name:"automation.api.address" env:"AUTOMATION_ADDRESS" default:"0.0.0.0"`
	ApiPort                               int                            `name:"automation.api.port" env:"AUTOMATION_PORT" default:"80"`
	CadenceAddress                        string                         `name:"automation.cadence.address" env:"CADENCE_ADDRESS"`
	CadencePort                           int                            `name:"automation.cadence.port" env:"CADENCE_PORT" default:"7933"`
	DomainName                            string                         `name:"automation.domain.name" env:"DOMAIN_NAME" default:"automation"`
	DomainWorkflowRetention               int32                          `name:"automation.domain.retention" env:"DOMAIN_WORKFLOW_RETENTION" default:"2"`
	DomainEmitMetrics                     bool                           `name:"automation..domain.emit" env:"DOMAIN_EMIT_METRICS" default:"true"`
	WorkerClientName                      string                         `name:"automation.worker.client" env:"WORKER_CLIENT_NAME"`
	WorkerServiceName                     string                         `name:"automation.worker.service" env:"WORKER_SERVICE_NAME" default:"cadence-frontend"`
	WorkerTaskList                        string                         `name:"automation.worker.task" env:"WORKER_TASK_LIST"`
	GraphQLEndpoint                       string                         `name:"automation.graphql.endpoint" env:"GRAPHQL_ENDPOINT"`
	GraphQLUserRole                       string                         `name:"automation.graphql.user.role" env:"GRAPHQL_USER_ROLE"`
	GraphQLAuthenticationType             enum.GraphQLAuthenticationType `name:"automation.graphql.auth" env:"GRAPHQL_AUTHENTICATION_TYPE"`
	GraphQLAuthenticationBasicUser        string                         `name:"automation.graphql.basic.user" env:"GRAPHQL_AUTHENTICATION_BASIC_USER"`
	GraphQLAuthenticationBasicPassword    string                         `name:"automation.graphql.basic.password" env:"GRAPHQL_AUTHENTICATION_BASIC_PASSWORD"`
	GraphQLAuthenticationOidcClientId     string                         `name:"automation.graphql.oidc.client.id" env:"GRAPHQL_AUTHENTICATION_OIDC_CLIENT_ID"`
	GraphQLAuthenticationOidcClientSecret string                         `name:"automation.graphql.oidc.client.secret" env:"GRAPHQL_AUTHENTICATION_OIDC_CLIENT_SECRET"`
	GraphQLAuthenticationOidcUrl          string                         `name:"automation.graphql.oidc.url" env:"GRAPHQL_AUTHENTICATION_OIDC_URL"`
	LogConfig                             log.Config                     `embed:""`
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
	UserRole string
	Type     enum.GraphQLAuthenticationType
	Basic    GraphQLBasic
	Oidc     GraphQLOidc
}

type GraphQLConfig struct {
	Endpoint       string
	Authentication GraphQLAuthentication
}

func ApiConfiguration(a *AppConfig) ApiConfig {
	return ApiConfig{
		Address: a.ApiAddress,
		Port:    a.ApiPort,
	}
}

func CadenceConfiguration(a *AppConfig) CadenceConfig {
	return CadenceConfig{
		Host: a.CadenceAddress,
		Port: a.CadencePort,
		Domain: CadenceDomain{
			Name:              a.DomainName,
			WorkflowRetention: a.DomainWorkflowRetention,
			EmitMetric:        a.DomainEmitMetrics,
		},
		Worker: CadenceWorker{
			ClientName:  a.WorkerClientName,
			ServiceName: a.WorkerServiceName,
			TaskList:    a.WorkerTaskList,
		},
	}
}

func GraphQLConfiguration(a *AppConfig) GraphQLConfig {
	return GraphQLConfig{
		Endpoint: a.GraphQLEndpoint,
		Authentication: GraphQLAuthentication{
			UserRole: a.GraphQLUserRole,
			Type:     a.GraphQLAuthenticationType,
			Basic: GraphQLBasic{
				User:     a.GraphQLAuthenticationBasicUser,
				Password: a.GraphQLAuthenticationBasicPassword,
			},
			Oidc: GraphQLOidc{
				ClientId:     a.GraphQLAuthenticationOidcClientId,
				ClientSecret: a.GraphQLAuthenticationOidcClientSecret,
				Url:          a.GraphQLAuthenticationOidcUrl,
			},
		},
	}
}
