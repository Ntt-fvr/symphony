/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

// import Button from '@symphony/design-system/components/Button';
import Button from '@material-ui/core/Button';
import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
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
}));
const tableColumns = [
  {
    key: 'change',
    title: 'Change ID',
    getSortingValue: row => row.name,
    render: row => (
      <Button
        disableRipple
        variant="text"
        color="primary"
        tooltip={row.name ?? ''}>
        {row.name}
      </Button>
    ),
  },
  {
    key: 'creation date',
    title: 'Creation date',
    render: row => row.location.name ?? '',
    tooltip: row => row.location.name ?? '',
  },
  {
    key: 'last modification date',
    title: `${fbt('Last modification date', '')}`,
    render: row => row.arfcndu?.name ?? '',
    tooltip: row => row.arfcndu?.name ?? '',
  },
  {
    key: 'resource type',
    title: `${fbt('Resource type', '')}`,
    render: row => row.nRTAC?.name ?? '',
    tooltip: row => row.nRTAC?.name ?? '',
  },
  {
    key: 'change source',
    title: `${fbt('Change source', '')}`,
    render: row => row.nRTAC?.name ?? '',
    tooltip: row => row.nRTAC?.name ?? '',
  },
  {
    key: 'affected resources',
    title: `${fbt('Affected resources', '')}`,
    render: row => row.nRTAC?.name ?? '',
    tooltip: row => row.nRTAC?.name ?? '',
  },
  {
    key: 'status',
    title: `${fbt('Status', '')}`,
    render: row => row.nRTAC?.name ?? '',
    tooltip: row => row.nRTAC?.name ?? '',
  },
];

const data = [
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'S17161',
    },
    name: 'RNCellDU_Nokia_MLN1_3132331',
    priority: 'NONE',
    arfcndu: {
      id: '240518168576',
      name: '10000',
    },
    nRTAC: {
      id: '399431958528',
      name: '10000',
    },
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'P10177',
    },
    name: 'RNCellDU_Nokia_MLN1_3132332',
    priority: 'NONE',
    arfcndu: {
      id: '240518168576',
      name: '396000',
    },
    nRTAC: {
      id: '399431958528',
      name: '9001',
    },
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'S17589',
    },
    name: 'RNCellDU_Nokia_MLN1_3132333',
    priority: 'NONE',
    arfcndu: {
      id: '240518168576',
      name: '370000',
    },
    nRTAC: {
      id: '399431958528',
      name: '8800',
    },
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'S19161',
    },
    name: 'RNCellDU_Nokia_MLN1_3132334',
    priority: 'NONE',
    arfcndu: {
      id: '240518168576',
      name: '382000',
    },
    nRTAC: {
      id: '399431958528',
      name: '2500',
    },
  },
];

const ChangeRequestTypes = () => {
  const [filters, setFilters] = useState([]);

  const classes = useStyles();

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
        <Grid>
          <Button size="medium" variant="outlined" color="primary">
            <Text useEllipsis={true} color={'primary'}>
              NF Initial Configuration
            </Text>
          </Button>

          <Button
            style={{padding: '10px 16px', margin: '0 0 0 20px'}}
            variant="contained"
            color="primary">
            Create bulk request
          </Button>
        </Grid>
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
        <Table data={data} columns={tableColumns} />
      </Grid>
    </Grid>
  );
};

export {ChangeRequestTypes};
