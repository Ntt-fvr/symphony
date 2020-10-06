// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package terraform

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
)

// ReadOutput runs `terraform output` on the given directory and returns
// the parsed result.
func ReadOutput(ctx context.Context, dir string) (map[string]Output, error) {
	cmd := exec.CommandContext(ctx, "terraform", "output", "-json")
	cmd.Dir = dir
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, fmt.Errorf("get terraform output: %w", err)
	}
	if err := cmd.Start(); err != nil {
		return nil, fmt.Errorf("start terraform: %w", err)
	}
	var output map[string]Output
	if err := json.NewDecoder(stdout).Decode(&output); err != nil {
		return nil, fmt.Errorf("decode terraform output: %w", err)
	}
	if err := cmd.Wait(); err != nil {
		return nil, fmt.Errorf("wait for terraform: %w", err)
	}
	return output, nil
}

// Output describes a single output value.
type Output struct {
	Type      string      `json:"type"` // one of "string", "list", or "map"
	Sensitive bool        `json:"sensitive"`
	Value     interface{} `json:"value"`
}
