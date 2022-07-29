package model

type FlowInstanceRequest struct {
	FlowInstanceID uint64 `json:"flowInstanceID" binding:"required"`
}

type SignalRequest struct {
	WorkflowID string                 `json:"workflowID" binding:"required"`
	RunID      string                 `json:"runID" binding:"required"`
	Input      map[string]interface{} `json:"input,omitempty"`
}
