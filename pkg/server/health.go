// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package server

import (
	"context"
	"fmt"
	"net/http"
	"path"
	"time"

	"go.uber.org/zap"
)

// health poller allows applications that use health checks to wait for the entire service to be ready
type HealthPoller interface {
	Wait(ctx context.Context) error
}

// The HealthPollerFunc type is an adapter to allow the use of
// ordinary functions as health poller.
type HealthPollerFunc func(context.Context) error

// Wait returns f(ctx).
func (f HealthPollerFunc) Wait(ctx context.Context) error {
	return f(ctx)
}

type healthPoller struct {
	logger *zap.Logger
}

func NewHealthPoller(logger *zap.Logger) HealthPoller {
	return healthPoller{logger}
}

func (p healthPoller) checkHealthy() error {
	rsp, err := http.DefaultClient.Get(
		fmt.Sprintf("http://localhost/%s", path.Join(healthURI, readinessURI)))
	if err != nil {
		return fmt.Errorf("failed to GET readiness check: %w", err)
	}
	defer rsp.Body.Close()
	if rsp.StatusCode != http.StatusOK {
		return fmt.Errorf("service is not healthy: %w", err)
	}
	return nil
}

func (p healthPoller) Wait(ctx context.Context) error {
	ticker := time.NewTicker(250 * time.Millisecond)
	defer func() {
		ticker.Stop()
	}()
	p.logger.Info("waiting for health checks")
	for {
		select {
		case <-ctx.Done():
			return fmt.Errorf("waiting for health check interrupted: %w", ctx.Err())
		case <-ticker.C:
			err := p.checkHealthy()
			if err == nil {
				return nil
			}
			p.logger.Warn("health check failed: %w", zap.Error(err))
		}
	}
}
