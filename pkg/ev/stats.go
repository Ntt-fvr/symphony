// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package ev

import (
	"go.opencensus.io/stats"
	"go.opencensus.io/stats/view"
	"go.opencensus.io/tag"
)

// Event measurements.
var (
	EventEmittedTotal = stats.Int64(
		"ev/events_emitted_total",
		"Number of emitted events",
		stats.UnitDimensionless,
	)
	EventEmitErrorTotal = stats.Int64(
		"ev/events_emit_errors_total",
		"Number of emission errors",
		stats.UnitDimensionless,
	)
	EventOpenReceiverTotal = stats.Int64(
		"ev/open_receivers_total",
		"Number of open receivers",
		stats.UnitDimensionless,
	)
	EventReceivedTotal = stats.Int64(
		"ev/events_received_total",
		"Number of received event",
		stats.UnitDimensionless,
	)
	EventReceiveErrorTotal = stats.Int64(
		"ev/event_receive_errors_total",
		"Number of receive errors",
		stats.UnitDimensionless,
	)
	EventReceiveFilteredTotal = stats.Int64(
		"ev/event_receive_filtered_total",
		"Number of filtered events",
		stats.UnitDimensionless,
	)
)

// Event atomic counters.
var (
	EventOpenReceiverCount int64
)

// Event tag keys.
var (
	// KeyEventTenant is the event tenant name.
	KeyEventTenant = tag.MustNewKey("tenant")
	// KeyEventName is the event name.
	KeyEventName = tag.MustNewKey("event")
)

// Event views.
var (
	EventEmittedTotalView = &view.View{
		Name:        EventEmittedTotal.Name(),
		Description: EventEmittedTotal.Description(),
		TagKeys:     []tag.Key{KeyEventTenant, KeyEventName},
		Measure:     EventEmittedTotal,
		Aggregation: view.Count(),
	}
	EventEmitErrorTotalView = &view.View{
		Name:        EventEmitErrorTotal.Name(),
		Description: EventEmitErrorTotal.Description(),
		TagKeys:     []tag.Key{KeyEventTenant, KeyEventName},
		Measure:     EventEmitErrorTotal,
		Aggregation: view.Count(),
	}
	EventOpenReceiverTotalView = &view.View{
		Name:        EventOpenReceiverTotal.Name(),
		Description: EventOpenReceiverTotal.Description(),
		Measure:     EventOpenReceiverTotal,
		Aggregation: view.LastValue(),
	}
	EventReceivedTotalView = &view.View{
		Name:        EventReceivedTotal.Name(),
		Description: EventReceivedTotal.Description(),
		TagKeys:     []tag.Key{KeyEventTenant, KeyEventName},
		Measure:     EventReceivedTotal,
		Aggregation: view.Count(),
	}
	EventReceiveErrorTotalView = &view.View{
		Name:        EventReceiveErrorTotal.Name(),
		Description: EventReceiveErrorTotal.Description(),
		Measure:     EventReceiveErrorTotal,
		Aggregation: view.Count(),
	}
	EventReceiveFilteredTotalView = &view.View{
		Name:        EventReceiveFilteredTotal.Name(),
		Description: EventReceiveFilteredTotal.Description(),
		Measure:     EventReceiveFilteredTotal,
		Aggregation: view.Count(),
	}
)
