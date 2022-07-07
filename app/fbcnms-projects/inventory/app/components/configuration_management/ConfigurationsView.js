/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FilterConfig} from '../comparison_view/ComparisonViewTypes';

import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useEffect, useMemo, useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {ConfigurationTable} from './ConfigurationTable';
import {Grid} from '@material-ui/core';
import {ResourcesSearchConfig} from './ResourcesSearchConfig';
import {getInitialFilterValue} from '../comparison_view/FilterUtils';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleCounter: {
    margin: '0 0 30px 0',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexGrow: 1,
  },
}));

const Configurations = graphql`
  query ConfigurationsViewQuery {
    queryResource {
      id
      name
      locatedIn
      resourceSpecification
      isDeleted
      lifecycleStatus
      typePlanningSubStatus
      planningSubStatus
      usageSubStatus
      operationalSubStatus
      createTime
      updateTime
    }
    resourceSpecifications {
      edges {
        node {
          id
          name
          resourceType {
            id
            name
          }
        }
      }
    }
    queryCMVersion {
      id
      parameters {
        id
        stringValue
        rangeToValue
        rangeFromValue
        floatValue
        intValue
        booleanValue
        latitudeValue
        longitudeValue
        parameterType {
          id
          name
          resourceSpecification
          stringValue
          floatValue
          intValue
          type
        }
      }
      status
      resource {
        id
        name
        resourceProperties {
          id
          resourcePropertyType
        }
        locatedIn
      }
    }
  }
`;

const ConfigurationsView = () => {
  const dataQuery = useLazyLoadQuery<ConfigurationsViewQuery>(Configurations);

  const {queryCMVersion} = dataQuery;

  const [dataTable, setDataTable] = useState(queryCMVersion);
  console.log('C-TYPES', dataTable);
  const classes = useStyles();

  const filterConfigs = useMemo(
    () =>
      ResourcesSearchConfig.map(ent => ent.filters).reduce(
        (allFilters, currentFilter) => allFilters.concat(currentFilter),
        [],
      ),
    [],
  );

  const filterData = filterChange => {
    console.log('filtro-cambio ->', filterChange);

    const filterName = queryCMVersion?.filter(
      item => item?.resource?.name === filterChange[0]?.stringValue,
    );
    const filterLocation = queryCMVersion?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterName = queryCMVersion?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterTag = queryCMVersion?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterPriority = queryCMVersion?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );

    filterChange.length === 0 && setDataTable(queryCMVersion);

    switch (filterChange[0]?.key) {
      case 'resource_name':
        setDataTable(filterName);
        break;
      case 'location_inst_external_id':
        setDataTable(filterLocation);
        break;
      case 'parameter_selector_name':
        setDataTable(filterParameterName);
        break;
      case 'parameter_selector_tags':
        setDataTable(filterParameterTag);
        break;
      case 'parameter_selector_priority':
        setDataTable(filterParameterPriority);
        break;

      default:
        setDataTable(queryCMVersion);
        break;
    }
  };

  // console.log('View-> ', ResourcesSearchConfig, dataTable, queryCMVersion);

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleCounter} item xs={12}>
        <ConfigureTitle
          title={fbt('Configurations', '')}
          subtitle={fbt(
            'Current configuration status by network elements',
            'Configuration management subheader',
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.bar}>
          <div className={classes.searchBar}>
            <PowerSearchBar
              placeholder="Configuration"
              filterConfigs={filterConfigs} //opciones de filtrado
              searchConfig={ResourcesSearchConfig} //opciones de filtrado unificadas
              getSelectedFilter={(filterConfig: FilterConfig) =>
                getInitialFilterValue(
                  filterConfig.key,
                  filterConfig.name,
                  filterConfig.defaultOperator,
                  null,
                )
              }
              onFiltersChanged={filterChange => filterData(filterChange)}
              exportPath={'/configurations_views'}
              //entity={'RESOURCE'}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
        <ConfigurationTable dataConfig={dataTable} />
      </Grid>
    </Grid>
  );
};

/*
<Table
    data={data}
    columns={tableColumns}
    paginationSettings={{
        loadNext: onCompleted => {
            loadNext(PROJECTS_PAGE_SIZE, {
                onComplete: () => onCompleted && onCompleted(),
            });
        },
        pageSize: PROJECTS_PAGE_SIZE,
        totalRowsCount: 10,
    }}

/>
 */

export {ConfigurationsView};
