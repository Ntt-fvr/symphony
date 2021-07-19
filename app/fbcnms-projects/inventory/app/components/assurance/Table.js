/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

/*[object Object]*/
// eslint-disable-next-line header/header

import React from 'react';

// DESING SYSTEM //
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@symphony/design-system/components/IconButton';
import Switch from '@symphony/design-system/components/switch/Switch';
import {makeStyles} from '@material-ui/core/styles';
import {EditIcon} from '@symphony/design-system/icons';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {DARK} from '@symphony/design-system/theme/symphony';

const useStyles = makeStyles({
  root: {
    margin: '10px 0',
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
});

function createData(enable, vendor, technology, edit, delet) {
  return {enable, vendor, technology, edit, delet};
}

const rows = [
  createData(
    <Switch />,
    'Vendor',
    'Technology',
    <IconButton icon={EditIcon} />,
    <DeleteOutlinedIcon style={{ color: DARK.D300 }} />,
  ),
  createData(
    <Switch />,
    'Vendor',
    'Technology',
    <IconButton icon={EditIcon} />,
    <DeleteOutlinedIcon style={{ color: DARK.D300 }} />,
  ),
  createData(
    <Switch />,
    'Vendor',
    'Technology',
    <IconButton icon={EditIcon} />,
    <DeleteOutlinedIcon style={{ color: DARK.D300 }} />,
  ),
  createData(
    <Switch />,
    'Vendor',
    'Technology',
    <IconButton icon={EditIcon} />,
    <DeleteOutlinedIcon style={{ color: DARK.D300 }} />,
  ),
  createData(
    <Switch />,
    'Vendor',
    'Technology',
    <IconButton icon={EditIcon} />,
    <DeleteOutlinedIcon style={{ color: DARK.D300 }} />,
  ),
];
// CREAR PROP PARA MOSTRAR EL COMPONENTE PAPER component=Paper
export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table} size="small" aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.title}>Enable</TableCell>
            <TableCell className={classes.title}>Vendor</TableCell>
            <TableCell className={classes.title}>Technology</TableCell>
            <TableCell className={classes.title}>Edit</TableCell>
            <TableCell className={classes.title}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.enable}>
              <TableCell component="th" scope="row">{row.enable}</TableCell>
              <TableCell>{row.vendor}</TableCell>
              <TableCell>{row.technology}</TableCell>
              <TableCell>{row.edit}</TableCell>
              <TableCell>{row.delet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
