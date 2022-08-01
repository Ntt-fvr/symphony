package model

type FlowInstanceRequest struct {
	FlowInstanceID int    `json:"flowInstanceID" binding:"required"`
	Tenant         string `json:"tenant" binding:"required"`
}

type SignalRequest struct {
	FlowInstanceID int         `json:"flowInstanceID" binding:"required"`
	WorkflowID     string      `json:"workflowID" binding:"required"`
	RunID          string      `json:"runID" binding:"required"`
	Input          interface{} `json:"input,omitempty"`
}
