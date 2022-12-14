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
import CancelIcon from '@material-ui/icons/Cancel';
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
import {without} from 'lodash';

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
      height: '36px',
    },
    width: 850,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
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
  vlan?: boolean,
  items?: boolean,
  data: any,
  // supportDelete?: boolean,
|}>;

const TableContextForm = ({
  tableTypes,
  nameCard,
  selectMultiple,
  vlan,
  items,
  data,
}: // supportDelete,
Props) => {
  const classes = useStyles();
  const {dispatch} = useContext(TableTypesDispatcher);
  const [selectChip, setSelectChip] = useState([]);
  const lengthR = tableTypes.filter(o => o.name.length !== 0);

  const handleDelete = (e, value) => {
    e.preventDefault();
    setSelectChip(current => without(current, value));
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.containerAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography color="primary">
            {nameCard} Definitions: {lengthR.length} Relationships
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item container xs>
            <Table component="div" className={classes.root}>
              <TableHead component="div">
                <TableRow component="div">
                  {selectMultiple && (
                    <TableCell component="div">
                      {nameCard} Specification
                    </TableCell>
                  )}
                  {vlan && (
                    <>
                      <TableCell component="div">{nameCard} Type</TableCell>
                      <TableCell component="div">
                        Resource Specification
                      </TableCell>
                      <TableCell component="div">Quantity</TableCell>
                    </>
                  )}
                  {items && (
                    <>
                      <TableCell component="div">{nameCard} Name</TableCell>
                      <TableCell component="div">
                        {nameCard} Specification
                      </TableCell>
                    </>
                  )}
                  {selectMultiple ? null : (
                    <TableCell component="div">Delete</TableCell>
                  )}
                </TableRow>
              </TableHead>
              {tableTypes
                .filter(pt => !pt.isDeleted)
                .sort(sortByIndex)
                .map((item, i) => (
                  <TableRow component="div">
                    {selectMultiple && (
                      <TableCell component="div" scope="row">
                        <Select
                          multiple
                          defaultValue=""
                          fullWidth
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
                            <div className={classes.chips}>
                              {selected.map(value => (
                                <Chip
                                  key={value}
                                  label={value}
                                  deleteIcon={
                                    <CancelIcon
                                      onMouseDown={event =>
                                        event.stopPropagation()
                                      }
                                    />
                                  }
                                  onDelete={e => handleDelete(e, value)}
                                  className={classes.chip}
                                />
                              ))}
                            </div>
                          )}>
                          {data.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    )}
                    {vlan && (
                      <>
                        <TableCell>
                          <FormField>
                            <TextField
                              className={classes.formField}
                              select
                              label={`${nameCard} Type`}
                              variant="outlined"
                              fullWidth
                              defaultValue="">
                              {data.map((item, index) => (
                                <MenuItem
                                  key={index}
                                  value={item.resourceType.id}>
                                  {item.resourceType.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </FormField>
                        </TableCell>
                        <TableCell>
                          <FormField>
                            <TextField
                              className={classes.formField}
                              select
                              label={`Select ${nameCard} Specifications`}
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
                        <TableCell>
                          <FormField>
                            <TextField
                              className={classes.formField}
                              label="Quantity"
                              variant="outlined"
                              type="number"
                              fullWidth
                              defaultValue=""
                            />
                          </FormField>
                        </TableCell>
                      </>
                    )}
                    {items && (
                      <>
                        <TableCell component="div" scope="row">
                          <FormField>
                            <TextField
                              className={classes.formField}
                              label={`${nameCard} Name `}
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
                              select
                              label={`Select ${nameCard} Specifications`}
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
                    {selectMultiple ? null : (
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
                    )}
                  </TableRow>
                ))}
            </Table>
            {selectMultiple ? null : (
              <FormAction>
                <Button
                  variant="text"
                  onClick={() => dispatch({type: 'ADD_PROPERTY_TYPE'})}
                  leftIcon={PlusIcon}>
                  Add Relationship
                </Button>
              </FormAction>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TableContextForm;
