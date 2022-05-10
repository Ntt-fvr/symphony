// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package models

type ParentPropertyValueInput struct {
	ParentPropertyTypeValue string `json:"parentPropertyTypeValue"`
	ParentPropertyType      int    `json:"parentPropertyType"`
}
