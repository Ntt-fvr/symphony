/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import {MenuItem} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  rootTable: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
  selectField: {
    '& .MuiOutlinedInput-root': {
      height: '36px',
    },
  },
}));

type Props = $ReadOnly<{||}>;
const actionTypes = [{}];

const TableConfigurtionParameter = (props: Props) => {
  const {} = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.rootTable}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell style={{width: '50%'}} component="div">
              <fbt desc="">Configuration Parameter</fbt>
            </TableCell>
            <TableCell style={{width: '40%'}} component="div">
              <fbt desc="">Value</fbt>
            </TableCell>
            <TableCell style={{width: '10%'}} component="div">
              <fbt desc="">Delete</fbt>
            </TableCell>
          </TableRow>
        </TableHead>

        {actionTypes?.map((item, i) => (
          <TableRow component="div" key={i}>
            <TableCell component="div" scope="row">
              <FormField>
                <TextField
                  required
                  id="outlined-select-parameter"
                  select
                  className={classes.selectField}
                  placeholder="Select Parameter"
                  name="family"
                  defaultValue=""
                  variant="outlined">
                  <MenuItem>one</MenuItem>
                  <MenuItem>two</MenuItem>
                  <MenuItem>three</MenuItem>
                </TextField>
              </FormField>
            </TableCell>

            <TableCell component="div" scope="row">
              <FormField>
                <TextInput
                  autoFocus={true}
                  placeholder="Value"
                  autoComplete="off"
                  className={classes.input}
                />
              </FormField>
            </TableCell>

            <TableCell component="div" scope="row">
              <FormAction>
                <IconButton aria-label="delete">
                  <DeleteOutlinedIcon color="primary" />
                </IconButton>
              </FormAction>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <FormAction>
        <Button variant="text" leftIcon={PlusIcon}>
          <fbt desc="">Add Parameter</fbt>
        </Button>
      </FormAction>
    </div>
  );
};

export default TableConfigurtionParameter;
