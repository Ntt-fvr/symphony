/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {Values} from './TableLogs';

import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: '#73839E',
    padding: '5px 16px',
    border: 'none',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F7FC',
      '& .MuiTableCell-root': {
        border: 'none',
        padding: '6px 16px',
      },
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginBottom: '20px',
  },
  container: {
    maxHeight: '100%',
  },
}));

export type Props = $ReadOnly<{|
  className?: string,
  valuesTable?: Values,
|}>;

const TableDetails = (props: Props) => {
  const {valuesTable, resourceData} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Action Type</StyledTableCell>
              <StyledTableCell>Resource Type</StyledTableCell>
              <StyledTableCell>Resource Specification</StyledTableCell>
              <StyledTableCell>Execution Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell>{valuesTable?.template?.name}</TableCell>
              <TableCell>
                {
                  resourceData.find(
                    item =>
                      item.id == valuesTable?.template?.resourceSpecifications,
                  ).resourceType.name
                }
              </TableCell>
              <TableCell>
                {
                  resourceData.find(
                    item =>
                      item.id == valuesTable?.template?.resourceSpecifications,
                  ).name
                }
              </TableCell>
              <TableCell>{valuesTable?.scheduler?.type}</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export {TableDetails};
