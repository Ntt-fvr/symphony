// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package log_test

import (
	"os"
	"testing"

	"github.com/facebookincubator/symphony/pkg/log"
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
	require.NoError(t, err)
	require.Equal(t, "error", c.Level.String())
	require.Equal(t, "json", c.Format)
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
	require.NoError(t, err)
	require.Equal(t, "debug", c.Level.String())
	require.Equal(t, "json", c.Format)
}

func TestBadFlags(t *testing.T) {
	t.Run("Level", func(t *testing.T) {
		a := kingpin.New(t.Name(), "")
		_ = log.AddFlags(a)
		_, err := a.Parse([]string{
			"--" + log.LevelFlagName, "foobar",
		})
		require.EqualError(t, err, `unrecognized level: "foobar"`)
	})
	t.Run("Format", func(t *testing.T) {
		a := kingpin.New(t.Name(), "")
		_ = log.AddFlags(a)
		_, err := a.Parse([]string{
			"--" + log.FormatFlagName, "fmt",
		})
		require.EqualError(t, err, `enum value must be one of console,json, got 'fmt'`)
	})
}
