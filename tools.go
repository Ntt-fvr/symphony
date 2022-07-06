//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/google/addlicense"
	_ "github.com/google/wire/cmd/wire"
	_ "github.com/confluentinc/confluent-kafka-go/kafka"
)
