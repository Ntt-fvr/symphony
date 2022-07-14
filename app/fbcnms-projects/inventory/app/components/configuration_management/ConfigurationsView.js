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

import Button from '@symphony/design-system/components/Button';
import ConfigureTitle from './common/ConfigureTitle';
import FormField from '@symphony/design-system/components/FormField/FormField';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useEffect, useMemo, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {ConfigurationTable} from './ConfigurationTable';
import {Grid} from '@material-ui/core';
import {MenuItem, Tooltip} from '@material-ui/core';
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
  containerSelects: {
    display: 'inline-block',
    borderRight: '1px solid rgba(157, 169, 190, 0.3)',
    background: 'white',
  },
  selectField: {
    width: '100%',
  },
  selectResourceType: {
    width: '160px',
    margin: '5px',
  },
  selectResourceSpecification: {
    paddingLeft: '0px',
    width: '200px',
    margin: '5px',
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
    resourceTypes {
      edges {
        node {
          id
          name
          resourceSpecification {
            id
            name
          }
        }
      }
    }
  }
`;
const Configurations2 = graphql`
  query ConfigurationsView2Query($filter: ResourceFilter) {
    queryResource(filter: $filter) {
      id
      name
      locatedIn
      resourceSpecification
      isDeleted
      cmVersions {
        id
        createTime
        updateTime
        status
        #
        resource {
          id
          name
          locatedIn
        }
        #
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
      }
    }
  }
`;

const dataResources = [
  {
    key: 'resource',
    title: 'Resource',
    render: row => (
      <Button variant="text" tooltip={row?.name ?? ''}>
        {row?.name}
      </Button>
    ),
  },
  {
    key: 'location',
    title: 'Location',
    render: row => (
      <Button variant="text" tooltip={row?.locatedIn ?? ''}>
        {row?.locatedIn}
      </Button>
    ),
    tooltip: row => row?.locatedIn ?? '',
  },
];

const ConfigurationsView = () => {
  const classes = useStyles();
  const [resourceSpecificationOpt, setResourceSpecificationOpt] = useState({});

  const [resourceType, setResourceType] = useState({});
  const [checkingSelects, setCheckingSelects] = useState(false);
  const [resourceTable, setResourceTable] = useState(dataResources);

  const filterConfigs = useMemo(
    () =>
      ResourcesSearchConfig.map(ent => ent.filters).reduce(
        (allFilters, currentFilter) => allFilters.concat(currentFilter),
        [],
      ),
    [],
  );

  const verifyResourceSpecification =
    Object.entries(resourceSpecificationOpt)?.length === 0
      ? '' ?? null
      : resourceSpecificationOpt?.resourceSpecification;

  const queryTotal = useLazyLoadQuery<ConfigurationsViewQuery>(Configurations);

  const filterQueryResource = useLazyLoadQuery<ConfigurationsView2Query>(
    Configurations2,
    {
      filter: {
        resourceSpecification: {
          eq: verifyResourceSpecification,
        },
      },
    },
  );

  const {resourceTypes} = queryTotal;
  const {queryResource} = filterQueryResource;

  const selectResourceType = ({target}) => {
    setResourceType({
      ...resourceType,
      [target.name]: target.value,
    });
  };

  const selectResourceType2 = ({target}) => {
    setResourceSpecificationOpt({
      ...resourceSpecificationOpt,
      [target.name]: target.value,
    });
    setCheckingSelects(!checkingSelects);
  };

  const renderOp = (row, itemParameter) => {
    const parTemp = row?.cmVersions[0]?.parameters?.find(
      item => item.parameterType.id === itemParameter.parameterType.id,
    );
    return parTemp?.stringValue ?? parTemp?.floatValue ?? parTemp?.intValue;
  };
  const test2 =
    queryResource[0]?.cmVersions[0]?.parameters?.map(itemParameter => ({
      key: itemParameter?.id,
      title: itemParameter?.parameterType?.name,
      render: row => renderOp(row, itemParameter),
    })) ?? [];

  const arrayTest = test2;

  // const selectResourceSpecification = () => {
  //   setCheckingSelects(!checkingSelects);
  //   setResourceTable([...resourceTable, ...arrayTest]);
  // };

  useEffect(() => {
    setResourceTable([...resourceTable, ...arrayTest]);
  }, [checkingSelects]);

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
          <FormField className={classes.containerSelects}>
            <TextField
              id="outlined-select-family"
              select
              className={classes.selectResourceType}
              label="Resource Type"
              onChange={selectResourceType}
              name="resource_Type"
              defaultValue=""
              variant="outlined">
              <MenuItem value={''} disabled>
                {'Resource Type'}
              </MenuItem>
              {resourceTypes?.edges?.map((item, index) => (
                <MenuItem key={index} value={item?.node}>
                  {item?.node?.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-family"
              select
              className={classes.selectResourceSpecification}
              label="Resource Specification"
              onChange={selectResourceType2}
              name="resourceSpecification"
              defaultValue=""
              variant="outlined">
              <MenuItem value={''} disabled>
                {'Resource Specification'}
              </MenuItem>
              {resourceType?.resource_Type?.resourceSpecification?.map(
                (item, index) => (
                  <MenuItem
                    // onClick={selectResourceSpecification}
                    key={index}
                    value={item?.id}>
                    {item.name}
                  </MenuItem>
                ),
              )}
            </TextField>
          </FormField>
          <div className={classes.searchBar}>
            <PowerSearchBar
              placeholder="Configuration"
              filterConfigs={filterConfigs}
              searchConfig={ResourcesSearchConfig}
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
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
        <ConfigurationTable
          dataConfig={queryResource}
          dataColumn={resourceTable}
        />
      </Grid>
    </Grid>
  );
};

export {ConfigurationsView};
