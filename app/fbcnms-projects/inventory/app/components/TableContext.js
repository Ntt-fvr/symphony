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

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import Chip from '@material-ui/core/Chip';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableTypesDispatcher from './context/TableTypesDispatcher';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import inventoryTheme from '../common/theme';
import {Grid, MenuItem} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {sortByIndex} from './draggable/DraggableUtils';
import {useContext} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '20px',
  },
  formField: {
    ...inventoryTheme.formField,
  },
  containerAccordion: {
    ...inventoryTheme.containerAccordion,
  },
  selectCard: {
    '& .MuiOutlinedInput-input': {
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      marginLeft: '10px',
      height: '34px',
    },
  },
  chip: {
    marginRight: 10,
    backgroundColor: '#EDF3FE',
    borderRadius: 4,
    height: 23,
  },
}));

type Props = $ReadOnly<{|
  tableTypes: Array<TableType>,
  nameCard: string,
  selectMultiple?: boolean,
  data: any,
  // supportDelete?: boolean,
|}>;

const TableContextForm = ({
  tableTypes,
  nameCard,
  selectMultiple,
  data,
}: // supportDelete,
Props) => {
  const classes = useStyles();
  const {dispatch} = useContext(TableTypesDispatcher);
  const [selectChip, setSelectChip] = useState([]);

  return (
    <div className={classes.root}>
      <Accordion className={classes.containerAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>{nameCard} Definitions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item container xs>
            <Table component="div" className={classes.root}>
              <TableHead component="div">
                <TableRow component="div">
                  <TableCell component="div">Name</TableCell>
                  {selectMultiple ? null : (
                    <TableCell component="div">
                      {nameCard} Specification
                    </TableCell>
                  )}
                  <TableCell component="div">Delete</TableCell>
                </TableRow>
              </TableHead>
              {tableTypes
                .filter(pt => !pt.isDeleted)
                .sort(sortByIndex)
                .map((item, i) => (
                  <TableRow component="div">
                    {selectMultiple ? (
                      <TableCell component="div" scope="row">
                        <Select
                          multiple
                          fullWidth
                          defaultValue=""
                          value={selectChip}
                          onChange={({target}) => {
                            setSelectChip(target.value);
                            dispatch({
                              type: 'UPDATE_PROPERTY_TYPE_NAME',
                              ...item,
                              name: target.value,
                            });
                          }}
                          input={
                            <OutlinedInput className={classes.selectCard} />
                          }
                          renderValue={selected => (
                            <>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  onDelete={'handleDelete'}
                                  className={classes.chip}
                                />
                              ))}
                            </>
                          )}>
                          {data.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell component="div" scope="row">
                          <FormField>
                            <TextField
                              className={classes.formField}
                              label={`Select ${nameCard} Specifications `}
                              variant="outlined"
                              autoComplete="off"
                              defaultValue=""
                              fullWidth
                              value={item.name}
                              onChange={({target}) =>
                                dispatch({
                                  type: 'UPDATE_PROPERTY_TYPE_NAME',
                                  ...item,
                                  id: item.id,
                                  name: target.value,
                                })
                              }
                              onBlur={() =>
                                dispatch({
                                  type: 'UPDATE_PROPERTY_TYPE_NAME',
                                  ...item,
                                  id: item.id,
                                  name: item.name.trim(),
                                })
                              }
                            />
                          </FormField>
                        </TableCell>
                        <TableCell>
                          <FormField>
                            <TextField
                              className={classes.formField}
                              required
                              select
                              label={'Select  Specifications'}
                              variant="outlined"
                              fullWidth
                              value={item.resourceSpecification ?? ''}
                              defaultValue=""
                              onChange={({target}) => {
                                dispatch({
                                  type: 'UPDATE_PROPERTY_TYPE_NAME',
                                  ...item,
                                  resourceSpecification: target.value,
                                });
                              }}>
                              {data.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </FormField>
                        </TableCell>
                      </>
                    )}
                    <TableCell component="div">
                      <FormAction>
                        <IconButton>
                          <DeleteOutlinedIcon
                            color="primary"
                            onClick={() =>
                              dispatch({
                                type: 'DELETE_PROPERTY_TYPE',
                                id: item.id,
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
                Add Relationship
              </Button>
            </FormAction>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TableContextForm;
