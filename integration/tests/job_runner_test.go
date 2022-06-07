// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//go:build integration
// +build integration

package tests

/*func TestJobRun(t *testing.T) {
	configs := []*struct {
		client         *client
		deleted        bool
		locationTypeID graphql.ID
	}{
		{deleted: true},
		{deleted: true},
		{deleted: false},
	}
	for _, config := range configs {
		organization := uuid.New().String()
		c := newClient(t, organization, testUser)
		name := "location_type_" + uuid.New().String()
		typ, err := c.addLocationType(name, &models.PropertyTypeInput{
			Name:      "Property",
			Type:      "string",
			IsDeleted: pointer.ToBool(config.deleted),
		})
		require.NoError(t, err)
		require.Len(t, typ.PropertyTypes, 1)
		config.client = c
		config.locationTypeID = typ.ID
	}
	err := (&jobrunner.Cmd{
		GraphHost: "graph",
		AdminHost: "admin",
		Jobs:      []string{"gc"},
	}).Run(context.Background())
	require.NoError(t, err)
	for _, config := range configs {
		typ, err := config.client.queryLocationType(config.locationTypeID)
		require.NoError(t, err)
		expectedAmount := 1
		if config.deleted {
			expectedAmount = 0
		}
		require.Len(t, typ.PropertyTypes, expectedAmount)
	}
}*/
