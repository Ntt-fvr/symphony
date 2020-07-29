// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/resolver"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/project"
	"github.com/facebookincubator/symphony/pkg/ent/projecttype"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/zap"
)

func MigrateProjectTemplates(ctx context.Context, logger log.Logger) error {

	client := ent.FromContext(ctx)
	projectIds, err := client.Project.Query().
		Where(project.Not(project.HasTemplate())).
		IDs(ctx)
	if err != nil {
		return fmt.Errorf("failed to query project ids: %w", err)
	}
	logger.For(ctx).Info("projects with no templates", zap.Int("count", len(projectIds)))
	for _, projectID := range projectIds {
		projectTypeID, err := client.ProjectType.Query().
			Where(projecttype.HasProjectsWith(project.ID(projectID))).
			OnlyID(ctx)
		if err != nil {
			return fmt.Errorf("failed to query project type: %w", err)
		}
		projectTemplate, typeToType, err := resolver.AddProjectTemplate(ctx, client, projectTypeID)
		if err != nil {
			return fmt.Errorf("failed to create project template: %w", err)
		}
		err = client.Project.UpdateOneID(projectID).
			SetTemplate(projectTemplate).
			Exec(ctx)
		if err != nil {
			return fmt.Errorf("failed to attach template to project: %w", err)
		}
		properties, err := client.Project.Query().
			Where(project.ID(projectID)).
			QueryProperties().
			WithType().
			All(ctx)
		if err != nil {
			return fmt.Errorf("failed to query properties: %w", err)
		}
		for _, p := range properties {
			pTypeID := p.Edges.Type.ID
			newTypeID, ok := typeToType[pTypeID]
			if !ok {
				return fmt.Errorf("failed to get new property type id")
			}
			err = client.Property.UpdateOne(p).
				SetTypeID(newTypeID).
				Exec(ctx)
			if err != nil {
				return fmt.Errorf("failed to set new type of property: %w", err)
			}
		}
	}
	return nil
}
