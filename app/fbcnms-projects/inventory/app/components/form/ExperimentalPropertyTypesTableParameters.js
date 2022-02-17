/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FeatureID} from '@fbcnms/types/features';

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
import {sortByIndex} from '../draggable/DraggableUtils';
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
      // marginBottom: '36px',
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
  mapping: {
    cursor: 'pointer',
    color: '#8895AD',
  },
  selectMenu: {
    height: '14px',
  },
  actionsBar: {
    width: '20px',
  },
}));

export type PropertyTypeInfo = $ReadOnly<{|
  label: string,
  featureFlag?: FeatureID,
  isNode?: boolean,
|}>;

type Props = $ReadOnly<{||}>;

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
  const chip = ({target}) => {
    target.value;
  };
  const handleOption = mc => {
    mc === 'MC' && setChangeInput('MC');
    mc === 'TXT' && setChangeInput('TXT');
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
        <DroppableTableBody
          onDragEnd={({source, destination}) => {
            if (destination != null) {
              ({
                sourceIndex: source.index,
                destinationIndex: destination.index,
              });
            }
          }}>
          {parameters.sort(sortByIndex).map((property, i) => (
            <DraggableTableRow
              id={property.id}
              index={i}
              key={`${i}.${property.id}`}>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  <TextInput
                    autoFocus={true}
                    placeholder="Name"
                    autoComplete="off"
                    className={classes.input}
                    onChange={nameChange}
                    // onBlur={() =>
                    //   dispatch({
                    //     type: 'UPDATE_PROPERTY_TYPE_NAME',
                    //     id: property.id,
                    //     name: property.name.trim(),
                    //   })
                    // }
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
                  <EnumPropertyValueInput onChange={chip} property={property} />
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
                  <EnumPropertyValueInput onChange={chip} property={property} />
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
                      onClick={() => handleDelete(i, property.id)}
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
