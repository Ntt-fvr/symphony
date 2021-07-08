// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolver

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"sort"

	"github.com/AlekSi/pointer"
	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/equipment"
	"github.com/facebookincubator/symphony/pkg/ent/equipmentport"
	"github.com/facebookincubator/symphony/pkg/ent/link"
	"github.com/facebookincubator/symphony/pkg/ent/location"
	"github.com/facebookincubator/symphony/pkg/ent/locationtype"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/reportfilter"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/ent/service"
	"github.com/facebookincubator/symphony/pkg/ent/servicetype"
	pkgexporter "github.com/facebookincubator/symphony/pkg/exporter"
	pkgmodels "github.com/facebookincubator/symphony/pkg/exporter/models"
	actions2 "github.com/facebookincubator/symphony/pkg/flowengine/actions"
	"github.com/facebookincubator/symphony/pkg/flowengine/flowschema"
	"github.com/facebookincubator/symphony/pkg/flowengine/triggers"
	"github.com/facebookincubator/symphony/pkg/viewer"
)

type queryResolver struct{ resolver }

func (queryResolver) Me(ctx context.Context) (viewer.Viewer, error) {
	return viewer.FromContext(ctx), nil
}

func (r queryResolver) Node(ctx context.Context, id int) (ent.Noder, error) {
	return r.ClientFrom(ctx).Noder(ctx, id)
}

func (r queryResolver) ActionType(_ context.Context, id flowschema.ActionTypeID) (actions2.ActionType, error) {
	return r.flow.actionFactory.GetType(id)
}

func (r queryResolver) TriggerType(_ context.Context, id flowschema.TriggerTypeID) (triggers.TriggerType, error) {
	return r.flow.triggerFactory.GetType(id)
}

func (r queryResolver) LocationTypes(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.LocationTypeConnection, error) {
	return r.ClientFrom(ctx).LocationType.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Locations(
	ctx context.Context, onlyTopLevel *bool,
	types []int, name *string, needsSiteSurvey *bool,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.LocationOrder,
	filterBy []*pkgmodels.LocationFilterInput,
) (*ent.LocationConnection, error) {
	filter := func(query *ent.LocationQuery) (*ent.LocationQuery, error) {
		query, err := pkgexporter.LocationFilter(query, filterBy)
		if err != nil {
			return nil, err
		}
		if pointer.GetBool(onlyTopLevel) {
			query = query.Where(
				location.Not(
					location.HasParent(),
				),
			)
		}
		if name != nil {
			query = query.Where(
				location.NameContainsFold(*name),
			)
		}
		if len(types) > 0 {
			query = query.Where(
				location.HasTypeWith(
					locationtype.IDIn(types...),
				),
			)
		}
		if needsSiteSurvey != nil {
			query = query.Where(
				location.SiteSurveyNeeded(*needsSiteSurvey),
			)
		}
		return query, nil
	}
	return r.ClientFrom(ctx).
		Location.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithLocationOrder(orderBy),
			ent.WithLocationFilter(filter),
		)
}

func (r queryResolver) NearestSites(ctx context.Context, latitude, longitude float64, first int) ([]*ent.Location, error) {
	sites := r.ClientFrom(ctx).Location.Query().Where(location.HasTypeWith(locationtype.Site(true))).AllX(ctx)
	var lr locationResolver
	sort.Slice(sites, func(i, j int) bool {
		d1, _ := lr.DistanceKm(ctx, sites[i], latitude, longitude)
		d2, _ := lr.DistanceKm(ctx, sites[j], latitude, longitude)
		return d1 < d2
	})
	if len(sites) < first {
		return sites, nil
	}
	return sites[:first], nil
}

func (r queryResolver) EquipmentTypes(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.EquipmentTypeConnection, error) {
	return r.ClientFrom(ctx).EquipmentType.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) EquipmentPortTypes(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.EquipmentPortTypeConnection, error) {
	return r.ClientFrom(ctx).EquipmentPortType.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) EquipmentPortDefinitions(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.EquipmentPortDefinitionConnection, error) {
	return r.ClientFrom(ctx).EquipmentPortDefinition.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) EquipmentPorts(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*pkgmodels.PortFilterInput,
) (*ent.EquipmentPortConnection, error) {
	query := r.ClientFrom(ctx).EquipmentPort.Query()
	query, err := pkgexporter.PortFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Equipments(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.EquipmentOrder,
	filterBy []*pkgmodels.EquipmentFilterInput,
) (*ent.EquipmentConnection, error) {
	return r.ClientFrom(ctx).
		Equipment.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithEquipmentOrder(orderBy),
			ent.WithEquipmentFilter(func(query *ent.EquipmentQuery) (*ent.EquipmentQuery, error) {
				return pkgexporter.EquipmentFilter(query, filterBy)
			}),
		)
}

func (r queryResolver) WorkOrders(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.WorkOrderOrder,
	filterBy []*pkgmodels.WorkOrderFilterInput,
) (*ent.WorkOrderConnection, error) {
	return r.ClientFrom(ctx).
		WorkOrder.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithWorkOrderOrder(orderBy),
			ent.WithWorkOrderFilter(
				func(query *ent.WorkOrderQuery) (*ent.WorkOrderQuery, error) {
					return pkgexporter.WorkOrderFilter(query, filterBy)
				},
			),
		)
}

func (r queryResolver) WorkOrderTypes(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.WorkOrderTypeConnection, error) {
	return r.ClientFrom(ctx).WorkOrderType.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Links(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*pkgmodels.LinkFilterInput,
) (*ent.LinkConnection, error) {
	query := r.ClientFrom(ctx).Link.Query()
	query, err := pkgexporter.LinkFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Projects(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.ProjectOrder,
	filterBy []*models.ProjectFilterInput,
) (*ent.ProjectConnection, error) {
	return r.ClientFrom(ctx).
		Project.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithProjectOrder(orderBy),
			ent.WithProjectFilter(
				func(query *ent.ProjectQuery) (*ent.ProjectQuery, error) {
					return resolverutil.ProjectFilter(query, filterBy)
				},
			),
		)
}

func (r queryResolver) Counters(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.CounterOrder,
	filterBy []*models.CounterFilterInput,
) (*ent.CounterConnection, error) {
	return r.ClientFrom(ctx).
		Counter.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithCounterOrder(orderBy),
			ent.WithCounterFilter(
				func(query *ent.CounterQuery) (*ent.CounterQuery, error) {
					return resolverutil.CounterFilter(query, filterBy)
				},
			),
		)
}

func (r queryResolver) Kpis(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.KpiOrder,
	filterBy []*models.KpiFilterInput,
) (*ent.KpiConnection, error) {
	return r.ClientFrom(ctx).
		Kpi.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithKpiOrder(orderBy),
			ent.WithKpiFilter(
				func(query *ent.KpiQuery) (*ent.KpiQuery, error) {
					return resolverutil.KpiFilter(query, filterBy)
				},
			),
		)
}
func (r queryResolver) Tresholds(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	orderBy *ent.TresholdOrder,
	filterBy []*models.TresholdFilterInput,
) (*ent.TresholdConnection, error) {
	return r.ClientFrom(ctx).
		Treshold.
		Query().
		Paginate(ctx, after, first, before, last,
			ent.WithTresholdOrder(orderBy),
			ent.WithTresholdFilter(
				func(query *ent.TresholdQuery) (*ent.TresholdQuery, error) {
					return resolverutil.TresholdFilter(query, filterBy)
				},
			),
		)
}

func (r queryResolver) Services(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*pkgmodels.ServiceFilterInput) (*ent.ServiceConnection, error) {
	query := r.ClientFrom(ctx).Service.Query().Where(service.HasTypeWith(servicetype.IsDeleted(false)))
	query, err := pkgexporter.ServiceFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Users(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*models.UserFilterInput) (*ent.UserConnection, error) {
	query := r.ClientFrom(ctx).User.Query()
	query, err := resolverutil.UserFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) UsersGroups(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*models.UsersGroupFilterInput) (*ent.UsersGroupConnection, error) {
	query := r.ClientFrom(ctx).UsersGroup.Query()
	query, err := resolverutil.UsersGroupFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) PermissionsPolicies(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
	filters []*models.PermissionsPolicyFilterInput) (*ent.PermissionsPolicyConnection, error) {
	query := r.ClientFrom(ctx).PermissionsPolicy.Query()
	query, err := resolverutil.PermissionsPolicyFilter(query, filters)
	if err != nil {
		return nil, err
	}
	return query.Paginate(ctx, after, first, before, last)
}

func (r queryResolver) SearchForNode(
	ctx context.Context, name string,
	_ *ent.Cursor, limit *int,
	_ *ent.Cursor, _ *int,
) (*models.SearchNodesConnection, error) {
	if limit == nil {
		return nil, errors.New("first is a mandatory param")
	}
	client := r.ClientFrom(ctx)
	locations, err := client.Location.Query().
		Where(
			location.Or(
				location.NameContainsFold(name),
				location.ExternalIDContainsFold(name),
			),
		).
		Limit(*limit).
		All(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying locations: %w", err)
	}

	edges := make([]*models.SearchNodeEdge, len(locations))
	for i, l := range locations {
		edges[i] = &models.SearchNodeEdge{
			Node: l,
		}
	}
	if len(locations) == *limit {
		return &models.SearchNodesConnection{Edges: edges}, nil
	}

	equipments, err := client.Equipment.Query().
		Where(equipment.Or(
			equipment.NameContainsFold(name),
			equipment.ExternalIDContainsFold(name),
		)).
		Limit(*limit - len(locations)).
		All(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying equipment: %w", err)
	}
	for _, e := range equipments {
		edges = append(edges, &models.SearchNodeEdge{
			Node: e,
		})
	}
	return &models.SearchNodesConnection{Edges: edges}, nil
}

func (r queryResolver) PossibleProperties(ctx context.Context, entityType enum.PropertyEntity) (pts []*ent.PropertyType, err error) {
	client := r.ClientFrom(ctx)
	switch entityType {
	case enum.PropertyEntityEquipment:
		pts, err = client.EquipmentType.Query().QueryPropertyTypes().All(ctx)
	case enum.PropertyEntityService:
		pts, err = client.ServiceType.Query().QueryPropertyTypes().All(ctx)
	case enum.PropertyEntityLink:
		pts, err = client.EquipmentPortType.Query().QueryLinkPropertyTypes().All(ctx)
	case enum.PropertyEntityPort:
		pts, err = client.EquipmentPortType.Query().QueryPropertyTypes().All(ctx)
	case enum.PropertyEntityLocation:
		pts, err = client.LocationType.Query().QueryPropertyTypes().All(ctx)
	case enum.PropertyEntityProject:
		pts, err = client.ProjectType.Query().QueryProperties().All(ctx)
	default:
		return nil, fmt.Errorf("unsupported entity type: %s", entityType)
	}
	if err != nil {
		return nil, fmt.Errorf("querying property types: %w", err)
	}

	type key struct {
		name string
		typ  propertytype.Type
	}
	var (
		groups = map[key]struct{}{}
		types  []*ent.PropertyType
	)
	for _, pt := range pts {
		k := key{pt.Name, pt.Type}
		if _, ok := groups[k]; !ok {
			groups[k] = struct{}{}
			types = append(types, pt)
		}
	}
	return types, nil
}

func (r queryResolver) Surveys(ctx context.Context) ([]*ent.Survey, error) {
	surveys, err := r.ClientFrom(ctx).Survey.Query().All(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying all surveys: %w", err)
	}
	return surveys, nil
}

func (r queryResolver) ServiceTypes(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.ServiceTypeConnection, error) {
	return r.ClientFrom(ctx).ServiceType.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) Customers(
	ctx context.Context,
	after *ent.Cursor, first *int,
	before *ent.Cursor, last *int,
) (*ent.CustomerConnection, error) {
	return r.ClientFrom(ctx).Customer.Query().
		Paginate(ctx, after, first, before, last)
}

func (r queryResolver) ReportFilters(ctx context.Context, entity models.FilterEntity) ([]*ent.ReportFilter, error) {
	rfs, err := r.ClientFrom(ctx).ReportFilter.Query().Where(reportfilter.EntityEQ(reportfilter.Entity(entity))).All(ctx)
	if err != nil {
		return nil, fmt.Errorf("querying report filters for entity %v: %w", entity, err)
	}
	return rfs, nil
}

func (r queryResolver) LatestPythonPackage(ctx context.Context) (*models.LatestPythonPackageResult, error) {
	packages, err := r.PythonPackages(ctx)
	if err != nil {
		return nil, err
	}
	if len(packages) == 0 {
		return nil, nil
	}
	lastBreakingChange := len(packages) - 1
	for i, pkg := range packages {
		if pkg.HasBreakingChange {
			lastBreakingChange = i
			break
		}
	}
	return &models.LatestPythonPackageResult{
		LastPythonPackage:         packages[0],
		LastBreakingPythonPackage: packages[lastBreakingChange],
	}, nil
}

func (queryResolver) PythonPackages(context.Context) ([]*models.PythonPackage, error) {
	var (
		packages []models.PythonPackage
		res      []*models.PythonPackage
	)
	if err := json.Unmarshal([]byte(PyinventoryConsts), &packages); err != nil {
		return nil, fmt.Errorf("decoding python packages: %w", err)
	}
	for _, p := range packages {
		p := p
		res = append(res, &p)
	}
	return res, nil
}

func (r queryResolver) Vertex(ctx context.Context, id int) (*ent.Node, error) {
	return r.ClientFrom(ctx).Node(ctx, id)
}

var ErrMultipleEndToEndPath = errors.New("multiple paths found")

func (r queryResolver) EndToEndPath(ctx context.Context, linkID *int, portID *int) (*models.EndToEndPath, error) {
	client := r.ClientFrom(ctx)
	if portID != nil {
		currentPort, err := client.EquipmentPort.
			Query().
			WithLink().
			Where(equipmentport.ID(*portID)).
			First(ctx)
		if err != nil {
			return nil, fmt.Errorf("unable to find port: %w", err)
		}
		_, err = r.getNextConnectedPortWithLink(ctx, currentPort)
		switch {
		case ent.IsNotFound(err):
			return &models.EndToEndPath{Ports: []*ent.EquipmentPort{currentPort}}, nil
		case ent.IsNotSingular(err):
			return nil, ErrMultipleEndToEndPath
		case err != nil:
			return nil, fmt.Errorf("unable to find backplane port: %w", err)
		}
		currentLink, err := currentPort.Edges.LinkOrErr()
		if err != nil {
			return r.traverseEndToEndPath(ctx, nil, currentPort)
		}
		nextPort, err := currentLink.QueryPorts().
			Where(equipmentport.IDNotIn(currentPort.ID)).
			First(ctx)
		if err != nil {
			return nil, fmt.Errorf("unable to find next port: %w", err)
		}
		return r.traverseEndToEndPath(ctx, currentLink, currentPort, nextPort)
	}
	if linkID == nil {
		return nil, errors.New("a portId or linkId is required")
	}
	currentLink, err := client.Link.Query().WithPorts().Where(link.ID(*linkID)).First(ctx)
	if err != nil {
		return nil, fmt.Errorf("unable to find link for port: %w", err)
	}
	return r.traverseEndToEndPath(ctx, currentLink, currentLink.Edges.Ports...)
}

func (r queryResolver) traverseEndToEndPath(ctx context.Context, initialLink *ent.Link, ports ...*ent.EquipmentPort) (*models.EndToEndPath, error) {
	result := models.EndToEndPath{Links: []*ent.Link{}, Ports: []*ent.EquipmentPort{}}
	switch {
	case initialLink != nil:
		result.Links = append(result.Links, initialLink)
	case len(ports) == 1:
		result.Ports = append(result.Ports, ports[0])
	}
	for _, port := range ports {
		for {
			nextBackPlanePort, err := r.getNextConnectedPortWithLink(ctx, port)
			if err != nil {
				if ent.IsNotFound(err) {
					break
				}
				if ent.IsNotSingular(err) {
					return nil, ErrMultipleEndToEndPath
				}
				return nil, fmt.Errorf("unable to find backplane port %w", err)
			}
			if nextBackPlanePort.Edges.Link == nil {
				result.Ports = append(result.Ports, nextBackPlanePort)
				break
			}
			nextLink := nextBackPlanePort.Edges.Link
			result.Links = append(result.Links, nextLink)
			linkPorts, err := nextLink.Edges.PortsOrErr()
			if err != nil || len(linkPorts) < 1 {
				return nil, fmt.Errorf("unable to find port for link %d: %w", port.ID, err)
			}
			if nextBackPlanePort.ID != linkPorts[0].ID {
				port = linkPorts[0]
				continue
			}
			port = linkPorts[1]
		}
	}
	return &result, nil
}

func (r queryResolver) getNextConnectedPortWithLink(ctx context.Context, port *ent.EquipmentPort) (*ent.EquipmentPort, error) {
	portParentEquipmentID, err := port.QueryParent().FirstID(ctx)
	if err != nil {
		return nil, fmt.Errorf("unable to find port parent equipment: %w", err)
	}
	return port.QueryDefinition().
		QueryConnectedPorts().
		QueryPorts().
		Where(equipmentport.HasParentWith(equipment.ID(portParentEquipmentID))).
		WithLink(func(query *ent.LinkQuery) {
			query.WithPorts()
		}).
		Only(ctx)
}

func (r queryResolver) WorkerTypes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int) (*ent.WorkerTypeConnection, error) {
	return r.ClientFrom(ctx).WorkerType.Query().
		Paginate(ctx, after, first, before, last)
}
