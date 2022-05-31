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
import ParameterTypeSelect from './ParameterTypeSelect';
import ParameterTypesTableDispatcher from './context/property_types/ParameterTypesTableDispatcher';
import ParameterValueInput from './ParameterValueInput';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
import {PlusIcon} from '@symphony/design-system/icons';
import {isTempId} from '../../common/EntUtils';
import {makeStyles} from '@material-ui/styles';
import {sortByIndex} from '../draggable/DraggableUtils';
import {useContext, useState} from 'react';

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

type Props = $ReadOnly<{|
  parameterTypes: Array<any>,
  supportDelete?: boolean,
|}>;

const ExperimentalParametersTypesTable = (props: Props) => {
  const {supportMandatory = true, parameterTypes, supportDelete} = props;
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const dispatch = useContext(ParameterTypesTableDispatcher);

  const handleModal = () => {
    setOpenModal(preventState => !preventState);
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
              <fbt desc="">Parameter Type</fbt>
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
              dispatch({
                type: 'CHANGE_PARAMETER_TYPE_INDEX',
                sourceIndex: source.index,
                destinationIndex: destination.index,
              });
            }
          }}>
          {parameterTypes?.sort(sortByIndex).map((parameter, i) => (
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
                    value={parameter.name}
                    className={classes.input}
                    onChange={({target}) =>
                      dispatch({
                        type: 'UPDATE_PARAMETER_TYPE_NAME',
                        id: parameter.id,
                        name: target.value,
                      })
                    }
                    onBlur={() =>
                      dispatch({
                        type: 'UPDATE_PARAMETER_TYPE_NAME',
                        id: parameter.id,
                        name: parameter.name.trim(),
                      })
                    }
                  />
                </FormField>
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <form className={classes.formField} autoComplete="off">
                  <ParameterTypeSelect propertyType={parameter} />
                </form>
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <ParameterValueInput
                  label={null}
                  className={classes.input}
                  inputType="PropertyType"
                  property={parameter}
                  onChange={value =>
                    dispatch({
                      type: 'UPDATE_PARAMETER_TYPE',
                      value,
                    })
                  }
                />
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  <EnumPropertyValueInput property={[]} />
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
                    checked={!!parameter.isMandatory}
                    onChange={checkedNewValue =>
                      dispatch({
                        type: 'UPDATE_PARAMETER_TYPE',
                        value: {
                          ...parameter,
                          isMandatory: checkedNewValue === 'checked',
                        },
                      })
                    }
                    title={null}
                  />
                </FormField>
              </TableCell>
              <TableCell className={classes.checkbox} component="div">
                <FormAction>
                  <IconButton aria-label="delete">
                    <DeleteOutlinedIcon
                      color="primary"
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_PARAMETER_TYPE',
                          id: parameter.id,
                        })
                      }
                      disabled={!supportDelete && !isTempId(parameter.id)}
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
          onClick={() => dispatch({type: 'ADD_PARAMETER_TYPE'})}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Property</fbt>
        </Button>
      </FormAction>
      {openModal && <DialogMapping name={'Mapping'} onClose={handleModal} />}
    </div>
  );
};

export default ExperimentalParametersTypesTable;
