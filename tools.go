//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/Khan/genqlient"
	_ "github.com/confluentinc/confluent-kafka-go/kafka"
	_ "github.com/google/addlicense"
	_ "github.com/google/wire/cmd/wire"
)
