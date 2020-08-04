// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ocpubsub_test

import (
	"context"
	"testing"
	"time"

	"github.com/facebookincubator/symphony/pkg/telemetry/ocpubsub"
	"github.com/stretchr/testify/require"
	"go.opencensus.io/stats/view"
	"gocloud.dev/pubsub"
	"gocloud.dev/pubsub/mempubsub"
)

func TestMetrics(t *testing.T) {
	views := ocpubsub.DefaultViews
	err := view.Register(views...)
	require.NoError(t, err)
	defer view.Unregister(views...)

	pstopic := mempubsub.NewTopic()
	topic := ocpubsub.NewMetricsTopic(pstopic)
	subscription := ocpubsub.NewMetricsSubscription(
		mempubsub.NewSubscription(pstopic, time.Second),
	)

	ctx := context.Background()
	err = topic.Send(ctx, &pubsub.Message{Body: []byte("foobar")})
	require.NoError(t, err)
	msg, err := subscription.Receive(ctx)
	require.NoError(t, err)
	require.Equal(t, []byte("foobar"), msg.Body)

	for _, v := range views {
		v := view.Find(v.Name)
		require.NotNil(t, v)

		rows, err := view.RetrieveData(v.Name)
		require.NoError(t, err)
		if v.Name == ocpubsub.MessagesErrorTotalView.Name {
			continue
		}
		require.NotEmpty(t, rows, "no data on view %q", v.Name)

		switch data := rows[0].Data.(type) {
		case *view.CountData:
			require.Greater(t, data.Value, int64(0))
		case *view.DistributionData:
			require.Greater(t, data.Sum(), float64(0))
		default:
			require.Failf(t, "unknown data type", "type=%T", data)
		}
	}
}
