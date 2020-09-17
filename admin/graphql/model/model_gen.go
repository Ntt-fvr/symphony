// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

// An object with an ID.
type Node interface {
	IsNode()
}

// Input type of createTenant.
type CreateTenantInput struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
	// The name of the new tenant.
	Name string `json:"name"`
}

// Output type of createTenant.
type CreateTenantPayload struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
	// The new tenant.
	Tenant *Tenant `json:"tenant"`
}

// Input type of deleteTenant.
type DeleteTenantInput struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
	// The tenant id to delete.
	ID ID `json:"id"`
}

// Output type of deleteTenant.
type DeleteTenantPayload struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
}

// A tenant encapsulates a set of resources.
type Tenant struct {
	// The id of the tenant.
	ID ID `json:"id"`
	// The name of the tenant.
	Name string `json:"name"`
}

func (Tenant) IsNode() {}

// Input type of truncateTenant.
type TruncateTenantInput struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
	// The tenant name to truncate data for.
	Name string `json:"name"`
}

// Output type of truncateTenant.
type TruncateTenantPayload struct {
	// A unique identifier for the client performing the mutation.
	ClientMutationID *string `json:"clientMutationId"`
	// The truncated tenant.
	Tenant *Tenant `json:"tenant"`
}