package executors

import (
	"testing"
)

func TestExecutorForEachBlock_runLogic(t *testing.T) {
	tests := []struct {
		name    string
		b       *ExecutorForEachBlock
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.runLogic(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorForEachBlock.runLogic() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
