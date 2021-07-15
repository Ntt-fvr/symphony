/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import Button from '@material-ui/core/Button';

import React, {useState} from 'react';

import {withStyles} from '@material-ui/core/styles';

import {
  StatusActive,
  StatusClosed,
  StatusPending,
} from './AlarmFilteringStatus';

import {makeStyles} from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Switch from '@symphony/design-system/components/switch/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: 'blue',
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
    maxHeight: '440px',
  },
}));

const columns = [
  {id: 'enable', label: 'Enable', minWidth: 170},
  {id: 'name', label: 'Name', minWidth: 170},
  {
    id: 'creationTime',
    label: 'Creation Time',
    minWidth: 170,
    center: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'networkResource',
    label: 'Network Resource',
    minWidth: 170,
    center: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    center: 'center',
  },
  {
    id: 'beginTime',
    label: 'Begin Time',
    minWidth: 170,
    center: 'right',
  },
  {
    id: 'endTime',
    label: 'End Time',
    minWidth: 170,
    center: 'right',
  },
  {
    id: 'iD',
    label: 'ID',
    minWidth: 170,
    center: 'right',
  },
  {
    id: 'icon',
    label: 'Icon',
    minWidth: 170,
    center: 'right',
  },
];

function createData(
  id,
  enable,
  name,
  creationTime,
  networkResource,
  status,
  beginTime,
  endTime,
  iD,
  icon,
) {
  return {
    id,
    enable,
    name,
    creationTime,
    networkResource,
    status,
    beginTime,
    endTime,
    iD,
    icon,
  };
}

const rows = [
  createData(
    '123',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusActive />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '234',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusPending />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '345',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusClosed />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '456',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    '',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '567',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    '',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '678',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusPending />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '789',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    '',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '890',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    '',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '909',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusActive />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '987',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    '',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '876',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusPending />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '765',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusPending />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '654',
    <Switch />,
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusActive />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '543',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusActive />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '432',
    '',
    <Button color="primary">ancorName</Button>,
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    <StatusActive />,
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
];

const AlarmFilteringTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.center}
                  style={{minWidth: column.minWidth}}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <StyledTableRow role="checkbox" tabIndex={-1} key={row.id}>
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
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default AlarmFilteringTable;
