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
import {DARK} from '@symphony/design-system/theme/symphony';

import Text from '@symphony/design-system/components/Text';

import React, {useState} from 'react';

import Indicator from './KqiIndicator';
import {withStyles} from '@material-ui/core/styles';

import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: DARK.D300,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#EDF0F9',
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  id: {},
  asTarget: {
    textAlign: 'center',
  },
}));

function createData(
  id,
  name,
  category,
  associatedTarget,
  perspective,
  source,
  beginTime,
  endTime,
  iD,
  icon,
) {
  return {
    id,
    name,
    category,
    associatedTarget,
    perspective,
    source,
    beginTime,
    endTime,
    iD,
    icon,
  };
}

const data = [
  createData(
    123,
    'TINE Retainability',
    'Technology',
    2,
    'Aggregated',
    1526735162,
    '27/05/21     12:50',
    '24/06/21     17:23',
    1526735162,
    '',
  ),
  createData(
    456,
    'TINE Retainability',
    'Technology',
    20,
    'Aggregated',
    '1526735162',
    '27/05/21     12:50',
    '24/06/21     17:23',
    1526735162,
    '',
  ),
  createData(
    789,
    'TINE Retainability',
    'Technology',
    5,
    'Aggregated',
    1526735162,
    '27/05/21     12:50',
    '24/06/21     17:23',
    1526735162,
    '',
  ),
  createData(
    998,
    'TINE Retainability',
    'Technology',
    5,
    'Aggregated',
    1526735162,
    '27/05/21     12:50',
    '24/06/21     17:23',
    1526735162,
    '',
  ),
];

const KqiTable = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell className={classes.asTarget}>
                Associated target
              </StyledTableCell>
              <StyledTableCell>Perspective</StyledTableCell>
              <StyledTableCell>Source</StyledTableCell>
              <StyledTableCell>Begin Time</StyledTableCell>
              <StyledTableCell>End Time</StyledTableCell>
              <StyledTableCell className={classes.id}>ID</StyledTableCell>
              <StyledTableCell>
                <FilterListIcon />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(column => {
              return (
                <StyledTableRow key={column.id}>
                  <TableCell>
                    <Button onClick={props.viewFormEdit} variant="text">
                      <Text
                        variant={'subtitle1'}
                        weight={'bold'}
                        color={'primary'}>
                        {column.name}
                      </Text>
                    </Button>
                  </TableCell>
                  <TableCell>{column.category}</TableCell>
                  <TableCell>
                    <Indicator>{column.associatedTarget}</Indicator>
                  </TableCell>
                  <TableCell>{column.perspective}</TableCell>
                  <TableCell>{column.source}</TableCell>
                  <TableCell>{column.beginTime}</TableCell>
                  <TableCell>{column.endTime}</TableCell>
                  <TableCell>{column.iD}</TableCell>
                  <TableCell>{column.icon}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default KqiTable;
/**
   {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.center}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })} 




                  {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.center}
                  style={{minWidth: column.minWidth}}>
                  {column.label}
                </StyledTableCell>
              ))} 


// const columns = [
//   {id: 'name', label: 'Name', minWidth: 170},
//   {id: 'category', label: 'Category', minWidth: 170},
//   {
//     id: 'associatedTarget',
//     label: 'Associated Target',
//     minWidth: 170,
//     center: 'right',
//     format: value => value.toFixed(2),
//   },
//   {
//     id: 'perspective',
//     label: 'Perspective',
//     minWidth: 170,
//     center: 'right',
//   },
//   {
//     id: 'source',
//     label: 'Source',
//     minWidth: 170,
//     center: 'center',
//   },
//   {
//     id: 'beginTime',
//     label: 'Begin Time',
//     minWidth: 170,
//     center: 'right',
//   },
//   {
//     id: 'endTime',
//     label: 'End Time',
//     minWidth: 170,
//     center: 'right',
//   },
//   {
//     id: 'iD',
//     label: 'ID',
//     minWidth: 170,
//     center: 'right',
//   },
//   {
//     id: 'icon',
//     label: <FilterListIcon />,
//     minWidth: 170,
//     center: 'right',
//   },
// ];

 */
