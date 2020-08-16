// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/facebookincubator/symphony/graph/graphql/models"
	"github.com/facebookincubator/symphony/graph/resolverutil"
	"github.com/facebookincubator/symphony/pkg/ctxgroup"
	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/log"

	"github.com/AlekSi/pointer"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type locationsFilterInput struct {
	Name          models.LocationFilterType `json:"name"`
	Operator      models.FilterOperator     `jsons:"operator"`
	StringValue   string                    `json:"stringValue"`
	IDSet         []string                  `json:"idSet"`
	StringSet     []string                  `json:"stringSet"`
	PropertyValue models.PropertyTypeInput  `json:"propertyValue"`
	MaxDepth      *int                      `json:"maxDepth"`
	BoolValue     *bool                     `json:"boolValue"`
}

type LocationsRower struct {
	Log        log.Logger
	Concurrent bool
}

func getFilterInput(filtersParam string, logger *zap.Logger) ([]*models.LocationFilterInput, error) {
	var (
		filterInput []*models.LocationFilterInput
		err         error
	)
	if filtersParam != "" {
		filterInput, err = paramToLocationFilterInput(filtersParam)
		if err != nil {
			logger.Error("cannot filter location", zap.Error(err))
			return nil, errors.Wrap(err, "cannot filter location")
		}
	}
	return filterInput, nil
}

func getOrderedLocationTypes(ctx context.Context, logger *zap.Logger, useConcurrency bool) ([]string, error) {
	client := ent.FromContext(ctx)
	var (
		orderedLocTypes []string
		err             error
	)
	if useConcurrency {
		cg := ctxgroup.WithContext(ctx)
		cg.Go(func(ctx context.Context) (err error) {
			orderedLocTypes, err = locationTypeHierarchy(ctx, client)
			if err != nil {
				logger.Error("cannot query location types", zap.Error(err))
				return errors.Wrap(err, "cannot query location types")
			}
			return nil
		})
		if err := cg.Wait(); err != nil {
			return nil, err
		}
	} else {
		orderedLocTypes, err = locationTypeHierarchy(ctx, client)
		if err != nil {
			logger.Error("cannot query location types", zap.Error(err))
			return nil, errors.Wrap(err, "cannot query location types")
		}
	}
	return orderedLocTypes, nil
}

func (lr LocationsRower) Rows(ctx context.Context, filtersParam string) ([][]string, error) {
	var (
		logger           = lr.Log.For(ctx)
		useConcurrency   = lr.Concurrent
		filterInput      []*models.LocationFilterInput
		locationIDHeader = [...]string{bom + "Location ID"}
		fixedHeaders     = [...]string{"External ID", "Latitude", "Longitude"}
	)

	filterInput, err := getFilterInput(filtersParam, logger)
	if err != nil {
		logger.Error("cannot filter location", zap.Error(err))
		return nil, errors.Wrap(err, "cannot filter location")
	}

	client := ent.FromContext(ctx)

	locations, err := resolverutil.LocationSearch(ctx, client, filterInput, nil)
	if err != nil {
		logger.Error("cannot query location", zap.Error(err))
		return nil, errors.Wrap(err, "cannot query location")
	}

	locationsList := locations.Locations
	allRows := make([][]string, len(locationsList)+1)
	locationIDs := make([]int, len(locationsList))
	for i, l := range locationsList {
		locationIDs[i] = l.ID
	}

	var orderedLocTypes, propertyTypes []string
	cg := ctxgroup.WithContext(ctx, ctxgroup.MaxConcurrency(32))
	orderedLocTypes, err = getOrderedLocationTypes(ctx, logger, useConcurrency)
	if err != nil {
		logger.Error("cannot query location types", zap.Error(err))
		return nil, errors.Wrap(err, "cannot query location types")
	}
	if useConcurrency {
		cg.Go(func(ctx context.Context) (err error) {
			locationIDs := make([]int, len(locationsList))
			for i, l := range locationsList {
				locationIDs[i] = l.ID
			}
			propertyTypes, err = propertyTypesSlice(ctx, locationIDs, client, models.PropertyEntityLocation)
			if err != nil {
				logger.Error("cannot query property types", zap.Error(err))
				return errors.Wrap(err, "cannot query property types")
			}
			return nil
		})
		if err := cg.Wait(); err != nil {
			return nil, err
		}
	} else {
		locationIDs := make([]int, len(locationsList))
		for i, l := range locationsList {
			locationIDs[i] = l.ID
		}
		propertyTypes, err = propertyTypesSlice(ctx, locationIDs, client, models.PropertyEntityLocation)
		if err != nil {
			logger.Error("cannot query property types", zap.Error(err))
			return nil, errors.Wrap(err, "cannot query property types")
		}
	}

	title := append(locationIDHeader[:], orderedLocTypes...)
	title = append(title, fixedHeaders[:]...)
	title = append(title, propertyTypes...)

	allRows[0] = title
	if useConcurrency {
		cg := ctxgroup.WithContext(ctx, ctxgroup.MaxConcurrency(32))
		for i, value := range locationsList {
			value, i := value, i
			cg.Go(func(ctx context.Context) error {
				row, err := locationToSlice(ctx, value, orderedLocTypes, propertyTypes, true)
				if err != nil {
					return err
				}
				allRows[i+1] = row
				return nil
			})
		}
		if err := cg.Wait(); err != nil {
			logger.Error("error in wait", zap.Error(err))
			return nil, errors.WithMessage(err, "error in wait")
		}
	} else {
		for i, value := range locationsList {
			value, i := value, i
			row, err := locationToSlice(ctx, value, orderedLocTypes, propertyTypes, false)
			if err != nil {
				return nil, err
			}
			allRows[i+1] = row
		}
	}
	return allRows, nil
}

func locationToSlice(ctx context.Context, location *ent.Location, orderedLocTypes, propertyTypes []string, useConcurrency bool) ([]string, error) {
	var (
		lParents, properties []string
		err                  error
	)
	if useConcurrency {
		g := ctxgroup.WithContext(ctx)
		g.Go(func(ctx context.Context) (err error) {
			lParents, err = locationHierarchy(ctx, location, orderedLocTypes)
			return err
		})
		g.Go(func(ctx context.Context) (err error) {
			properties, err = propertiesSlice(ctx, location, propertyTypes, models.PropertyEntityLocation)
			return err
		})
		if err := g.Wait(); err != nil {
			return nil, err
		}
	} else {
		lParents, err = locationHierarchy(ctx, location, orderedLocTypes)
		if err != nil {
			return nil, err
		}
		properties, err = propertiesSlice(ctx, location, propertyTypes, models.PropertyEntityLocation)
		if err != nil {
			return nil, err
		}
	}
	lat := fmt.Sprintf("%f", location.Latitude)
	long := fmt.Sprintf("%f", location.Longitude)

	fixedData := []string{location.ExternalID, lat, long}

	row := []string{strconv.Itoa(location.ID)}
	row = append(row, lParents...)
	row = append(row, fixedData...)
	row = append(row, properties...)

	return row, nil
}

func paramToLocationFilterInput(params string) ([]*models.LocationFilterInput, error) {
	var inputs []locationsFilterInput
	err := json.Unmarshal([]byte(params), &inputs)
	if err != nil {
		return nil, err
	}

	ret := make([]*models.LocationFilterInput, 0, len(inputs))
	for _, f := range inputs {
		upperName := strings.ToUpper(f.Name.String())
		upperOp := strings.ToUpper(f.Operator.String())
		propertyValue := f.PropertyValue
		maxDepth := 5
		if f.MaxDepth != nil {
			maxDepth = *f.MaxDepth
		}
		intIDSet, err := toIntSlice(f.IDSet)
		if err != nil {
			return nil, fmt.Errorf("wrong id set %v: %w", f.IDSet, err)
		}
		inp := models.LocationFilterInput{
			FilterType:    models.LocationFilterType(upperName),
			Operator:      models.FilterOperator(upperOp),
			StringValue:   pointer.ToString(f.StringValue),
			PropertyValue: &propertyValue,
			IDSet:         intIDSet,
			StringSet:     f.StringSet,
			MaxDepth:      &maxDepth,
			BoolValue:     f.BoolValue,
		}
		ret = append(ret, &inp)
	}
	return ret, nil
}
