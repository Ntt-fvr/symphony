/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@symphony/design-system/components/Table/Table';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));

type Props = $ReadOnly<{||}>;

const tableColumns = [
  {
    key: 'name',
    title: <Button variant="text">Name</Button>,
    getSortingValue: row => row.name,
    render: row => (
      <Button variant="text" skin={'darkGray'} tooltip={row.name ?? ''}>
        {row.name}
      </Button>
    ),
  },
  {
    key: 'location',
    title: <Button variant="text">Value 1</Button>,
    render: row => (
      <Button
        variant="text"
        skin={'darkGray'}
        tooltip={row.location.name ?? ''}>
        {row.location.name}
      </Button>
    ),
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
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'P10177',
    },
    name: 'RNCellDU_Nokia_MLN1_3132332',
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'S17589',
    },
    name: 'RNCellDU_Nokia_MLN1_3132333',
  },
  {
    id: '386547056643',
    key: '386547056643',
    location: {
      id: '219043332105',
      name: 'S19161',
    },
    name: 'RNCellDU_Nokia_MLN1_3132334',
  },
];

const TableConfigurationParameters = (props: Props) => {
  const {} = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
        <Table data={data} columns={tableColumns} />
      </Grid>
    </Grid>
  );
};

export {TableConfigurationParameters};
