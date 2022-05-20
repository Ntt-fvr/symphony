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
import IconButton from '@symphony/design-system/components/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useState} from 'react';

import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {CreateAction} from './CreateAction';
import {Grid} from '@material-ui/core';
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
    key: 'id',
    title: 'ID',
    getSortingValue: row => row.id,
    render: row => (
      <Button variant="text" tooltip={row.id ?? ''}>
        {row.id}
      </Button>
    ),
  },
  {
    key: 'actionTempleate',
    title: 'Action Templeate',
    render: row => row.actionTempleate ?? '',
    tooltip: row => row.actionTempleate ?? '',
  },
  {
    key: 'resourceType',
    title: `${fbt('Resource Type', '')}`,
    render: row => row.resourceType ?? '',
    tooltip: row => row.resourceType ?? '',
  },
  {
    key: 'resourceSpecification',
    title: `${fbt('Resource Specification', '')}`,
    render: row => row.resourceSpecification ?? '',
    tooltip: row => row.resourceSpecification ?? '',
  },
  {
    key: 'lastExecution',
    title: `${fbt('Last Execution', '')}`,
    render: row => row.logs?.actionExecutionStartTime ?? '',
    tooltip: row => row.logs?.actionExecutionStartTime ?? '',
  },
  {
    key: 'executionType',
    title: `${fbt('Execution Type', '')}`,
    render: row => row.executionType ?? '',
    tooltip: row => row.executionType ?? '',
  },
  {
    key: 'manualExecutions',
    title: `${fbt('Manual Executions', '')}`,
    render: row => row.manualExecutions ?? '',
    tooltip: row => row.manualExecutions ?? '',
  },
];

const data = [
  {
    id: '386547056643',
    key: '386547056643',
    resourceType: 'RNCellDU',
    resourceSpecification: 'RNCellDU_Nokia_MLN1_3132331',
    executionTime: '22-02-2022 - 10:22:00',
    actionTempleate: 'Sleep',
    executionType: 'Manual',
    manualExecutions: '2',
    logs: {
      actionExecutionStartTime: '22-02-2022 - 10:22:00',
      actionExecutionEndTime: '15-02-2022 - 13:05:00',
    },
    executionResult: 'Succesful',
  },
  {
    id: '386547056644',
    key: '386547056644',
    resourceType: 'RNCellDU',
    resourceSpecification: 'RNCellDU_Nokia_MLN1_3132332',
    executionTime: '22-02-2022 - 10:22:00',
    actionTempleate: 'Sleep',
    executionType: 'One Time',
    manualExecutions: '5',
    logs: {
      actionExecutionStartTime: '22-02-2022 - 10:22:00',
      actionExecutionEndTime: '15-02-2022 - 13:05:00',
    },
    executionResult: 'Faild',
  },
  {
    id: '386547056645',
    key: '386547056645',
    resourceType: 'RNCellDU',
    resourceSpecification: 'RNCellDU_Nokia_MLN1_3132333',
    executionTime: '22-02-2022 - 10:22:00',
    actionTempleate: 'Sleep',
    executionType: 'Periodical',
    manualExecutions: '10',
    logs: {
      actionExecutionStartTime: '22-02-2022 - 10:22:00',
      actionExecutionEndTime: '15-02-2022 - 13:05:00',
    },
    executionResult: 'Succesful',
  },
  {
    id: '386547056646',
    key: '386547056646',
    resourceType: 'RNCellDU',
    resourceSpecification: 'RNCellDU_Nokia_MLN1_3132334',
    executionTime: '22-02-2022 - 10:22:00',
    actionTempleate: 'Sleep',
    executionType: 'Manual',
    manualExecutions: '22',
    logs: {
      actionExecutionStartTime: '22-02-2022 - 10:22:00',
      actionExecutionEndTime: '15-02-2022 - 13:05:00',
    },
    executionResult: 'Faild',
  },
];
export const PROJECTS_PAGE_SIZE = 15;

const ScheduledActionsTypes = () => {
  const classes = useStyles();
  const [setFilters] = useState([]);
  const [openCreateAction, setOpenCreateAction] = useState(false);

  const handleCreateAction = () => {
    setOpenCreateAction(setStateCreateAction => !setStateCreateAction);
  };
  if (openCreateAction) {
    return <CreateAction />;
  }

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid
        className={classes.titleCounter}
        container
        justify={'space-between'}
        item
        xs={12}>
        <ConfigureTitle
          title={fbt('Scheduled Actions', '')}
          subtitle={fbt(
            'Define and scheduled the actions to be manually or automatically executed, impacting network elements directly',
            '  ',
          )}
        />

        <Button onClick={handleCreateAction}>Create Action</Button>
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
          data={data}
          columns={[
            ...tableColumns,
            {
              key: 'executeNow',
              title: `${fbt('Execute Now', '')}`,
              render: row => (
                <IconButton
                  tooltip={row.id ?? ''}
                  skin="gray"
                  icon={LaunchIcon}
                  onClick={() => console.log('INFO ROW', row)}
                />
              ),
            },
          ]}
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
      </Grid>
    </Grid>
  );
};

export {ScheduledActionsTypes};
