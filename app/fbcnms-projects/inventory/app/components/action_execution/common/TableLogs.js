/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: '#73839E',
    padding: '12px 16px',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F7FC',
      '& .MuiTableCell-root': {
        padding: '14px 16px',
      },
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    boxShadow: symphony.shadows.DP1,
    marginBottom: '20px',
  },
  container: {
    maxHeight: '100%',
  },
}));

export type Logs = {
  actionExecutionEndTime: string,
  actionExecutionStartTime: string,
};

export type Values = {
  actionTempleate: string,
  executionResult: string,
  executionTime: string,
  executionType: string,
  id: string,
  id: string,
  resourceSpecification: string,
  resourceType: string,
  logs: Logs,
};

export type Props = $ReadOnly<{|
  className?: string,
  valuesTable: Values,
|}>;

const TableLogs = (props: Props) => {
  const {valuesTable} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Logs</StyledTableCell>
              <StyledTableCell>Data Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell>Action execution start time</TableCell>
              <TableCell>{valuesTable.logs.actionExecutionStartTime}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Action execution end time</TableCell>
              <TableCell>{valuesTable.logs.actionExecutionEndTime}</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export {TableLogs};
