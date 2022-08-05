package handlers

import (
	"fmt"
	"github.com/facebookincubator/symphony/automation/config"
	"github.com/gin-gonic/gin"
)

var engine *gin.Engine
var apiConfig config.ApiConfig
var cadenceConfig config.CadenceConfig

func init() {
	engine = gin.Default()
}

func Setup(apiConfigValue config.ApiConfig, cadenceConfigValue config.CadenceConfig) {
	apiConfig = apiConfigValue
	cadenceConfig = cadenceConfigValue
}

func CreateUrlMappings() {
	api := engine.Group("/api")
	{
		flow := api.Group("/flow")
		{
			v1 := flow.Group("/1.0")
			{
				v1.GET("/health")
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
	if apiConfig.Address != "" {
		address = apiConfig.Address
	} else {
		address = "0.0.0.0"
	}

	var port int
	if apiConfig.Port > 0 {
		port = apiConfig.Port
	} else {
		port = 80
	}

	return engine.Run(fmt.Sprintf("%s:%d", address, port))
}
