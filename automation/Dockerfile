# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

# Multi stage application builder
FROM golang:1.17.5-alpine AS builder

# Install build tools
RUN apk add --no-cache git gcc musl-dev

# Setup go proxy
ARG GOPROXY=""
RUN go env -w GOPROXY=$GOPROXY

# Download dependencies
WORKDIR /src/symphony
COPY go.* ./
RUN go mod download

# Copy shared components
COPY pkg /src/symphony/pkg

# Build services
WORKDIR /src/symphony/automation
COPY automation .
RUN mkdir /build && go build -tags musl -o /build/automation ./main/main.go
COPY integration/conf/automation.env /build/

# Create deployable image
FROM alpine

# Install runtime requirements
RUN apk add --no-cache musl curl

# Copy artifacts from builder
COPY --from=builder /build/* /bin/

RUN export GIN_MODE=release

# Set exposed port and entrypoint
EXPOSE 8080
ENTRYPOINT ["/bin/automation"]
