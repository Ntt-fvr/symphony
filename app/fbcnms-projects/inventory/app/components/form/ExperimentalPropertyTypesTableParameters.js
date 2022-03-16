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
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DialogMapping from '../configure/DialogMapping';
import DragIndicatorIcon from '@fbcnms/ui/icons/DragIndicatorIcon';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MenuItem} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

import EnumPropertyValueInput from './EnumPropertyValueInput';

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
  formField: {
    width: '100%',
    padding: '0 12px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  selectField: {
    width: '100%',
  },
  checkbox: {
    textAlign: 'center',
    '& div': {
      justifyContent: 'center',
    },
  },
  mapping: {
    cursor: 'pointer',
    color: '#8895AD',
  },
  dragIndicatorIcon: {
    '&&': {
      fontSize: '15px',
    },
    cursor: '-webkit-grabbing',
    cursor: 'grabbing',
  },
}));

type Props = $ReadOnly<{||}>;

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ExperimentalPropertyTypesTableParameters = (props: Props) => {
  const {supportMandatory = true} = props;
  const [parameters, setParameters] = useState([]);
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [changeInput, setChangeInput] = useState('TXT');
  const classes = useStyles();

  const handleChecked = () => {
    setChecked(!checked);
  };
  const handleDelete = (i, ID) => {
    i, ID;
  };
  const handleModal = () => {
    setOpenModal(preventState => !preventState);
  };
  const handleAddParameters = () => {
    const id = Math.floor(Math.random() * 101);
    setParameters([...parameters, {id}]);
  };
  const nameChange = ({target}) => {
    target.value;
  };
  const handleOption = mc => {
    mc === 'MC' && setChangeInput('MC');
    mc === 'TXT' && setChangeInput('TXT');
  };
  const drag = result => {
    {
      const {source, destination} = result;
      if (!destination) {
        return;
      }
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      ) {
        return;
      }

      setParameters(parameters =>
        reorder(parameters, source.index, destination.index),
      );
    }
  };

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.root}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell component="div" />
            <TableCell component="div">
              <fbt desc="">Name</fbt>
            </TableCell>
            <TableCell component="div">
              <fbt desc="">Property Type</fbt>
            </TableCell>
            <TableCell component="div">
              <fbt desc="">Default Value</fbt>
            </TableCell>
            <TableCell component="div">
              <fbt desc="">Tags</fbt>
            </TableCell>
            <TableCell className={classes.checkbox} component="div">
              <fbt desc="">Mapping</fbt>
            </TableCell>
            {supportMandatory && (
              <TableCell className={classes.checkbox} component="div">
                <fbt desc="">Priority</fbt>
              </TableCell>
            )}
            <TableCell className={classes.checkbox} component="div">
              <fbt desc="">Delete</fbt>
            </TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext onDragEnd={drag}>
          <Droppable droppableId={'1'}>
            {droppableProvided => (
              <TableBody
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}>
                {parameters.map((parameter, i) => (
                  <Draggable
                    key={parameter.id}
                    draggableId={parameter.id}
                    index={i}>
                    {draggableProvided => (
                      <TableRow
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}>
                        <TableCell
                          style={{minWidth: '35px', width: '35px'}}
                          size="small"
                          padding="none"
                          component="div">
                          <div {...draggableProvided.dragHandleProps}>
                            <DragIndicatorIcon
                              className={classes.dragIndicatorIcon}
                            />
                          </div>
                        </TableCell>
                        <TableCell
                          style={{width: '20%'}}
                          component="div"
                          scope="row">
                          <FormField>
                            <TextInput
                              autoFocus={true}
                              placeholder="Name"
                              autoComplete="off"
                              className={classes.input}
                              onChange={nameChange}
                            />
                          </FormField>
                        </TableCell>
                        <TableCell
                          style={{width: '20%'}}
                          component="div"
                          scope="row">
                          <form
                            className={classes.formField}
                            autoComplete="off">
                            <TextField
                              required
                              id="outlined-select-option-native-simple"
                              select
                              className={classes.selectField}
                              label="Option"
                              defaultValue="Text"
                              name="status"
                              variant="outlined">
                              <MenuItem
                                onClick={() => handleOption('MC')}
                                value={'Multiple Choice'}>
                                Multiple Choice
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleOption('TXT')}
                                value={'Text'}>
                                Text
                              </MenuItem>
                            </TextField>
                          </form>
                        </TableCell>
                        <TableCell
                          style={{width: '20%'}}
                          component="div"
                          scope="row">
                          {changeInput === 'MC' && (
                            <EnumPropertyValueInput property={parameter} />
                          )}
                          {changeInput === 'TXT' && (
                            <TextInput
                              autoFocus={true}
                              placeholder={'Text'}
                              autoComplete="off"
                              className={classes.input}
                              onChange={nameChange}
                            />
                          )}
                        </TableCell>
                        <TableCell
                          style={{width: '20%'}}
                          component="div"
                          scope="row">
                          <FormField>
                            <EnumPropertyValueInput property={parameter} />
                          </FormField>
                        </TableCell>
                        <TableCell className={classes.checkbox} component="div">
                          <FormAction>
                            <SubjectIcon
                              className={classes.mapping}
                              onClick={handleModal}
                            />
                          </FormAction>
                        </TableCell>
                        <TableCell className={classes.checkbox} component="div">
                          <FormField>
                            <Checkbox
                              checked={checked}
                              onClick={handleChecked}
                              title={null}
                            />
                          </FormField>
                        </TableCell>
                        <TableCell className={classes.checkbox} component="div">
                          <FormAction>
                            <IconButton aria-label="delete">
                              <DeleteOutlinedIcon
                                color="primary"
                                onClick={() => handleDelete(i, parameter.id)}
                              />
                            </IconButton>
                          </FormAction>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
      <FormAction>
        <Button
          variant="text"
          onClick={handleAddParameters}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Property</fbt>
        </Button>
      </FormAction>
      {openModal && <DialogMapping name={'Mapping'} onClose={handleModal} />}
    </div>
  );
};

export default ExperimentalPropertyTypesTableParameters;
