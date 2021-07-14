/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';

// DESING SYSTEM //
import ActiveButton from './ActiveButton';
import Button from '@symphony/design-system/components/Button';

import IconButton from '@symphony/design-system/components/IconButton';
import Paper from '@material-ui/core/Paper';
import Switch from '@symphony/design-system/components/switch/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

import FilterListIcon from '@material-ui/icons/FilterList';

import {BLUE} from '@symphony/design-system/theme/symphony';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0',
  },
  table: {
    minWidth: '100%',
  },
  name: {
    color: BLUE.B600,
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: BLUE.B600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    '',
    'ancorName',
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    'Button',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '321',
    <Switch />,
    'ancorName',
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    'Button',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '234',
    '',
    'ancorName',
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    'Button',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '432',
    <Switch />,
    'ancorName',
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    'Button',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
  createData(
    '345',
    <Switch />,
    'ancorName',
    '27/05/21     12:50',
    'AMS/OLT-SYS-AL1/rack=',
    'Button',
    '27/05/21     12:50',
    '24/06/21     17:23',
    '1526735162',
  ),
];
// CREAR PROP PARA MOSTRAR EL COMPONENTE PAPER component=Paper
export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Enable</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Creation Time</StyledTableCell>
            <StyledTableCell align="left">Network Resource</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Begin Time</StyledTableCell>
            <StyledTableCell align="left">End Time</StyledTableCell>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">
              <IconButton icon={FilterListIcon} />,
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.enable}
              </TableCell>
              <TableCell>
                <Button variant="text">
                  <Text className={classes.name}>{row.name}</Text>
                </Button>
              </TableCell>
              <TableCell>{row.creationTime}</TableCell>
              <TableCell>{row.networkResource}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.beginTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell>{row.iD}</TableCell>
              <TableCell>{row.icon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
