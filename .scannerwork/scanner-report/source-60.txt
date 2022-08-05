package executors

import (
	"testing"
)

func TestExecutorChoiceBlock_runLogic(t *testing.T) {
	baseBlock := ExecutorBaseBlock{
		Input: map[string]interface{}{
			"field1": "value1",
			"field2": "value2",
			"field3": false,
			"field4": 11,
			"field5": 7,
		},
		State: map[string]interface{}{
			"field6": 102,
			"field8": "value8",
			"field9": true,
		},
		Output: map[string]interface{}{
			"field10": 235,
			"field11": "value11",
			"field12": false,
		},
	}
	tests := []struct {
		name    string
		b       *ExecutorChoiceBlock
		wantErr bool
	}{
		{
			name: "test choice block runLogic ok",
			b: &ExecutorChoiceBlock{
				ExecutorBaseBlock: baseBlock,
				Rules: []ExecutorChoiceRule{
					{
						Index:     1,
						BlockID:   "6756843",
						Condition: "input.field4 < state.field6",
					},
				},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.runLogic(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorChoiceBlock.runLogic() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
