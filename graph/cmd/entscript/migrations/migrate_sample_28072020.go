package migrations

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/graph/graphql/generated"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/zap"
)

func MigrateSample(ctx context.Context, r generated.ResolverRoot, logger log.Logger) error {
	client := ent.FromContext(ctx)
	eqt, err := r.Mutation().AddEquipmentType(ctx, models.AddEquipmentTypeInput{Name: "My new type"})
	if err != nil {
		return fmt.Errorf("cannot create equipment type: %w", err)
	}
	logger.For(ctx).Info("equipment created", zap.Int("ID", eqt.ID))
	err = client.EquipmentType.UpdateOneID(eqt.ID).SetName("My new type 2").Exec(ctx)
	if err != nil {
		return fmt.Errorf("cannot update equipment type: id=%q, %w", eqt.ID, err)
	}
	return nil
}
