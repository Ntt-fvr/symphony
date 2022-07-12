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
import {MenuItem} from '@material-ui/core';
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
  query ConfigurationsViewQuery(
    $filterBy: [ResourceSpecificationFilterInput!]
  ) {
    queryCMVersion {
      id
      resource {
        id
        name
        resourceSpecification
      }
      parameters {
        id
        intValue
        stringValue
        floatValue
        parameterType {
          id
          name
          stringValue
          intValue
          floatValue
          parameters {
            floatValue
            intValue
            stringValue
            id
          }
        }
      }
    }
    resourceSpecifications(filterBy: $filterBy) {
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
  const [resour, setResour] = useState(dataResources);

  const filterConfigs = useMemo(
    () =>
      ResourcesSearchConfig.map(ent => ent.filters).reduce(
        (allFilters, currentFilter) => allFilters.concat(currentFilter),
        [],
      ),
    [],
  );

  // const verifyResourceSpecification =
  //   Object.entries(resSpeci)?.length === 0
  //     ? ''
  //     : resSpeci?.resourceSpecification;

  console.log('RT & RS', resourceType, resourceSpecificationOpt);

  // const verifyResourceType =
  //   Object.entries(resourceType).length == 0 ? '' : resourceType?.resource_Type;
  // console.log('RT ', verifyResourceType);
  // console.log('RS ', verifyResourceSpecification);

  const filterResourceType = useLazyLoadQuery<ConfigurationsViewQuery>(
    Configurations,
    {
      filterBy: [
        {
          idSet: ['300647710720'],
          filterType: 'NAME',
          stringValue: 'RS1',
          operator: 'CONTAINS',
        },
      ],
    },
  );
  console.log('QUERY=', filterResourceType);

  const {
    queryResource,
    resourceSpecifications,
    resourceTypes,
  } = filterResourceType;

  const [dataTable, setDataTable] = useState(queryResource);

  console.log('R+P', queryResource);

  function selectResourceType({target}) {
    setResourceType({
      ...resourceType,
      [target.name]: target.value,
    });
  }

  function selectResourceType2({target}) {
    setResourceSpecificationOpt({
      ...resourceSpecificationOpt,
      [target.name]: target.value,
    });
  }

  /**/

  // const test = queryResource?.map(item =>
  //   item?.cmVersions[0]?.parameters?.map(itemParameter => {
  //     return {
  //       key: row => row?.parameterType?.id,
  //       title: itemParameter?.parameterType?.name ?? '',
  //       render: row => row?.intValue ?? row?.stringValue ?? row?.intValue ?? '',
  //       tooltip: row =>
  //         row?.intValue ?? row?.stringValue ?? row?.intValue ?? '',
  //     };
  //   }),
  // );

  // const test = queryResource?.map(item =>
  //   item?.cmVersions[0]?.parameters?.map(item => {
  //     return {
  //       key: item?.id,
  //       title: item?.parameterType?.name,
  //       render: row => row?.parameterType?.stringValue ?? '',
  //       tooltip: row => row?.parameterType?.stringValue ?? '',
  //     };
  //   }),
  // );

  // const arrayTest = test.flat();

  // const test = queryResource?.map(() => {
  //   return {
  //     key: row => row?.cmVersions[0]?.parameters?.map(item => item.id),
  //     // title: row =>
  //     //   row?.cmVersions[0]?.parameters?.map(
  //     //     item => item?.parameterType?.name,
  //     //   ) ?? '',
  //     render: row =>
  //       row?.cmVersions[0]?.parameters?.map(
  //         item =>
  //           item?.parameterType?.intValue ||
  //           item?.parameterType?.stringValue ||
  //           item?.parameterType?.floatValue,
  //       ) ?? '',
  //     tooltip: row =>
  //       row?.cmVersions[0]?.parameters?.map(
  //         item =>
  //           item?.parameterType?.intValue ||
  //           item?.parameterType?.stringValue ||
  //           item?.parameterType?.floatValue,
  //       ) ?? '',
  //   };
  // });

  console.log('ROW ', resour);
  // console.log('new-parT', arrayTest);

  // const resourceTypesFilters = resourceSpecifications?.edges.map(
  //   item => item?.node?.resourceType,
  // );
  // const uniqueResourceType = [
  //   ...new Set(resourceTypesFilters?.map(item => item?.name)),
  // ];

  // const resourceSpecificationFiltered = filterResourceType?.resourceTypes?.edges?.map(
  //   item => item?.node?.resourceSpecification?.map(rs => rs),
  // );
  /*
  const filterData = filterChange => {
    const filterName = queryResource?.filter(
      item => item?.resource?.name === filterChange[0]?.stringValue,
    );
    const filterLocation = queryResource?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterName = queryResource?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterTag = queryResource?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );
    const filterParameterPriority = queryResource?.filter(
      item => item?.resource?.locatedIn === filterChange[0]?.stringValue,
    );

    filterChange.length === 0 && setDataTable(queryResource);

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
        setDataTable(queryResource);
        break;
    }
  };
  */

  // useEffect(() => {
  //   setResour([...resour, ...arrayTest]);
  // }, [checkingSelects]);

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
                  <MenuItem key={index} value={item?.id}>
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
        // stateChange={checkingSelects}
        // dataConfig={queryResource}
        // dataColumn={resour}
        // selectResourceType2={selectResourceType2}
        />
      </Grid>
    </Grid>
  );
};

export {ConfigurationsView};

/*
      queryResource(filter: $filter) {
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
     #
     resourceTypes(filterBy: $filterBy) {
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
    #
     const dataQuery = useLazyLoadQuery<ConfigurationsViewQuery>(Configurations, {
    filter: {
      resourceSpecification: {
        eq: verifyResourceSpecification,
      },
    },
    filterBy: [
      {
        filterType: 'NAME',
        operator: 'IS',
        stringValue: verifyResourceType,
      },
    ],
  });
  #
  const filterResourceType = useLazyLoadQuery<ConfigurationsViewQuery>(
    Configurations,
    {
      filterBy: [
        {
          filterType: 'NAME',
          operator: 'IS',
          stringValue: verifyResourceType,
        },
      ],
    },
  );
  #
    
*/
