/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useEffect, useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import TABLE_VARIANT_TYPES from '@symphony/design-system/components/Table/Table';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import moment from 'moment';

export const PROJECTS_PAGE_SIZE = 15;
export type Props = $ReadOnly<{|
  dataConfig?: any,
  selectResourceType2?: any,
  dataColumn?: any,
|}>;

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '400px',
    height: '200px',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      'box-shadow': 'inset 0 0 5px grey',
      'border-radius': '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'grey',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'darkGrey',
    },
  },
}));

const dataColumn = [
  {
    key: 'dateCreated',
    title: 'Date Created',
    render: row => moment(row.startDate).format('MM/DD/YY-HH:MM:SS') ?? '',
  },
  {
    key: 'author',
    title: 'Author',
    render: row => row.author,
  },
  {
    key: 'description',
    title: 'Description',
    render: row => row.description,
  },
];

const dataConfig = [
  {
    id: '1001',
    key: '1001',
    startDate: '2022-07-28T01:05:07.230Z',
    author: 'author 1',
    description: 'test desription 1',
  },
  {
    id: '1002',
    key: '1002',
    startDate: '2022-07-28T01:05:07.230Z',
    author: 'author 2',
    description: 'test desription 2',
  },
  {
    id: '1003',
    key: '1003',
    startDate: '2022-07-28T01:05:07.230Z',
    author: 'author 3',
    description: 'test desription 3',
  },
  {
    id: '1004',
    key: '1004',
    startDate: '2022-07-28T01:05:07.230Z',
    author: 'author 4',
    description: 'test desription 4',
  },
];
const FlowLogsTable = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Table
        data={dataConfig}
        columns={dataColumn}
        variant={TABLE_VARIANT_TYPES.embedded}
      />
    </Grid>
  );
};

export {FlowLogsTable};
