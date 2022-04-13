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
import DraggableTableRow from '../draggable/DraggableTableRow';
import DroppableTableBody from '../draggable/DroppableTableBody';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
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

  const typeInput = {
    mc: 'MC',
    txt: 'TXT',
  };
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
    mc === typeInput.mc && setChangeInput(typeInput.mc);
    mc === typeInput.txt && setChangeInput(typeInput.txt);
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
  const onDragEnd = result => {
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
        <DroppableTableBody onDragEnd={onDragEnd}>
          {parameters.map((parameter, i) => (
            <DraggableTableRow
              id={parameter.id}
              index={i}
              key={`${i}.${parameter.id}`}>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  <TextInput
                    autoFocus={true}
                    placeholder="Name"
                    autoComplete="off"
                    value={parameter.id}
                    className={classes.input}
                    onChange={nameChange}
                  />
                </FormField>
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <form className={classes.formField} autoComplete="off">
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
              <TableCell style={{width: '20%'}} component="div" scope="row">
                {changeInput === 'MC' && (
                  <EnumPropertyValueInput
                    onChange={() => chip()}
                    property={parameter}
                  />
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
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  <EnumPropertyValueInput
                    onChange={chip}
                    property={parameter}
                  />
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
                      onClick={() => handleDelete()}
                    />
                  </IconButton>
                </FormAction>
              </TableCell>
            </DraggableTableRow>
          ))}
        </DroppableTableBody>
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
