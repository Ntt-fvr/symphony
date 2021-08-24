/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';

import type {RemoveFormulaMutationVariables} from '../../mutations/__generated__/RemoveFormulaMutation.graphql';

import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';
import Paper from '@material-ui/core/Paper';
import RemoveFormulaMutation from '../../mutations/RemoveFormulaMutation';
import Switch from '@symphony/design-system/components/switch/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

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
    margin: '10px 0 10px 0',
  },
  table: {
    minWidth: '100%',
  },
  title: {
    color: DARK.D300,
  },
  delete: {
    color: DARK.D300,
  },
}));

type Formula = {
  id: string,
  textFormula: string,
  status: true,
  techFk: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  formulas: Array<Formula>,
  parentEditCallback: any,
  handleEditFormulaClick: any,
|}>;

export default function DenseTable(props: Props) {
  const {formulas, handleEditFormulaClick, parentEditCallback} = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  const handleRemove = id => {
    const variables: RemoveFormulaMutationVariables = {
      id: id,
    };
    RemoveFormulaMutation(variables);
  };

  function handleEditCallback(editFormula: {}) {
    parentEditCallback(editFormula);
  }

  return (
    <Paper variant="outlined">
      <TableContainer className={classes.root}>
        <Table stickyHeader className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Enable</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Technology</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formulas.map(row => (
              <StyledTableRow key={row?.id}>
                <TableCell component="th" scope="row">
                  <Switch
                    title={''}
                    checked={row?.status}
                    onChange={setChecked}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.id}
                </TableCell>
                <TableCell>{row?.techFk?.name}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteOutlinedIcon
                      style={{color: DARK.D300}}
                      onClick={() => {
                        handleRemove(row?.id);
                      }}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => {
                      handleEditCallback({
                        formula: row?.id,
                        textFormula: row?.textFormula,
                        tech: row.techFk?.id,
                        kpiId: row.kpiFk?.id,
                        kpiFk: row.kpiFk?.name,
                      });
                      handleEditFormulaClick();
                    }}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
