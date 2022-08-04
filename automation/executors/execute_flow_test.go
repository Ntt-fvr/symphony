package executors

import (
	"errors"
	"testing"
)

func TestExecutorExecuteFlowBlock_runLogic(t *testing.T) {
	baseBlock := ExecutorBaseBlock{
		Input: map[string]interface{}{
			"field1": "value1",
			"field2": "value2",
			"field3": false,
			"field4": 11,
			"field5": 7,
		},
	}
	tests := []struct {
		name    string
		b       *ExecutorExecuteFlowBlock
		wantErr bool
	}{
		{
			name: "test execute flow block runLogic ok",
			b: &ExecutorExecuteFlowBlock{
				ExecutorBaseBlock: baseBlock,
				FlowID:            "1353465",
				FlowExecutor: func(s string, m map[string]interface{}) (map[string]interface{}, error) {
					return map[string]interface{}{
						"field6": true,
						"field7": 12,
						"field8": "value8",
					}, nil
				},
			},
			wantErr: false,
		},
		{
			name: "test execute flow block runLogic error",
			b: &ExecutorExecuteFlowBlock{
				ExecutorBaseBlock: baseBlock,
				FlowID:            "4676534",
				FlowExecutor: func(s string, m map[string]interface{}) (map[string]interface{}, error) {
					return nil, errors.New("some Error")
				},
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.runLogic(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorExecuteFlowBlock.runLogic() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
