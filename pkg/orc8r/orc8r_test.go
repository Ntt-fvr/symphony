// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package orc8r_test

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"testing"

	"github.com/alecthomas/kong"
	"github.com/facebookincubator/symphony/pkg/orc8r"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestFixedHostTransport(t *testing.T) {
	srv := httptest.NewTLSServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))
	defer srv.Close()

	u, err := url.Parse(srv.URL)
	require.NoError(t, err)
	client := srv.Client()
	client.Transport = &orc8r.Transport{
		Base: client.Transport,
		Host: u.Host,
	}

	req, err := http.NewRequest(http.MethodGet, "/", nil)
	require.NoError(t, err)
	rsp, err := client.Do(req)
	require.NoError(t, err)
	defer rsp.Body.Close()
	assert.Equal(t, http.StatusOK, rsp.StatusCode)
}

func TestFlags(t *testing.T) {
	f, err := ioutil.TempFile("", t.Name())
	require.NoError(t, err)
	defer func() { _ = os.Remove(f.Name()) }()

	var cfg orc8r.Config
	parser, err := kong.New(&cfg)
	require.NoError(t, err)
	const host = "localtest.me"
	_, err = parser.Parse([]string{
		"--orc8r.host", host,
		"--orc8r.cert", f.Name(),
		"--orc8r.pkey", f.Name(),
	})
	require.NoError(t, err)
	assert.Equal(t, host, cfg.Host)
	assert.Equal(t, f.Name(), cfg.Cert)
	assert.Equal(t, f.Name(), cfg.PKey)
}
