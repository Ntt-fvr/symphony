package gqlutil

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebookincubator/symphony/pkg/log"
	"go.uber.org/zap"
)

// RecoverFunc returns a graphql recovery function.
func RecoverFunc(logger log.Logger) graphql.RecoverFunc {
	return func(ctx context.Context, err interface{}) error {
		logger.For(ctx).Error("graphql panic recovery",
			zap.Any("error", err),
			zap.Stack("stack"),
		)
		return errors.New("internal system error")
	}
}
