// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package log_test

import (
	"os"
	"testing"

	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gopkg.in/alecthomas/kingpin.v2"
)

func TestFlags(t *testing.T) {
	a := kingpin.New(t.Name(), "")
	c := log.AddFlags(a)
	_, err := a.Parse([]string{
		"--" + log.LevelFlagName, "error",
		"--" + log.FormatFlagName, "json",
	})
	assert.NoError(t, err)
	assert.Equal(t, "error", c.Level.String())
	assert.Equal(t, "json", c.Format.String())
}

func TestEnvarFlags(t *testing.T) {
	err := os.Setenv(log.LevelFlagEnvar, "debug")
	require.NoError(t, err)
	defer func() { _ = os.Unsetenv(log.LevelFlagEnvar) }()
	err = os.Setenv(log.FormatFlagEnvar, "json")
	require.NoError(t, err)
	defer func() { _ = os.Unsetenv(log.FormatFlagEnvar) }()
	a := kingpin.New(t.Name(), "")
	c := log.AddFlags(a)
	_, err = a.Parse(nil)
	assert.NoError(t, err)
	assert.Equal(t, "debug", c.Level.String())
	assert.Equal(t, "json", c.Format.String())
}

func TestBadFlags(t *testing.T) {
	t.Run("Level", func(t *testing.T) {
		a := kingpin.New(t.Name(), "")
		_ = log.AddFlags(a)
		_, err := a.Parse([]string{
			"--" + log.LevelFlagName, "fatal",
		})
		assert.EqualError(t, err, `unrecognized level: "fatal"`)
	})
	t.Run("Format", func(t *testing.T) {
		a := kingpin.New(t.Name(), "")
		_ = log.AddFlags(a)
		_, err := a.Parse([]string{
			"--" + log.FormatFlagName, "fmt",
		})
		assert.EqualError(t, err, `unrecognized format: "fmt"`)
	})
}
