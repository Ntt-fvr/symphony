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
import ButtonAlarmStatus from './ButtonAlarmStatus';
import DialogExecutionDetails from './DialogExecutionDetails';
import IconButton from '@symphony/design-system/components/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: '#73839E',
    padding: '15px 16px',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F7FC',
      '& .MuiTableCell-root': {
        padding: '10px 16px',
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
  buttonStatus: {
    height: '34px',
  },
  iconVisibility: {
    marginRight: '40px',
  },
}));
export type Props = $ReadOnly<{|
  className?: string,
  valuesTable: any,
|}>;
const dataResourceType = [
  {
    name: 'RNCellDU_Nokia_MLN1_3132331',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132332',
    executionResult: 'Faild',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132333',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132334',
    executionResult: 'Faild',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132335',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132336',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132337',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132338',
    executionResult: 'Succesful',
  },
  {
    name: 'RNCellDU_Nokia_MLN1_3132339',
    executionResult: 'Succesful',
  },
];

const TableAffectedResources = (props: Props) => {
  const {} = props;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [page, setPage] = useState(0);

  const openModalDetails = () => {
    setOpenModal(prevStateModal => !prevStateModal);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Resource Type</StyledTableCell>
              <StyledTableCell>Execution Result</StyledTableCell>
              <StyledTableCell>View Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataResourceType
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <ButtonAlarmStatus
                      className={classes.buttonStatus}
                      skin={item.executionResult}>
                      {item.executionResult}
                    </ButtonAlarmStatus>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconVisibility}
                      skin="gray"
                      icon={RemoveRedEyeIcon}
                      onClick={openModalDetails}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 4, 5]}
        component="div"
        count={dataResourceType.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {openModal && (
        <DialogExecutionDetails
          name={'Execution Details'}
          onClose={openModalDetails}
        />
      )}
    </div>
  );
};
export {TableAffectedResources};
