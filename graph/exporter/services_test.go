// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/importer"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/service"
	"github.com/facebookincubator/symphony/pkg/ent/serviceendpointdefinition"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	"github.com/facebookincubator/symphony/pkg/viewer/viewertest"
	"github.com/stretchr/testify/require"
)

type servicesFilterInput struct {
	Name          enum.ServiceFilterType      `json:"name"`
	Operator      enum.FilterOperator         `jsons:"operator"`
	StringValue   string                      `json:"stringValue"`
	IDSet         []string                    `json:"idSet"`
	StringSet     []string                    `json:"stringSet"`
	PropertyValue pkgmodels.PropertyTypeInput `json:"propertyValue"`
}

const (
	serviceNameTitle        = "Service Name"
	serviceTypeTitle        = "Service Type"
	discoveryMethodTitle    = "Discovery Method"
	serviceExternalIDTitle  = "Service External ID"
	customerNameTitle       = "Customer Name"
	customerExternalIDTitle = "Customer External ID"
	statusTitle             = "Status"
	strPropTitle            = "service_str_prop"
	intPropTitle            = "service_int_prop"
	boolPropTitle           = "service_bool_prop"
	floatPropTitle          = "service_float_prop"
)

var endpointHeader = [...]string{"Endpoint Definition 1", "Location 1", "Equipment 1",
	"Endpoint Definition 2", "Location 2", "Equipment 2", "Endpoint Definition 3", "Location 3", "Equipment 3",
	"Endpoint Definition 4", "Location 4", "Equipment 4", "Endpoint Definition 5", "Location 5", "Equipment 5",
}

func preparePropertyTypes() []*pkgmodels.PropertyTypeInput {
	serviceStrPropType := pkgmodels.PropertyTypeInput{
		Name:        strPropTitle,
		Type:        "string",
		StringValue: pointer.ToString("Foo is the best"),
	}
	serviceIntPropType := pkgmodels.PropertyTypeInput{
		Name: intPropTitle,
		Type: "int",
	}
	serviceBoolPropType := pkgmodels.PropertyTypeInput{
		Name: boolPropTitle,
		Type: "bool",
	}
	serviceFloatPropType := pkgmodels.PropertyTypeInput{
		Name: floatPropTitle,
		Type: "float",
	}

	return []*pkgmodels.PropertyTypeInput{
		&serviceStrPropType,
		&serviceIntPropType,
		&serviceBoolPropType,
		&serviceFloatPropType,
	}
}

func prepareServiceData(ctx context.Context, t *testing.T, r importer.TestExporterResolver) {
	mr := r.Mutation()

	serviceType1, err := mr.AddServiceType(ctx, models.ServiceTypeCreateData{Name: "L2 Service", HasCustomer: false})
	require.NoError(t, err)
	locType, err := mr.AddLocationType(ctx, models.AddLocationTypeInput{
		Name: "locType1",
	})
	require.NoError(t, err)
	loc1, err := mr.AddLocation(ctx, models.AddLocationInput{
		Name: "loc1",
		Type: locType.ID,
	})
	require.NoError(t, err)
	portTypes := []*models.EquipmentPortInput{
		{
			Name: "p1",
		},
		{
			Name: "p2",
		},
	}
	equipType, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "etype1",
		Ports: portTypes,
	})
	require.NoError(t, err)

	equipType2, err := mr.AddEquipmentType(ctx, models.AddEquipmentTypeInput{
		Name:  "etype2",
		Ports: portTypes,
	})
	require.NoError(t, err)
	serviceType2, err := mr.AddServiceType(ctx, models.ServiceTypeCreateData{
		Name:        "L3 Service",
		HasCustomer: true,
		Properties:  preparePropertyTypes(),
		Endpoints: []*models.ServiceEndpointDefinitionInput{
			{
				Name:            "endpoint type1",
				Role:            pointer.ToString("CONSUMER"),
				Index:           0,
				EquipmentTypeID: equipType.ID,
			},
			{
				Index:           1,
				Name:            "endpoint type2",
				Role:            pointer.ToString("PROVIDER"),
				EquipmentTypeID: equipType2.ID,
			},
		}})
	require.NoError(t, err)

	strType, _ := serviceType2.QueryPropertyTypes().Where(propertytype.Name(strPropTitle)).Only(ctx)
	intType, _ := serviceType2.QueryPropertyTypes().Where(propertytype.Name(intPropTitle)).Only(ctx)
	boolType, _ := serviceType2.QueryPropertyTypes().Where(propertytype.Name(boolPropTitle)).Only(ctx)
	floatType, _ := serviceType2.QueryPropertyTypes().Where(propertytype.Name(floatPropTitle)).Only(ctx)

	customer1, err := mr.AddCustomer(ctx, models.AddCustomerInput{
		Name:       "Customer 1",
		ExternalID: pointer.ToString("AD123"),
	})
	require.NoError(t, err)

	customer2, err := mr.AddCustomer(ctx, models.AddCustomerInput{
		Name: "Customer 2",
	})
	require.NoError(t, err)

	_, err = mr.AddService(ctx, models.ServiceCreateData{
		Name:          "L2 S1",
		ExternalID:    pointer.ToString("XS542"),
		ServiceTypeID: serviceType1.ID,
		Status:        service.StatusInService,
	})
	require.NoError(t, err)

	strProp := models.PropertyInput{
		PropertyTypeID: strType.ID,
		StringValue:    pointer.ToString("Foo"),
	}
	intProp := models.PropertyInput{
		PropertyTypeID: intType.ID,
		IntValue:       pointer.ToInt(10),
	}

	boolProp := models.PropertyInput{
		PropertyTypeID: boolType.ID,
		BooleanValue:   pointer.ToBool(false),
	}

	floatProp := models.PropertyInput{
		PropertyTypeID: floatType.ID,
		FloatValue:     pointer.ToFloat64(3.5),
	}

	_, err = mr.AddService(ctx, models.ServiceCreateData{
		Name:          "L3 S1",
		ServiceTypeID: serviceType2.ID,
		CustomerID:    &customer1.ID,
		Properties:    []*models.PropertyInput{&strProp, &intProp, &boolProp},
		Status:        service.StatusMaintenance,
	})
	require.NoError(t, err)

	s2, err := mr.AddService(ctx, models.ServiceCreateData{
		Name:          "L3 S2",
		ServiceTypeID: serviceType2.ID,
		CustomerID:    &customer2.ID,
		Properties:    []*models.PropertyInput{&floatProp},
		Status:        service.StatusDisconnected,
	})
	require.NoError(t, err)
	e1, err := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "e1",
		Type:     equipType.ID,
		Location: pointer.ToInt(loc1.ID),
	})
	require.NoError(t, err)
	e2, err := mr.AddEquipment(ctx, models.AddEquipmentInput{
		Name:     "e2",
		Type:     equipType2.ID,
		Location: pointer.ToInt(loc1.ID),
	})
	require.NoError(t, err)

	_, err = mr.AddServiceEndpoint(ctx, models.AddServiceEndpointInput{
		ID:          s2.ID,
		PortID:      nil,
		EquipmentID: e1.ID,
		Definition:  serviceType2.QueryEndpointDefinitions().Where(serviceendpointdefinition.Index(0)).OnlyIDX(ctx),
	})
	require.NoError(t, err)
	_, err = mr.AddServiceEndpoint(ctx, models.AddServiceEndpointInput{
		ID:          s2.ID,
		PortID:      nil,
		EquipmentID: e2.ID,
		Definition:  serviceType2.QueryEndpointDefinitions().Where(serviceendpointdefinition.Index(1)).OnlyIDX(ctx),
	})
	require.NoError(t, err)
}

func TestEmptyServicesDataExport(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log

	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.ServicesRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)

	viewertest.SetDefaultViewerHeaders(req)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	reader := csv.NewReader(res.Body)
	head := append([]string{"\ufeffService ID",
		serviceNameTitle,
		serviceTypeTitle,
		discoveryMethodTitle,
		serviceExternalIDTitle,
		customerNameTitle,
		customerExternalIDTitle,
		statusTitle,
	},
		endpointHeader[:]...)
	for {
		ln, err := reader.Read()
		if err == io.EOF {
			break
		}
		require.NoError(t, err, "error reading row")
		require.EqualValues(t, head, ln)
	}
}

func TestServicesExport(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log

	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.ServicesRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	ctx := viewertest.NewContext(context.Background(), r.Client)
	prepareServiceData(ctx, t, *r)
	require.NoError(t, err)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()
	head := append([]string{"\ufeffService ID",
		serviceNameTitle,
		serviceTypeTitle,
		discoveryMethodTitle,
		serviceExternalIDTitle,
		customerNameTitle,
		customerExternalIDTitle,
		statusTitle,
	},
		endpointHeader[:]...)

	reader := csv.NewReader(res.Body)
	for {
		ln, err := reader.Read()
		if err == io.EOF {
			break
		}
		require.NoError(t, err, "error reading row")
		switch {
		case ln[1] == serviceNameTitle:
			require.EqualValues(t, append(head, []string{
				strPropTitle,
				intPropTitle,
				boolPropTitle,
				floatPropTitle,
			}...), ln)
		case ln[1] == "L2 S1":
			require.EqualValues(t, ln[1:8], []string{
				"L2 S1",
				"L2 Service",
				"MANUAL",
				"XS542",
				"",
				"",
				service.StatusInService.String(),
			})
		case ln[1] == "L3 S1":
			require.EqualValues(t, ln[1:], []string{
				"L3 S1",
				"L3 Service",
				"MANUAL",
				"",
				"Customer 1",
				"AD123",
				service.StatusMaintenance.String(),
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"Foo",
				"10",
				"false",
				"",
			})
		case ln[1] == "L3 S2":
			require.EqualValues(t, ln[1:], []string{
				"L3 S2",
				"L3 Service",
				"MANUAL",
				"",
				"Customer 2",
				"",
				service.StatusDisconnected.String(),
				"endpoint type1",
				"loc1",
				"e1",
				"endpoint type2",
				"loc1",
				"e2",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"Foo is the best",
				"",
				"",
				"3.500",
			})
		default:
			require.Fail(t, "line does not match")
		}
	}
}

func TestServiceWithFilters(t *testing.T) {
	r := importer.NewExporterTestResolver(t)
	log := r.Exporter.Log

	e := &pkgexporter.Exporter{Log: log, Rower: pkgexporter.ServicesRower{Log: log}}
	th := viewertest.TestHandler(t, e, r.Client)
	server := httptest.NewServer(th)
	defer server.Close()

	req, err := http.NewRequest(http.MethodGet, server.URL, nil)
	require.NoError(t, err)
	viewertest.SetDefaultViewerHeaders(req)

	ctx := viewertest.NewContext(context.Background(), r.Client)
	prepareServiceData(ctx, t, *r)
	require.NoError(t, err)
	res, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	defer res.Body.Close()

	f1, err := json.Marshal([]servicesFilterInput{
		{
			Name:        enum.ServiceFilterTypeServiceInstCustomerName,
			Operator:    enum.FilterOperatorContains,
			StringValue: "Customer 1",
		},
	})
	require.NoError(t, err)
	f2, err := json.Marshal([]servicesFilterInput{
		{
			Name:        enum.ServiceFilterTypeServiceInstExternalID,
			Operator:    enum.FilterOperatorIs,
			StringValue: "XS542",
		},
	})
	require.NoError(t, err)

	for i, filter := range [][]byte{f1, f2} {
		req, err := http.NewRequest("GET", server.URL, nil)
		require.NoError(t, err)
		viewertest.SetDefaultViewerHeaders(req)

		q := req.URL.Query()
		q.Add("filters", string(filter))
		req.URL.RawQuery = q.Encode()

		res, err := http.DefaultClient.Do(req)
		require.NoError(t, err)

		reader := csv.NewReader(res.Body)
		linesCount := 0
		for {
			ln, err := reader.Read()
			if err == io.EOF {
				break
			}
			linesCount++
			require.NoError(t, err, "error reading row")
			if i == 0 {
				if ln[1] != serviceNameTitle {
					require.EqualValues(t, ln[1:], []string{
						"L3 S1",
						"L3 Service",
						"MANUAL",
						"",
						"Customer 1",
						"AD123",
						service.StatusMaintenance.String(),
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"Foo",
						"10",
						"false",
						"",
					})
				}
			}
			if i == 1 {
				if ln[1] != serviceNameTitle {
					require.EqualValues(t, ln[1:], []string{
						"L2 S1",
						"L2 Service",
						"MANUAL",
						"XS542",
						"",
						"",
						service.StatusInService.String(),
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
						"",
					})
				}
			}
		}
		err = res.Body.Close()
		require.NoError(t, err)
	}
}

func TestServicesAsyncExport(t *testing.T) {
	testAsyncExport(t, exporttask.TypeService)
}
