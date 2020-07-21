// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql

// Annotation annotates fields with metadata for templates.
type Annotation struct {
	// OrderField is the ordering field as defined in graphql schema.
	OrderField string
}

// Name implements ent.Annotation interface.
func (Annotation) Name() string {
	return "EntGQL"
}
