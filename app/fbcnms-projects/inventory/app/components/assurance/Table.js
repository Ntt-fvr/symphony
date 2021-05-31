import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Switch from '@symphony/design-system/components/switch/Switch';
import IconButton from '@symphony/design-system/components/IconButton';
import Grid from '@material-ui/core/Grid';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';



const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

function createData(enable, vendor, technology, edit, delet) {
  return { enable, vendor, technology, edit, delet };
}

const rows = [
  createData(<Switch/>, "Vendor", "Technology", <IconButton  icon={EditIcon} />, <IconButton icon={DeleteIcon} /> ),
  createData(<Switch/>, "Vendor", "Technology", <IconButton  icon={EditIcon} />, <IconButton icon={DeleteIcon} /> ),
  createData(<Switch/>, "Vendor", "Technology", <IconButton  icon={EditIcon} />, <IconButton icon={DeleteIcon} /> ),
  createData(<Switch/>, "Vendor", "Technology", <IconButton  icon={EditIcon} />, <IconButton icon={DeleteIcon} /> ),
  createData(<Switch/>, "Vendor", "Technology", <IconButton  icon={EditIcon} />, <IconButton icon={DeleteIcon} /> ),

];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Enable</TableCell>
            <TableCell align="right">Vendor</TableCell>
            <TableCell align="right">Technology</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.enable}>
              <TableCell component="th" scope="row">
                {row.enable}
              </TableCell>
              <TableCell align="right">{row.vendor}</TableCell>
              <TableCell align="right">{row.technology}</TableCell>
              <TableCell align="right">{row.edit}</TableCell>
              <TableCell align="right">{row.delet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
