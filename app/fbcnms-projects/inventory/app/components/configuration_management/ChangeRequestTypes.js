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
import ButtonAlarmStatus from './common/ButtonAlarmStatus';
import ButtonsChangeRequest from './common/ButtonsChangeRequest';
import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {ChangeRequestByBulk} from './ChangeRequestByBulk';
import {ChangeRequestDetails} from './ChangeRequestDetails';
import {CircleIndicator} from '../resource_instance/CircleIndicator';
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    marginRight: '24px',
  },
  searchArea: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexGrow: 1,
  },
  buttonOutlined: {
    border: '1px solid',
    color: '#3984FF',
    width: '177px',
    height: '36px',
    borderRadius: '4px',
  },
}));

const tableColumns = [
  {
    key: 'creation date',
    title: 'Creation date',
    render: row => row.creationDate ?? '',
    tooltip: row => row.creationDate ?? '',
  },
  {
    key: 'last modification date',
    title: `${fbt('Last modification date', '')}`,
    render: row => row.lastModificationDate ?? '',
    tooltip: row => row.lastModificationDate ?? '',
  },
  {
    key: 'resource type',
    title: `${fbt('Resource type', '')}`,
    render: row => row.resourceType ?? '',
    tooltip: row => row.resourceType ?? '',
  },
  {
    key: 'change source',
    title: `${fbt('Change source', '')}`,
    render: row => row.changeSource ?? '',
    tooltip: row => row.changeSource ?? '',
  },
  {
    key: 'affected resources',
    title: `${fbt('Affected resources', '')}`,
    render: row => <CircleIndicator>{row.affectedResources}</CircleIndicator>,
    tooltip: row => row.affectedResources ?? '',
  },
  {
    key: 'status',
    title: `${fbt('Status', '')}`,
    render: row => (
      <ButtonAlarmStatus skin={row.status}>{row.status}</ButtonAlarmStatus>
    ),
    tooltip: row => row.status ?? '',
  },
];

const data = [
  {
    id: '686876767',
    key: '01',
    creationDate: '01/03/22',
    lastModificationDate: '01/03/22',
    resourceType: 'RNCellDU01',
    changeSource: 'Manual',
    affectedResources: '1',
    status: 'Succesful',
  },
  {
    id: '686876768',
    key: '02',
    creationDate: '01/04/22',
    lastModificationDate: '01/05/22',
    resourceType: 'RNCellDU02',
    changeSource: 'Manual',
    affectedResources: '6',
    status: 'Scheduled',
  },
];

export type Props = $ReadOnly<{||}>;

const ChangeRequestTypes = () => {
  const [filters, setFilters] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [dataRow, setDataRow] = useState({});
  const [openBulkRequest, setOpenBulkRequest] = useState(false);

  const classes = useStyles();
  const mostrarInfo = data => {
    setDataRow(data);
  };
  const handleOpenDetails = () => {
    setOpenDetails(prevStateDetails => !prevStateDetails);
  };
  const bulk = () => {
    setOpenBulkRequest(prevStateBulk => !prevStateBulk);
  };
  if (openDetails) {
    return (
      <ChangeRequestDetails data={dataRow} setOpenDetails={setOpenDetails} />
    );
  }
  if (openBulkRequest) {
    return (
      <ChangeRequestByBulk
        onClick={() => setOpenBulkRequest(prevStateBulk => !prevStateBulk)}
      />
    );
  }
  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleCounter} item xs={12}>
        <ConfigureTitle
          title={fbt('Change Request', '')}
          subtitle={fbt(
            'Find and manage change request and their details',
            '  ',
          )}
        />
        <ButtonsChangeRequest onClickBulk={bulk} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.bar}>
          <div className={classes.searchBar}>
            <PowerSearchBar
              placeholder="Configuration management"
              getSelectedFilter={filters => setFilters(filters)}
              onFiltersChanged={filters => setFilters(filters)}
              filterConfigs={[]}
              searchConfig={[]}
              exportPath={'/configurations_types'}
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
              key: 'changeId',
              title: 'Change ID',
              getSortingValue: row => row.id,
              render: row => (
                <Button
                  onClick={() => {
                    handleOpenDetails();
                    mostrarInfo(row);
                  }}
                  variant="text"
                  tooltip={row.id ?? ''}>
                  {row.id}
                </Button>
              ),
            },
            ...tableColumns,
          ]}
        />
      </Grid>
    </Grid>
  );
};

export {ChangeRequestTypes};
