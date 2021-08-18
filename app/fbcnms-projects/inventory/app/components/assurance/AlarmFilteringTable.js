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

import {AlarmFilteringStatus} from './AlarmFilteringStatus';

import {makeStyles} from '@material-ui/styles';

import DateTimeFormat from '../../common/DateTimeFormat.js';
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
    color: '#3984FF',
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
    maxHeight: '500px',
  },
  table: {
    minWidth: 750,
  },
}));

type Props = $ReadOnly<{|
  edit: () => void,
  onChange: () => void,
  dataValues: any,
|}>;

const AlarmFilteringTable = (props: Props) => {
  const {dataValues, edit} = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checked, setChecked] = useState();

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
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Enable</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Creation Time</StyledTableCell>
              <StyledTableCell>Network Resource</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Begin Time</StyledTableCell>
              <StyledTableCell>End Time</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataValues
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow tabIndex={-1} key={index}>
                  <TableCell>
                    <Switch
                      title={''}
                      checked={item.enable}
                      onChange={setChecked}
                    />
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => edit({item})}>
                      {item.name}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {DateTimeFormat.dateTime(item.creationTime)}
                  </TableCell>
                  <TableCell>{item.networkResource}</TableCell>
                  <TableCell>
                    <AlarmFilteringStatus
                      creationDate={item.creationTime}
                      beginDate={item.beginTime}
                      endDate={item.endTime}
                    />
                  </TableCell>
                  <TableCell>
                    {DateTimeFormat.dateTime(item.beginTime)}
                  </TableCell>
                  <TableCell>{DateTimeFormat.dateTime(item.endTime)}</TableCell>
                  <TableCell>{item.id}</TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={dataValues?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default AlarmFilteringTable;
