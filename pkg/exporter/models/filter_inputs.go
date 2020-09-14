// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package models

import (
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
)

type LocationFilterInput struct {
	FilterType    enum.LocationFilterType `json:"filterType"`
	Operator      enum.FilterOperator     `json:"operator"`
	BoolValue     *bool                   `json:"boolValue"`
	StringValue   *string                 `json:"stringValue"`
	PropertyValue *PropertyTypeInput      `json:"propertyValue"`
	IDSet         []int                   `json:"idSet"`
	StringSet     []string                `json:"stringSet"`
	MaxDepth      *int                    `json:"maxDepth"`
}

type EquipmentFilterInput struct {
	FilterType    enum.EquipmentFilterType `json:"filterType"`
	Operator      enum.FilterOperator      `json:"operator"`
	StringValue   *string                  `json:"stringValue"`
	PropertyValue *PropertyTypeInput       `json:"propertyValue"`
	IDSet         []int                    `json:"idSet"`
	StringSet     []string                 `json:"stringSet"`
	MaxDepth      *int                     `json:"maxDepth"`
}

type PortFilterInput struct {
	FilterType    enum.PortFilterType `json:"filterType"`
	Operator      enum.FilterOperator `json:"operator"`
	BoolValue     *bool               `json:"boolValue"`
	StringValue   *string             `json:"stringValue"`
	PropertyValue *PropertyTypeInput  `json:"propertyValue"`
	IDSet         []int               `json:"idSet"`
	StringSet     []string            `json:"stringSet"`
	MaxDepth      *int                `json:"maxDepth"`
}

type LinkFilterInput struct {
	FilterType    enum.LinkFilterType `json:"filterType"`
	Operator      enum.FilterOperator `json:"operator"`
	StringValue   *string             `json:"stringValue"`
	PropertyValue *PropertyTypeInput  `json:"propertyValue"`
	IDSet         []int               `json:"idSet"`
	StringSet     []string            `json:"stringSet"`
	MaxDepth      *int                `json:"maxDepth"`
}
