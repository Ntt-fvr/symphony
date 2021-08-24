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
import {BLUE} from '@symphony/design-system/theme/symphony';

import Text from '@symphony/design-system/components/Text';

import React, {useState} from 'react';

import Indicator from './KqiIndicator';
import {withStyles} from '@material-ui/core/styles';

import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from '@material-ui/styles';

import DateTimeFormat from '../../common/DateTimeFormat.js';
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
    color: BLUE.B600,
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

type Props = $ReadOnly<{|
  viewFormEdit: () => void,
  onChange: () => void,
  dataValues: any,
|}>;

const KqiTable = (props: Props) => {
  const {dataValues, viewFormEdit} = props;
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
            {dataValues?.map((item, index) => (
              <StyledTableRow key={index}>
                <TableCell>
                  <Button onClick={() => viewFormEdit({item})} variant="text">
                    <Text
                      variant={'subtitle1'}
                      weight={'medium'}
                      color={'primary'}>
                      {item.name}
                    </Text>
                  </Button>
                </TableCell>
                <TableCell>{item.kqiCategory.name}</TableCell>
                <TableCell>
                  <Indicator>1</Indicator>
                </TableCell>
                <TableCell>{item.kqiPerspective.name}</TableCell>
                <TableCell>{item.kqiSource.id}</TableCell>
                <TableCell>
                  {DateTimeFormat.dateOnly(item.startDateTime)}
                </TableCell>
                <TableCell>
                  {DateTimeFormat.dateOnly(item.endDateTime)}
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.icon}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default KqiTable;
