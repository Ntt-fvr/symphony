/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ResourceTypeQuery from './common/ResourceTypesFetch';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {ResourceTypeDetails} from './ResourceTypeDetails';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

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
const tableColumns = [
  {
    key: 'actionTemplate',
    title: 'Action Template',
    render: row => row.template.name ?? '',
    tooltip: row => row.template.name ?? '',
  },
  {
    key: 'resourceSpecification',
    title: `${fbt('Resource Specification', '')}`,
    render: row => row.resourceSpecification ?? '',
    tooltip: row => row.resourceSpecification ?? '',
  },
  {
    key: 'executionTime',
    title: `${fbt('Execution Time', '')}`,
    render: row => row.starTime ?? '',
    tooltip: row => row.starTime ?? '',
  },
];

const executionsQuery = graphql`
  query ExecutionsTypesQuery {
    queryActionExecution {
      starTime
      id
      template {
        id
        name
        resourceSpecifications
      }
    }
  }
`;

const executionDetailsQuery = graphql`
  query ExecutionsTypesDetailQuery($getActionExecutionId: ID!) {
    getActionExecution(id: $getActionExecutionId) {
      id
      endTime
      template {
        name
        resourceSpecifications
      }
      scheduler {
        type
      }
      starTime
      items {
        resources {
          resourceSpecification
          name
        }
        status
      }
    }
  }
`;

export const PROJECTS_PAGE_SIZE = 5;

const ExecutionsTypes = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedExecution, setSelectedExecution] = useState({});
  const [executionData, setExecutionData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [resourceExecData, setResourceExecData] = useState([]);

  const handleOpenDetails = () => {
    setOpenDetails(prevStateDetails => !prevStateDetails);
  };
  const showInfo = data => {
    fetchQuery(RelayEnvironment, executionDetailsQuery, {
      getActionExecutionId: data?.id,
    }).then(data => {
      const resourceFilter = [];
      data.getActionExecution.items.forEach(item => {
        item.resources.forEach(resource => {
          resourceFilter.push({
            name: resource.name,
            status: item.status,
            resourceSpecification: resource.resourceSpecification,
          });
        });
      });
      setSelectedExecution(data.getActionExecution);
      setResourceExecData(resourceFilter);
      handleOpenDetails();
    });
  };

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, executionsQuery, {}).then(data => {
      ResourceTypeQuery().then(response => {
        const resources = response.resourceSpecifications.edges.map(
          resource => resource.node,
        );
        setResourceData(resources);
        setExecutionData(
          data.queryActionExecution.map(item => {
            return {
              ...item,
              resourceSpecification: resources.find(
                resource => resource.id == item.template.resourceSpecifications,
              ).name,
            };
          }),
        );
      });
    });
  }, [setExecutionData]);

  if (openDetails) {
    return (
      <ResourceTypeDetails
        data={selectedExecution}
        setOpenDetails={setOpenDetails}
        resourceData={resourceData}
        resourceExecData={resourceExecData}
      />
    );
  }

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleCounter} item xs={12}>
        <ConfigureTitle
          title={fbt('Executions', '')}
          subtitle={fbt(
            'Select an ID to see the detail of the executed action',
            '  ',
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.bar}>
          <div className={classes.searchBar}>
            <PowerSearchBar
              placeholder="Filter Resource Type"
              getSelectedFilter={filters => setFilters(filters)}
              onFiltersChanged={filters => setFilters(filters)}
              filterConfigs={[]}
              searchConfig={[]}
              entity={'SERVICE'}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
        <Table
          data={executionData}
          columns={[
            {
              key: 'id',
              title: 'ID',
              getSortingValue: row => row.id,
              render: row => (
                <Button
                  onClick={() => {
                    showInfo(row);
                  }}
                  variant="text"
                  tooltip={row.id ?? ''}>
                  {row.id}
                </Button>
              ),
            },
            ...tableColumns,
          ]}
          paginationSettings={{
            loadNext: onCompleted => {
              loadNext(PROJECTS_PAGE_SIZE, {
                onComplete: () => onCompleted && onCompleted(),
              });
            },
            pageSize: PROJECTS_PAGE_SIZE,
            totalRowsCount: executionData.length,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ExecutionsTypes;
