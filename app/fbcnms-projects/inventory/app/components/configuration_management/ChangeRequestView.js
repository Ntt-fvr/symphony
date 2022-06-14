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
import ButtonsChangeRequest from './common/ButtonsChangeRequest';
import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useMemo, useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {ChangeRequestByBulk} from './ChangeRequestByBulk';
import {ChangeRequestDetails} from './ChangeRequestDetails';
import {Grid} from '@material-ui/core';
import {ResourcesSearchConfig_2} from './ResourcesSearchConfig';
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
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexGrow: 1,
  },
}));

const tableColumns = [];
const data = [];
const PROJECTS_PAGE_SIZE = 1;

export type Props = $ReadOnly<{||}>;

const ChangeRequestView = () => {
  const [filters, setFilters] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [dataRow, setDataRow] = useState({});
  const [openBulkRequest, setOpenBulkRequest] = useState(false);
  const classes = useStyles();
  const showInfo = data => {
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

export {ChangeRequestView};
