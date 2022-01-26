// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package models

type AddPropertyTypeValueInput struct {
	ID                 *int                         `json:"id"`
	Name               string                       `json:"name"`
	PropertyType       int                          `json:"propertyType"`
	PropertyTypeValue  *int                         `json:"propertyTypeValue"`
	PropertyTypeValues []*AddPropertyTypeValueInput `json:"propertyTypeValues"`
}
