package executors

import (
	"reflect"
	"testing"

	"github.com/facebookincubator/symphony/automation/celgo"
	"github.com/facebookincubator/symphony/automation/enum"
	"go.uber.org/cadence/workflow"
)

func TestExecutorBaseBlock_SetWorkflowContext(t *testing.T) {
	type args struct {
		ctx workflow.Context
	}
	var tests []struct {
		name string
		b    *ExecutorBaseBlock
		args args
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.b.SetWorkflowContext(tt.args.ctx)
		})
	}
}

func TestExecutorBaseBlock_SetInput(t *testing.T) {
	type args struct {
		input map[string]interface{}
	}
	a := new(args)
	a.input = make(map[string]interface{})
	a.input["field1"] = "value1"
	a.input["field2"] = false
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		args args
	}{
		{name: "testInput", b: &ExecutorBaseBlock{}, args: *a},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.b.SetInput(tt.args.input)
		})
	}
}

func TestExecutorBaseBlock_SetState(t *testing.T) {
	type args struct {
		state map[string]interface{}
	}
	i := new(args)
	i.state = make(map[string]interface{})
	i.state["field1"] = "value1"
	i.state["field2"] = true
	i.state["field3"] = 11
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		args args
	}{
		{name: "testState", b: &ExecutorBaseBlock{}, args: *i},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.b.SetState(tt.args.state)
		})
	}
}

func TestExecutorBaseBlock_GetBlockType(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want enum.BlockType
	}{
		{name: "testEnumStartBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeStart}, want: enum.BlockTypeStart},
		{name: "testEnumEndBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeEnd}, want: enum.BlockTypeEnd},
		{name: "testEnumGotoBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeGoto}, want: enum.BlockTypeGoto},
		{name: "testEnumChoiceBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeChoice}, want: enum.BlockTypeChoice},
		{name: "testEnumExecuteFlowBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeExecuteFlow}, want: enum.BlockTypeExecuteFlow},
		{name: "testEnumForEachBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeForEach}, want: enum.BlockTypeForEach},
		{name: "testEnumInvokeRestAPIBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeInvokeRestAPI}, want: enum.BlockTypeInvokeRestAPI},
		{name: "testEnumKafkaBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeKafka}, want: enum.BlockTypeKafka},
		{name: "testEnumParallelBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeParallel}, want: enum.BlockTypeParallel},
		{name: "testEnumTimerBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeTimer}, want: enum.BlockTypeTimer},
		{name: "testEnumWaitForSignalBlock", b: &ExecutorBaseBlock{Type: enum.BlockTypeWaitForSignal}, want: enum.BlockTypeWaitForSignal},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetBlockType(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.GetBlockType() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_GetFlowInstanceID(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want string
	}{
		{name: "testFlownInstanceIdNumber", b: &ExecutorBaseBlock{FlowInstanceID: "1234567890"}, want: "1234567890"},
		{name: "testFlownInstanceIdAlpha", b: &ExecutorBaseBlock{FlowInstanceID: "ABC-1234"}, want: "ABC-1234"},
		{name: "testFlownInstanceIdString", b: &ExecutorBaseBlock{FlowInstanceID: "abcEFG"}, want: "abcEFG"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetFlowInstanceID(); got != tt.want {
				t.Errorf("ExecutorBaseBlock.GetFlowInstanceID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_GetBlockID(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want string
	}{
		{name: "testBlockIdNumber", b: &ExecutorBaseBlock{BlockID: "1234567890"}, want: "1234567890"},
		{name: "testBlockIdAlpha", b: &ExecutorBaseBlock{BlockID: "GKE-5421"}, want: "GKE-5421"},
		{name: "testBlockIdString", b: &ExecutorBaseBlock{BlockID: "oirnPWOE"}, want: "oirnPWOE"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetBlockID(); got != tt.want {
				t.Errorf("ExecutorBaseBlock.GetBlockID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_GetBlockInstanceID(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want string
	}{
		{name: "testGetBlockInstanceIdNumber", b: &ExecutorBaseBlock{BlockInstanceID: "1234567"}, want: "1234567"},
		{name: "testGetBlockInstanceIdAlpha", b: &ExecutorBaseBlock{BlockInstanceID: "NBFO-974"}, want: "NBFO-974"},
		{name: "testGetBlockInstanceIdString", b: &ExecutorBaseBlock{BlockInstanceID: "osbfgiNRP"}, want: "osbfgiNRP"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetBlockInstanceID(); got != tt.want {
				t.Errorf("ExecutorBaseBlock.GetBlockInstanceID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_SetBlockInstanceID(t *testing.T) {
	type args struct {
		blockInstanceID string
	}
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		args args
	}{
		{name: "testSetBlockInstanceIdNumber", b: &ExecutorBaseBlock{}, args: args{blockInstanceID: "12345"}},
		{name: "testSetBlockInstanceIdAlpha", b: &ExecutorBaseBlock{}, args: args{blockInstanceID: "MND-6585"}},
		{name: "testSetBlockInstanceIdString", b: &ExecutorBaseBlock{}, args: args{blockInstanceID: "dfdfOID"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.b.SetBlockInstanceID(tt.args.blockInstanceID)
		})
	}
}

func TestExecutorBaseBlock_AddAttempts(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
	}{
		{name: "testAddAttempts", b: &ExecutorBaseBlock{}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.b.AddAttempts()
		})
	}
}

func TestExecutorBaseBlock_GetAttempts(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want int
	}{
		{name: "testGetMaxAttempts", b: &ExecutorBaseBlock{Attempts: 0}, want: 0},
		{name: "testGetMaxAttempts", b: &ExecutorBaseBlock{Attempts: 5}, want: 5},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetAttempts(); got != tt.want {
				t.Errorf("ExecutorBaseBlock.GetAttempts() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_GetMaxAttempts(t *testing.T) {
	tests := []struct {
		name string
		b    *ExecutorBaseBlock
		want int
	}{
		{name: "testGetMaxAttempts", b: &ExecutorBaseBlock{MaxAttempts: 11}, want: 11},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.GetMaxAttempts(); got != tt.want {
				t.Errorf("ExecutorBaseBlock.GetMaxAttempts() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_runLogic(t *testing.T) {
	jsonData := make(map[string]interface{})
	jsonData["field1"] = "value1"
	jsonData["field2"] = true
	jsonData["field3"] = 18
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		wantErr bool
	}{
		{name: "test RunLogic", b: &ExecutorBaseBlock{Output: jsonData}, wantErr: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.runLogic(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.runLogic() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestExecutorBaseBlock_executeInputTransformation(t *testing.T) {
	blockTransformations := BlockTransformations{
		Input: BlockTransformationValue{
			Enabled: true,
			Key: celgo.AstKey{
				Key:      "key11",
				AstValue: "{'result_key1': input.field2, 'result_key2': state.field20}",
			},
			Strategy: enum.TransfStrategyMerge,
		},
		InputState: BlockTransformationValue{
			Enabled: true,
			Key: celgo.AstKey{
				Key:      "key12",
				AstValue: "{'result_key3': input.field1, 'result_key4': state.field10}",
			},
		},
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		wantErr bool
	}{
		{
			name: "test execute input transformations",
			b: &ExecutorBaseBlock{
				Transformations: blockTransformations,
				Input: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				State: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.executeInputTransformation(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.executeInputTransformation() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestExecutorBaseBlock_executeOutputTransformation(t *testing.T) {
	blockTransformations := BlockTransformations{
		Output: BlockTransformationValue{
			Enabled: true,
			Key: celgo.AstKey{
				Key:      "key11",
				AstValue: "{'result_key5': output.field2, 'result_key6': state.field20}",
			},
			Strategy: enum.TransfStrategyMerge,
		},
		OutputState: BlockTransformationValue{
			Enabled: true,
			Key: celgo.AstKey{
				Key:      "key12",
				AstValue: "{'result_key7': output.field1, 'result_key8': state.field10}",
			},
		},
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		wantErr bool
	}{
		{
			name: "test execute output transformations",
			b: &ExecutorBaseBlock{
				Transformations: blockTransformations,
				Output: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				State: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.b.executeOutputTransformation(); (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.executeOutputTransformation() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestExecutorBaseBlock_valueTransformation(t *testing.T) {
	type args struct {
		value    map[string]interface{}
		key      celgo.AstKey
		strategy enum.TransfStrategy
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test value transformation Ok",
			b: &ExecutorBaseBlock{
				State: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
			},
			args: args{
				value: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
				strategy: enum.TransfStrategyMerge,
			},
			wantErr: false,
			want: map[string]interface{}{
				"field1":      "value1",
				"field2":      "value2",
				"result_key5": "value3",
				"result_key6": "value4",
			},
		},
		{
			name: "test value transformation error",
			b:    &ExecutorBaseBlock{},
			args: args{
				value: map[string]interface{}{
					"field3": "value3",
					"field4": "value4",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
				strategy: enum.TransfStrategyReplace,
			},
			wantErr: true,
			want:    nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.b.valueTransformation(tt.args.value, tt.args.key, tt.args.strategy)
			if (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.valueTransformation() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.valueTransformation() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_stateTransformation(t *testing.T) {
	type args struct {
		value    map[string]interface{}
		key      celgo.AstKey
		strategy enum.TransfStrategy
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test state transformation Ok",
			b: &ExecutorBaseBlock{
				State: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
			},
			args: args{
				value: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
				strategy: enum.TransfStrategyMerge,
			},
			wantErr: false,
			want: map[string]interface{}{
				"field10":     "value3",
				"field20":     "value4",
				"result_key5": "value3",
				"result_key6": "value4",
			},
		},
		{
			name: "test state transformation error",
			b:    &ExecutorBaseBlock{},
			args: args{
				value: map[string]interface{}{
					"field3": "value3",
					"field4": "value4",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
				strategy: enum.TransfStrategyReplace,
			},
			wantErr: true,
			want:    nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.b.stateTransformation(tt.args.value, tt.args.key, tt.args.strategy)
			if (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.stateTransformation() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.stateTransformation() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_dataTransformation(t *testing.T) {
	type args struct {
		value map[string]interface{}
		key   celgo.AstKey
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test data transformation Ok",
			b: &ExecutorBaseBlock{
				State: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
			},
			args: args{
				value: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
			},
			wantErr: false,
			want: map[string]interface{}{
				"result_key5": "value3",
				"result_key6": "value4",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.b.dataTransformation(tt.args.value, tt.args.key)
			if (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.dataTransformation() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.dataTransformation() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_evaluateTransformation(t *testing.T) {
	type args struct {
		input map[string]interface{}
		state map[string]interface{}
		key   celgo.AstKey
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test evaluate transformation Ok",
			b:    &ExecutorBaseBlock{},
			args: args{
				input: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				state: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
				key: celgo.AstKey{
					Key:      "abc",
					AstValue: "{'result_key5': state.field10, 'result_key6': state.field20}",
				},
			},
			wantErr: false,
			want: map[string]interface{}{
				"result_key5": "value3",
				"result_key6": "value4",
			},
		},
		{
			name: "test evaluate transformation Error",
			b:    &ExecutorBaseBlock{},
			args: args{
				input: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				state: map[string]interface{}{
					"field10": "value3",
					"field20": "value4",
				},
				key: celgo.AstKey{
					AstValue: "",
				},
			},
			wantErr: true,
			want:    nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.b.evaluateTransformation(tt.args.input, tt.args.state, tt.args.key)
			if (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.evaluateTransformation() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.evaluateTransformation() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestExecutorBaseBlock_transformation(t *testing.T) {
	type args struct {
		original map[string]interface{}
		target   map[string]interface{}
		strategy enum.TransfStrategy
	}
	tests := []struct {
		name    string
		b       *ExecutorBaseBlock
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test transformation replace Ok",
			b:    &ExecutorBaseBlock{},
			args: args{
				original: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				target: map[string]interface{}{
					"field3": "value3",
					"field4": "value4",
				},
				strategy: enum.TransfStrategyReplace,
			},
			wantErr: false,
			want: map[string]interface{}{
				"field3": "value3",
				"field4": "value4",
			},
		},
		{
			name: "test transformation merge Ok",
			b:    &ExecutorBaseBlock{},
			args: args{
				original: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				target: map[string]interface{}{
					"field3": "value3",
					"field4": "value4",
				},
				strategy: enum.TransfStrategyMerge,
			},
			wantErr: false,
			want: map[string]interface{}{
				"field1": "value1",
				"field2": "value2",
				"field3": "value3",
				"field4": "value4",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.b.transformation(tt.args.original, tt.args.target, tt.args.strategy)
			if (err != nil) != tt.wantErr {
				t.Errorf("ExecutorBaseBlock.transformation() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ExecutorBaseBlock.transformation() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_merge(t *testing.T) {
	type args struct {
		original map[string]interface{}
		target   map[string]interface{}
	}
	tests := []struct {
		name    string
		args    args
		want    map[string]interface{}
		wantErr bool
	}{
		{
			name: "test merge ok",
			args: args{
				target: map[string]interface{}{
					"field1": "value1",
					"field2": "value2",
				},
				original: map[string]interface{}{
					"field3": "value3",
					"field4": "value4",
				},
			},
			want: map[string]interface{}{
				"field1": "value1",
				"field2": "value2",
				"field3": "value3",
				"field4": "value4",
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := merge(tt.args.original, tt.args.target)
			if (err != nil) != tt.wantErr {
				t.Errorf("merge() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("merge() = %v, want %v", got, tt.want)
			}
		})
	}
}
