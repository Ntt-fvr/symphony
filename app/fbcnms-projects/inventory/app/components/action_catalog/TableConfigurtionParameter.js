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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import React, {useCallback, useEffect, useState} from 'react';
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
import {fetchQuery,graphql} from 'relay-runtime';
import RelayEnvironment from '../../common/RelayEnvironment';

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


const paramsQuery = graphql`
  query TableConfigurtionParameterQuery{
    queryConfigurationParameterType{
      id
      name
    }
  }
`
type Props = $ReadOnly<{|id:string|}>;

const TableConfigurtionParameter = (props: Props) => {
  const {id} = props;
  const classes = useStyles();
  const [actionItems, setActionTypes] = useState([{id: 0}]);
  const [configParams, setConfigParams] = useState([]);

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, paramsQuery, {}).then(data => {
      setConfigParams(data?.queryConfigurationParameterType);
    });
    setActionTypes([{id:0}]);
  }, [setActionTypes]);

  const addParam = id => {
    setActionTypes([...actionItems, {id: id}]);
  };

  const deleteParam = id => {
    const params = actionItems;
    setActionTypes(params.filter(prt => prt.id !== id));
  };

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

        {actionItems?.map(item => (
          <TableRow component="div" key={item.id}>
            <TableCell component="div" scope="row">
              <FormField>
                <TextField
                  required
                  id="outlined-select-parameter"
                  select
                  className={classes.selectField}
                  placeholder="Select Parameter"
                  name="family"
                  variant="outlined">
                  {configParams?.map(param => (
                    <MenuItem key={param.id} value={param.id}>
                      {param.name}
                    </MenuItem>
                  ))}
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
                <IconButton
                  aria-label="delete"
                  onClick={e => {
                    e.preventDefault();
                    deleteParam(item.id);
                  }}>
                  <DeleteOutlinedIcon color="primary" />
                </IconButton>
              </FormAction>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <FormAction>
        <Button
          variant="text"
          leftIcon={PlusIcon}
          onClick={e => {
            e.preventDefault();
            addParam(actionItems.length);
          }}>
          <fbt desc="">Add Parameter</fbt>
        </Button>
      </FormAction>
    </div>
  );
};

export default TableConfigurtionParameter;
