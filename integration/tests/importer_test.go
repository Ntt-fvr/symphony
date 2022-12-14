// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//go:build integration
// +build integration

package tests

/*func TestImportLocations(t *testing.T) {
	organization := uuid.New().String()
	c := newClient(t, organization, testUser)

	c.log.Debug("adding location types")
	addLocationTypes(t, c)

	c.log.Debug("importing locations")
	importLocations(t, organization, testUser, "ExampleLocation.csv")

	c.log.Debug("loading locations")
	locations, err := c.QueryLocations()
	require.NoError(t, err)
	c.log.Debug("loaded locations",
		zap.Int("count", len(locations.Edges)),
	)

	var casesFound int
	for i := range locations.Edges {
		node := locations.Edges[i].Node
		casesFound++
		c.log.Debug("inspecting node", zap.String("name", string(node.Name)))
		switch node.Name {
		case "Houston":
			require.Len(t, node.Children, 5)
			require.EqualValues(t, "Texas", node.Parent.Name)
		case "F1":
			require.NotZero(t, len(node.Properties))
			property := node.Properties[0]
			require.EqualValues(t, "200 sq ft", property.Value)
			require.EqualValues(t, "Floor Size", property.Type.Name)
			require.Empty(t, node.Children)
			require.EqualValues(t, "2392 S Wayside D", node.Parent.Name)
		case "C001":
			require.NotZero(t, len(node.Properties))
			property := node.Properties[0]
			require.EqualValues(t, "Room Owner", property.Type.Name)
			require.EqualValues(t, "Elaine", property.Value)
			require.EqualValues(t, "F2", node.Parent.Name)
		default:
			casesFound--
		}
	}
	require.Equal(t, 3, casesFound)
}

func TestImportLocationsEdit(t *testing.T) {
	organization := uuid.New().String()
	c := newClient(t, organization, testUser)

	c.log.Debug("adding location types")
	addLocationTypes(t, c)

	c.log.Debug("importing locations[1]")
	importLocations(t, organization, testUser, "ExampleLocation.csv")
	importLocations(t, organization, testUser, "EditLocation.csv")

	c.log.Debug("loading locations")
	locations, err := c.QueryLocations()
	require.NoError(t, err)
	c.log.Debug("loaded locations",
		zap.Int("count", len(locations.Edges)),
	)

	var casesFound int
	for i := range locations.Edges {
		node := locations.Edges[i].Node
		casesFound++
		c.log.Debug("inspecting node", zap.String("name", string(node.Name)))
		switch node.Name {
		case "2391 S Wayside D":
			require.EqualValues(t, "id1", node.ExternalID)
			require.EqualValues(t, 34, node.Latitude)
			require.EqualValues(t, 35, node.Longitude)
		case "F1":
			require.NotZero(t, len(node.Properties))
			property := node.Properties[0]
			require.EqualValues(t, "300 sq ft", property.Value)
			require.EqualValues(t, "id2", node.ExternalID)
			require.EqualValues(t, 66, node.Latitude)
			require.EqualValues(t, 67, node.Longitude)
			require.Empty(t, node.Children)
		default:
			casesFound--
		}
	}
	require.Equal(t, 2, casesFound)
}

func importLocations(t *testing.T, organization, user, filename string) {
	var buf bytes.Buffer
	bw := multipart.NewWriter(&buf)

	file, err := os.Open("../../graph/importer/testdata/" + filename)
	require.Nil(t, err)

	fileWriter, err := bw.CreateFormFile("file_0", file.Name())
	require.Nil(t, err)

	_, err = io.Copy(fileWriter, file)
	require.Nil(t, err)

	contentType := bw.FormDataContentType()
	require.NoError(t, bw.Close())

	req, err := http.NewRequest(http.MethodPost, "http://graph/import/location", &buf)
	require.NoError(t, err)

	req.Header.Set("x-auth-organization", organization)
	req.Header.Set("x-auth-user-email", user)
	req.Header.Set("x-auth-user-role", "OWNER")
	req.Header.Set("Content-Type", contentType)

	rsp, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	rsp.Body.Close()
}

func addLocationTypes(t *testing.T, c *client) {
	types := []struct {
		name, property string
	}{
		{name: "Country"},
		{name: "State"},
		{name: "City"},
		{name: "Building"},
		{name: "Floor", property: "Floor Size"},
		{name: "Room", property: "Room Owner"},
	}
	for _, typ := range types {
		if typ.property == "" {
			_, err := c.addLocationType(typ.name)
			require.NoError(t, err)
		} else {
			_, err := c.addLocationType(typ.name, &pkgmodels.PropertyTypeInput{
				Name: typ.property,
				Type: propertytype.TypeString,
			})
			require.NoError(t, err)
		}
	}
}*/
