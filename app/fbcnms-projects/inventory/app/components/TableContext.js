/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {TableType} from './context/TableTypeState';

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
import TableTypesDispatcher from './context/TableTypesDispatcher';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../common/theme';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {sortByIndex} from './draggable/DraggableUtils';
import {useContext} from 'react';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  root: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
  gridRight: {
    '& div': {
      padding: '0',
    },
  },
  checkbox: {
    textAlign: 'center',
    '& div': {
      justifyContent: 'center',
    },
  },
  selectMenu: {
    height: '14px',
  },
  actionsBar: {
    width: '20px',
  },
}));

type Props = $ReadOnly<{|
  tableTypes: Array<TableType>,
  // supportDelete?: boolean,
|}>;

const TableContextForm = ({
  tableTypes,
}: // supportDelete,
Props) => {
  const classes = useStyles();
  const {dispatch} = useContext(TableTypesDispatcher);

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.root}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell component="div">Name</TableCell>
            <TableCell className={classes.checkbox} component="div">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        {tableTypes
          .filter(pt => !pt.isDeleted)
          .sort(sortByIndex)
          .map((property, i) => (
            <TableRow component="div">
              <TableCell component="div" scope="row">
                <FormField>
                  <TextInput
                    autoFocus={true}
                    placeholder="Name"
                    autoComplete="off"
                    className={classes.input}
                    value={property.name}
                    onChange={({target}) =>
                      dispatch({
                        type: 'UPDATE_PROPERTY_TYPE_NAME',
                        id: property.id,
                        name: target.value,
                      })
                    }
                    onBlur={() =>
                      dispatch({
                        type: 'UPDATE_PROPERTY_TYPE_NAME',
                        id: property.id,
                        name: property.name.trim(),
                      })
                    }
                  />
                </FormField>
              </TableCell>
              <TableCell className={classes.checkbox} component="div">
                <FormAction>
                  <IconButton>
                    <DeleteOutlinedIcon
                      color="primary"
                      onClick={() =>
                        dispatch({
                          type: 'DELETE_PROPERTY_TYPE',
                          id: property.id,
                        })
                      }
                    />
                  </IconButton>
                </FormAction>
              </TableCell>
            </TableRow>
          ))}
      </Table>
      <FormAction>
        <Button
          variant="text"
          onClick={() => dispatch({type: 'ADD_PROPERTY_TYPE'})}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Property</fbt>
        </Button>
      </FormAction>
    </div>
  );
};

export default TableContextForm;
