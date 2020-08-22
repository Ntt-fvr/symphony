// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package entgql

// Annotation annotates fields and edges with metadata for templates.
type Annotation struct {
	// OrderField is the ordering field as defined in graphql schema.
	OrderField string
	// Bind implies the edge field name in graphql schema is
	// equivalent to the name used in graphql schema.
	Bind bool
	// Mapping is the edge field names as defined in graphql schema.
	Mapping []string
}

// Name implements ent.Annotation interface.
func (Annotation) Name() string {
	return "EntGQL"
}

// OrderField returns an order field annotation.
func OrderField(name string) Annotation {
	return Annotation{OrderField: name}
}

// Bind returns a binding annotation.
func Bind() Annotation {
	return Annotation{Bind: true}
}

// MapsTo returns a mapping annotation.
func MapsTo(names ...string) Annotation {
	return Annotation{Mapping: names}
}
