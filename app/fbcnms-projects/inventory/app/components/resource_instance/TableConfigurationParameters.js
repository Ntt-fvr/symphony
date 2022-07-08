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
import { useEffect } from 'react';
import Button from '@symphony/design-system/components/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: symphony.palette.D500,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F7FC',
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    boxShadow: symphony.shadows.DP2,
    marginBottom: '20px',
  },
  container: {
    maxHeight: '100%',
  },
}));

const TYPES = {
  string: 'stringValue',
  int: 'intValue',
  float: 'floatValue',
  enum: 'stringValue',
};

const TableConfigurationParameters = (props: Props) => {
  const {ConfigurationParameters, setComparationCurrent, setCurrentVersion} = props;
  const classes = useStyles();
  const items = ConfigurationParameters?.parameters;

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Value 1</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item, index) => (
              <StyledTableRow key={index}>
                <TableCell>{item?.parameterType?.name}</TableCell>
                <TableCell>{item[TYPES[item.parameterType.type]]}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export {TableConfigurationParameters};
