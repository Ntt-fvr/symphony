// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//go:generate protoc --go_out=plugins=grpc,paths=source_relative:. rpc.proto
//go:generate go run github.com/vektra/mockery/cmd/mockery -all -case underscore
//go:generate go run github.com/google/addlicense -c Facebook -y 2004-present -l bsd ./

package schema
