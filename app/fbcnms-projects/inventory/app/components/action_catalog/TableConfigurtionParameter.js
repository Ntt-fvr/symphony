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
import RelayEnvironment from '../../common/RelayEnvironment';
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
import {fetchQuery, graphql} from 'relay-runtime';
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

const paramsQuery = graphql`
  query TableConfigurtionParameterQuery(
    $filter: ConfigurationParameterTypeFilter
  ) {
    queryConfigurationParameterType(filter: $filter) {
      id
      name
    }
  }
`;
type Props = $ReadOnly<{|resourceSpecification: string|}>;

const TableConfigurtionParameter = (props: Props) => {
  const {resourceSpecification, actionItems, setActionItems} = props;
  const classes = useStyles();

  const [configParams, setConfigParams] = useState([]);

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, paramsQuery, {
      filter: {
        resourceSpecification: {
          eq: resourceSpecification ?? '',
        },
      },
    }).then(data => {
      setConfigParams(data?.queryConfigurationParameterType);
    });
  }, [resourceSpecification]);

  const addParam = id => {
    setActionItems([
      ...actionItems,
      {
        id: id,
        parameters: {
          id: '',
        },
        value: {stringValue: ''},
        isDeleted: false,
      },
    ]);
  };

  const updateParam = (id, editParam) => {
    const paramIndex = actionItems.findIndex(item => item.id === id);
    const newParams = [
      ...actionItems.slice(0, paramIndex),
      editParam(actionItems[paramIndex]),
      ...actionItems.slice(paramIndex + 1),
    ];
    setActionItems(newParams);
  };

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.rootTable}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell style={{width: '50%'}} component="div">
              <fbt desc="">Configuration Parameter*</fbt>
            </TableCell>
            <TableCell style={{width: '40%'}} component="div">
              <fbt desc="">Value*</fbt>
            </TableCell>
            <TableCell style={{width: '10%'}} component="div">
              <fbt desc="">Delete</fbt>
            </TableCell>
          </TableRow>
        </TableHead>

        {actionItems
          ?.filter(item => !item.isDeleted)
          ?.map(item => (
            <TableRow component="div" key={item?.id}>
              <TableCell component="div" scope="row">
                <FormField>
                  <TextField
                    required
                    id="outlined-select-parameter"
                    select
                    className={classes.selectField}
                    placeholder="Select Parameter"
                    name="family"
                    variant="outlined"
                    value={item.parameters?.id}
                    onChange={e => {
                      e.preventDefault();
                      updateParam(item?.id, pt => ({
                        ...pt,
                        parameters: {
                          id: e.target.value,
                        },
                      }));
                    }}>
                    {configParams?.map(param => (
                      <MenuItem
                        key={param.id}
                        value={param.id}
                        disabled={
                          param.id != item.parameters.id &&
                          actionItems
                            .filter(i => !i.isDeleted)
                            .map(i => i.parameters.id)
                            .includes(param.id)
                        }>
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
                    value={item?.value?.stringValue}
                    onChange={e => {
                      e.preventDefault();
                      updateParam(item?.id, pt => ({
                        ...pt,
                        value: {
                          stringValue: e.target.value,
                        },
                      }));
                    }}
                  />
                </FormField>
              </TableCell>

              <TableCell component="div" scope="row">
                <FormAction>
                  <IconButton
                    aria-label="delete"
                    onClick={e => {
                      e.preventDefault();
                      updateParam(item?.id, pt => ({
                        ...pt,
                        isDeleted: true,
                      }));
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
