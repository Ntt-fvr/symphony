package migrations

import (
	"context"
	"fmt"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/zap"
)

func MigrateSample(ctx context.Context, logger log.Logger) error {
	client := ent.FromContext(ctx)
	group, err := client.UsersGroup.
		Create().
		SetName("Write Permission").
		Save(ctx)
	if err != nil {
		return fmt.Errorf("cannot create users group: %w", err)
	}
	logger.For(ctx).Info("users group created", zap.Int("ID", group.ID))
	return nil
}
