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
import DialogExecuteNow from './common/DialogExecuteNow';
import Divider from '@material-ui/core/Divider';
import IconButton from '@symphony/design-system/components/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useState} from 'react';
import ResourceFilterDropDown from './resource-filter/ResourceFilterDropDown';
import Switch from '@material-ui/core/Switch';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {CreateAction} from './CreateAction';
import {Grid} from '@material-ui/core';
import {ResourceCriteriaConfig} from './resource-filter/ResourceCriteriaConfig';
import {getSelectedFilter} from '../comparison_view/FilterUtils';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

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
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  searchArea: {
    backgroundColor: symphony.palette.D10,
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
    status: false,
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
    status: false,
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
    status: true,
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
    status: true,
  },
];
export const PROJECTS_PAGE_SIZE = 15;

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.grey[500],
  },
  checked: {},
}))(Switch);

const ScheduledActionsTypes = () => {
  const classes = useStyles();
  const [openCreateAction, setOpenCreateAction] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataRow, setDataRow] = useState({});
  const [selectedSpecification, setSelectedSpecification] = useState('');
  const [rows, setRows] = useState(data);

  const handleChange = (value, id) => {
    const index = rows.findIndex(item => item.id == id);
    const updateAction = action => {
      return {
        ...action,
        status: value,
      };
    };
    setRows([
      ...rows.slice(0, index),
      updateAction(rows[index]),
      ...rows.slice(index + 1),
    ]);
  };

  const handleOpenModal = dataRow => {
    setOpenModal(prevStateOpenModal => !prevStateOpenModal);
    setDataRow(dataRow);
  };

  const filterConfigs = ResourceCriteriaConfig.map(ent => ent.filters).reduce(
    (allFilters, currentFilter) => allFilters.concat(currentFilter),
    [],
  );

  const handleCreateAction = () => {
    setOpenCreateAction(setStateCreateAction => !setStateCreateAction);
  };
  if (openCreateAction) {
    return <CreateAction />;
  }

  const onFiltersChanged = data => {
    console.log(data);
  };

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
        <div className={classes.searchArea}>
          <div className={classes.searchBar}>
            <Grid div className={classes.backgroundWhite}>
              <ResourceFilterDropDown
                onEntitySelected={spec => setSelectedSpecification(spec)}
              />
            </Grid>
            <Divider orientation="vertical" />
            <PowerSearchBar
              filterValues={[]}
              placeholder="Filter Resource Type"
              getSelectedFilter={filterConfig =>
                getSelectedFilter(filterConfig, [])
              }
              onFiltersChanged={onFiltersChanged}
              filterConfigs={filterConfigs}
              searchConfig={ResourceCriteriaConfig}
              entity={'SERVICE'}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
        <Table
          data={rows}
          columns={[
            {
              key: 'status',
              title: `${fbt('Status', '')}`,
              render: row =>
                (
                  <AntSwitch
                    key={row.id}
                    onChange={e => {
                      handleChange(e.target.checked, row.id);
                    }}
                    checked={row.status}
                    inputProps={{'aria-label': 'ant design'}}
                  />
                ) ?? '',
            },
            ...tableColumns,
            {
              key: 'executeNow',
              title: `${fbt('Execute Now', '')}`,
              render: row => (
                <IconButton
                  tooltip={row.id ?? ''}
                  skin="gray"
                  icon={LaunchIcon}
                  onClick={() => handleOpenModal(row)}
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
      {openModal && (
        <DialogExecuteNow
          dataRow={dataRow}
          onClose={() =>
            setOpenModal(prevStateOpenModal => !prevStateOpenModal)
          }
        />
      )}
    </Grid>
  );
};

export {ScheduledActionsTypes};
