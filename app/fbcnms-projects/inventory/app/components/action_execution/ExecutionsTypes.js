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
import React, {useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {ResourceTypeDetails} from './ResourceTypeDetails';
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
    key: 'actionTempleate',
    title: 'Action Templeate',
    render: row => row.actionTempleate ?? '',
    tooltip: row => row.actionTempleate ?? '',
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
    render: row => row.logs?.actionExecutionStartTime ?? '',
    tooltip: row => row.logs?.actionExecutionStartTime ?? '',
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
    executionType: 'Manual',
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
    executionType: 'Manual',
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
    logs: {
      actionExecutionStartTime: '22-02-2022 - 10:22:00',
      actionExecutionEndTime: '15-02-2022 - 13:05:00',
    },
    executionResult: 'Faild',
  },
];
export const PROJECTS_PAGE_SIZE = 15;

const ExecutionsTypes = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [dataRow, setDataRow] = useState({});

  const handleOpenDetails = () => {
    setOpenDetails(prevStateDetails => !prevStateDetails);
  };
  const showInfo = data => {
    setDataRow(data);
  };
  if (openDetails) {
    return (
      <ResourceTypeDetails data={dataRow} setOpenDetails={setOpenDetails} />
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
          data={data}
          columns={[
            {
              key: 'id',
              title: 'ID',
              getSortingValue: row => row.id,
              render: row => (
                <Button
                  onClick={() => {
                    handleOpenDetails();
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
            totalRowsCount: 10,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ExecutionsTypes;
