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

import IconButton from '@symphony/design-system/components/IconButton';

import KqiFormEdit from './KqiFormEdit';

import React, {useState} from 'react';

import AddButton from './common/AddButton';
import Indicator from './KqiIndicator';
import Switch from './common/Switch';
import {withStyles} from '@material-ui/core/styles';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Text from '@symphony/design-system/components/Text';

import CardContent from '@material-ui/core/CardContent';
import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';

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
  head: {},
  containerTitle: {
    height: '64px',
    padding: '0',
    margin: '0',
    borderBottom: '2px solid #F5F7FC',
  },
  title: {
    marginLeft: '2rem',
  },
  plusButton: {
    marginLeft: '5rem',
  },
}));

function createData(
  id,
  enable,
  targetName,
  comparator,
  warningComparator,
  periods,
  allowedVariation,
  activeHours,
  deleteIcon,
) {
  return {
    id,
    enable,
    targetName,
    comparator,
    warningComparator,
    periods,
    allowedVariation,
    activeHours,
    deleteIcon,
  };
}

const data = [
  createData(
    '123',
    '',
    'SLO TTLI Customer 1',
    'NQE 0.04',
    '0.3',
    '1',
    '0.01',
    '06-18',
    '',
  ),
  createData(
    '456',
    '',
    'SLO TTLI Customer 1',
    'NQE 0.04',
    '0.3',
    '1',
    '0.01',
    '06-18',
    '',
  ),
  createData(
    '789',
    '',
    'SLO TTLI Customer 1',
    'NQE 0.04',
    '0.3',
    '1',
    '0.01',
    '06-18',
    '',
  ),
  createData(
    '098',
    '',
    'SLO TTLI Customer 1',
    'NQE 0.04',
    '0.3',
    '1',
    '0.01',
    '06-18',
    '',
  ),
];

const KqiTableAssociatedTarget = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Grid container alignItems="center" className={classes.containerTitle}>
          <Grid xs={10}>
            <Text className={classes.title} variant="h6" weight="bold">
              Associated targets
            </Text>
          </Grid>
          <Grid xs={2}>
            <AddButton
              className={classes.plusButton}
              textButton={'Add targert'}
              disabled={false}
            />
          </Grid>
        </Grid>
        <Table className={classes.head} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Enable</StyledTableCell>
              <StyledTableCell>Target name</StyledTableCell>
              <StyledTableCell>Comparator</StyledTableCell>
              <StyledTableCell>Warning comparator</StyledTableCell>
              <StyledTableCell>Periods</StyledTableCell>
              <StyledTableCell>Allowed Variation</StyledTableCell>
              <StyledTableCell>Active Hours</StyledTableCell>
              <StyledTableCell className={classes.id}>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(column => {
              return (
                <StyledTableRow key={column.id}>
                  <TableCell>
                    <Switch />
                  </TableCell>
                  <TableCell>
                    <Button onClick={props.viewFormEdit} variant="text">
                      {column.targetName}
                    </Button>
                  </TableCell>
                  <TableCell>{column.comparator}</TableCell>
                  <TableCell>{column.warningComparator}</TableCell>
                  <TableCell>{column.periods}</TableCell>
                  <TableCell>{column.allowedVariation}</TableCell>
                  <TableCell>{column.activeHours}</TableCell>
                  <TableCell>
                    <IconButton
                      variant="text"
                      skin={'gray'}
                      icon={DeleteOutlinedIcon}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default KqiTableAssociatedTarget;
