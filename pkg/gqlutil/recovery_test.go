package gqlutil_test

import (
	"context"
	"testing"

	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/facebookincubator/symphony/pkg/log/logtest"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func TestRecoverFunc(t *testing.T) {
	logger, observer := logtest.NewTestLogger(t).WithObserver(zap.ErrorLevel)
	err := gqlutil.RecoverFunc(logger)(context.Background(), "oh no")
	require.Equal(t, 1, observer.
		FilterMessage("graphql panic recovery").
		FilterField(zap.String("error", "oh no")).Len())
	require.EqualError(t, err, "internal system error")
}
