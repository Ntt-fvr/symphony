package gqlutil_test

import (
	"testing"

	"github.com/99designs/gqlgen/graphql"
	"github.com/facebookincubator/symphony/pkg/gqlutil"
	"github.com/stretchr/testify/require"
)

func TestNewServer(t *testing.T) {
	srv := gqlutil.NewServer(&graphql.ExecutableSchemaMock{})
	require.NotNil(t, srv)
}
