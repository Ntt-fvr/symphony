// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package log_test

import (
	"testing"

	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
	"gopkg.in/alecthomas/kingpin.v2"
)

func TestConfigParse(t *testing.T) {
	t.Run("Default", func(t *testing.T) {
		app := kingpin.New(t.Name(), "")
		config := log.AddFlags(app)
		_, err := app.Parse(nil)
		require.NoError(t, err)
		require.Equal(t, "info", config.Level.String())
		require.Equal(t, "console", config.Format)
	})
	t.Run("OK", func(t *testing.T) {
		app := kingpin.New(t.Name(), "")
		config := log.AddFlags(app)
		_, err := app.Parse([]string{
			"--" + log.LevelFlagName, "error",
			"--" + log.FormatFlagName, "json",
		})
		require.NoError(t, err)
		require.Equal(t, "error", config.Level.String())
		require.Equal(t, "json", config.Format)
	})
	t.Run("BadLevel", func(t *testing.T) {
		app := kingpin.New(t.Name(), "")
		_ = log.AddFlags(app)
		_, err := app.Parse([]string{
			"--" + log.LevelFlagName, "foo",
		})
		require.Error(t, err)
	})
	t.Run("BadFormat", func(t *testing.T) {
		app := kingpin.New(t.Name(), "")
		_ = log.AddFlags(app)
		_, err := app.Parse([]string{
			"--" + log.FormatFlagName, "bar",
		})
		require.Error(t, err)
	})
}

func TestNew(t *testing.T) {
	tests := []struct {
		name    string
		config  log.Config
		wantErr bool
	}{
		{
			name: "Production",
			config: log.Config{
				Level:  zap.InfoLevel,
				Format: "json",
			},
		},
		{
			name: "Development",
			config: log.Config{
				Level:  zap.DebugLevel,
				Format: "console",
			},
		},
		{
			name: "Nop",
		},
		{
			name: "BadFormat",
			config: log.Config{
				Format: "fmt",
			},
			wantErr: true,
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			logger, err := log.New(tc.config)
			if !tc.wantErr {
				require.NotNil(t, logger)
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}

func TestMustNew(t *testing.T) {
	var config log.Config
	require.NotPanics(t, func() { _ = log.MustNew(config) })
	config.Format = "baz"
	require.Panics(t, func() { _ = log.MustNew(config) })
}
