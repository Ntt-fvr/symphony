// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/domain"
	"go.uber.org/zap"
)

func MigrateTechs(ctx context.Context, logger *zap.Logger) error {
	getConfig()
	client := ent.FromContext(ctx)
	for _, tech := range Config.Teches {

		domain, errDomain := client.Domain.Query().Where(domain.NameEQ(tech.Domain)).FirstID(ctx)
		if errDomain != nil {
			logger.Error("cannot create users tech: %w", zap.Error(errDomain))
			continue
		}
		logger.Info("Domain: ", zap.Int("ID Domain", domain))

		techDB, err := client.Tech.
			Create().
			SetName(tech.Name).
			SetDomainID(domain).
			Save(ctx)
		if err != nil {
			logger.Error("cannot create users tech: %w", zap.Error(err))
		}
		if techDB != nil {
			logger.Info("users tech created", zap.Int("ID", techDB.ID))
		}

	}
	return nil
}
