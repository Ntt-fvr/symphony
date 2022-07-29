package handlers

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/gin-gonic/gin"
)

var engine *gin.Engine
var configuration config.AppConfig

func init() {
	engine = gin.Default()
}

func Setup(appConfig config.AppConfig) {
	configuration = appConfig
}

func CreateUrlMappings() {
	api := engine.Group("/api")
	{
		flow := api.Group("/flow")
		{
			v1 := flow.Group("/1.0")
			{
				v1.POST("/start", flowStart)
				v1.POST("/pause", flowPauseSignal)
				v1.POST("/resume", flowResumeSignal)
				v1.POST("/cancel", flowCancelSignal)
				v1.POST("/signal", flowBlockSignal)
				v1.POST("/timer", flowTimerSignal)
			}
		}
	}
}

func RunServer() error {
	var address string
	if configuration.Api.Address != "" {
		address = configuration.Api.Address
	} else {
		address = "0.0.0.0"
	}

	var port int
	if configuration.Api.Port > 0 {
		port = configuration.Api.Port
	} else {
		port = 8080
	}

	return engine.Run(fmt.Sprintf("%s:%d", address, port))
}
