package resolver

import (
	"context"
	"database/sql"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/pkg/database/mysql"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/propertytype"
	"github.com/facebookincubator/symphony/pkg/ent/schema/enum"
	"github.com/facebookincubator/symphony/pkg/viewer"
)

func CustomPaginateProjects(
	client *ent.Client,
	ctx context.Context,
	projectCursor *ent.Cursor, rowCount *int,
	direction string,
	filterBy []*models.ProjectFilterInput,
	propertyColumn string,
) (*ent.ProjectConnection, error) {

	columnName := "_val_"

	var limit int
	if rowCount != nil {
		limit = *rowCount
	} else {
		limit = 1
	}

	first := projectCursor == nil
	var index int
	if first {
		index = 1
	} else {
		index = 2
	}

	projectFilters := projectFilters(filterBy)
	propertyFilters := propertyFilters(filterBy)

	var id int
	var value interface{}

	if projectCursor != nil {
		id = projectCursor.ID
		value = projectCursor.Value
	} else {
		id = 0
		value = ""
	}

	drv, connErr := Driver(ctx)
	if connErr != nil {
		return nil, connErr
	}

	propertyTypeQuery, propertyArgs := ProjectPropertyFieldQuery(propertyColumn).Query()

	propertyTypeRows, propertyTypeErr := drv.QueryContext(ctx, propertyTypeQuery, propertyArgs...)

	if propertyTypeErr != nil {
		drv.Close()
		return nil, propertyTypeErr
	}
	defer propertyTypeRows.Close()

	var propertyType string
	if propertyTypeRows.Next() {
		if err := propertyTypeRows.Scan(&propertyType); err != nil {
			drv.Close()
			return nil, err
		}
	} else {
		propertyType = string(propertytype.TypeString)
	}

	projectQuery, args := ProjectQuery(columnName, propertyColumn, propertyType,
		direction, limit+index, first, id, value, projectFilters, propertyFilters).Query()

	projectRows, projectErr := drv.QueryContext(ctx, projectQuery, args...)

	if projectErr != nil {
		drv.Close()
		return nil, projectErr
	}
	defer projectRows.Close()

	edges := make([]*ent.ProjectEdge, 0)

	for projectRows.Next() {
		var projectID int
		var val interface{}

		if err := projectRows.Scan(&projectID, &val); err != nil {
			drv.Close()
			return nil, err
		}

		project := client.Project.GetX(ctx, projectID)

		cursor := ent.Cursor{
			ID:    projectID,
			Value: val,
		}

		edge := &ent.ProjectEdge{
			Node:   project,
			Cursor: cursor,
		}

		edges = append(edges, edge)
	}

	countQuery, countArgs := CountQuery(columnName, propertyColumn, propertyType,
		id, value, projectFilters, propertyFilters).Query()

	countRows, countErr := drv.QueryContext(ctx, countQuery, countArgs...)

	if countErr != nil {
		drv.Close()
		return nil, countErr
	}
	defer countRows.Close()

	var totalCount int
	if countRows.Next() {
		if err := countRows.Scan(&totalCount); err != nil {
			drv.Close()
			return nil, countErr
		}
	}

	size := len(edges)

	var hasPreviousPage bool
	if !first && size > 0 && edges[0].Node.ID == id {
		edges = edges[1:]
		hasPreviousPage = true
	} else {
		hasPreviousPage = false
		if size == limit+2 {
			edges = edges[:size-1]
		}
	}

	size = len(edges)

	var hasNextPage bool
	if size == (limit + 1) {
		edges = edges[:size-1]
		hasNextPage = true
	} else {
		hasNextPage = false
	}

	size = len(edges)

	var startCursor, endCursor *ent.Cursor
	if size > 0 {
		startCursor = &edges[0].Cursor
		endCursor = &edges[size-1].Cursor
	} else {
		startCursor = nil
		endCursor = nil
	}

	pageInfo := ent.PageInfo{
		HasNextPage:     hasNextPage,
		HasPreviousPage: hasPreviousPage,
		StartCursor:     startCursor,
		EndCursor:       endCursor,
	}

	projectConnection := &ent.ProjectConnection{
		Edges:      edges,
		PageInfo:   pageInfo,
		TotalCount: totalCount,
	}

	if err := propertyTypeRows.Err(); err != nil {
		drv.Close()
		return nil, err
	}

	if err := projectRows.Err(); err != nil {
		drv.Close()
		return nil, err
	}

	if err := countRows.Err(); err != nil {
		drv.Close()
		return nil, err
	}

	drv.Close()

	return projectConnection, nil
}

func propertyFilters(filters []*models.ProjectFilterInput) []*models.ProjectFilterInput {
	pf := make([]*models.ProjectFilterInput, 0)

	for _, filter := range filters {
		switch filter.FilterType {
		case models.ProjectFilterTypeProperty:
			if filter.Operator == enum.FilterOperatorIs {
				pf = append(pf, filter)
			}
		}
	}
	return pf
}

func projectFilters(filters []*models.ProjectFilterInput) []*models.ProjectFilterInput {
	pf := make([]*models.ProjectFilterInput, 0)

	for _, filter := range filters {
		switch filter.FilterType {
		case models.ProjectFilterTypeProjectName:
			if filter.Operator == enum.FilterOperatorContains && filter.StringValue != nil {
				pf = append(pf, filter)
			}
		case models.ProjectFilterTypeProjectOwnedBy:
			if filter.Operator == enum.FilterOperatorIsOneOf {
				pf = append(pf, filter)
			}
		case models.ProjectFilterTypeProjectType:
			if filter.Operator == enum.FilterOperatorIsOneOf {
				pf = append(pf, filter)
			}
		case models.ProjectFilterTypeProjectPriority:
			if filter.Operator == enum.FilterOperatorIsOneOf {
				pf = append(pf, filter)
			}
		case models.ProjectFilterTypeLocationInst:
			if filter.Operator == enum.FilterOperatorIsOneOf {
				pf = append(pf, filter)
			}
		}
	}
	return pf
}

func Driver(ctx context.Context) (*sql.DB, error) {
	tenant := viewer.FromContext(ctx).Tenant()

	url := GlobalPropFlags.DatabaseURL
	url.Path = "/" + viewer.DBName(tenant)

	db, err := mysql.OpenURL(ctx, url)
	if err != nil {
		return nil, err
	}

	return db, nil
}
