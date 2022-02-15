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
import type {PropertyType} from '../../common/PropertyType';

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
import PropertyTypeSelect from './PropertyTypeSelect';
import PropertyTypesTableDispatcher from './context/property_types/PropertyTypesTableDispatcher';
import PropertyValueInput from './PropertyValueInput';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import {PlusIcon} from '@symphony/design-system/icons';
import {isTempId} from '../../common/EntUtils';
import {makeStyles} from '@material-ui/styles';
import {sortByIndex} from '../draggable/DraggableUtils';
import {useContext} from 'react';
import {useEffect, useState} from 'react';

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

type Props = $ReadOnly<{|
  propertyTypes: Array<PropertyType>,
  supportMandatory?: boolean,
  supportDelete?: boolean,
|}>;

const ExperimentalPropertyTypesTableParameters = ({
  propertyTypes,
  supportMandatory = true,
  supportDelete,
}: Props) => {
  // eslint-disable-next-line prefer-const
  let dataFake = [];
  const array = [{}];
  const [parameters, setParameters] = useState(dataFake);
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const dispatch = useContext(PropertyTypesTableDispatcher);
  useEffect(() => {
    setParameters(parameters);
    console.log('******');
  });
  console.log('check ', checked);
  console.log('PARAMETERS', parameters);
  // console.log(propertyTypes);
  // const ale = parameters.push({id: Math.floor(Math.random() * 101).toString()});

  // console.log('ALEATORIO', ale);
  const handleChecked = () => {
    setChecked(!checked);
  };
  const handleDelete = () => {
    console.log('borrado');
  };
  const handleModal = () => {
    setOpenModal(preventState => !preventState);
  };
  const handleAddParameters = () => {
    const id = Math.floor(Math.random() * 101);
    parameters.push({id});
    setParameters(parameters);
    console.log('FAKE ', parameters);
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
          onDragEnd={({destination}) => {
            if (destination != null) {
              // dispatch({
              //   type: 'CHANGE_PROPERTY_TYPE_INDEX',
              //   sourceIndex: source.index,
              //   destinationIndex: destination.index,
              // });
            }
          }}>
          {parameters?.sort(sortByIndex)?.map((property, i) => (
            <DraggableTableRow
              id={property.id}
              index={i}
              key={`${i}.${property.id}`}>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  {/* <TextInput
                      autoFocus={true}
                      placeholder="Name"
                      autoComplete="off"
                      className={classes.input}
                      value={''}
                      onChange={({target}) => {}}
                      // onBlur={() =>
                      //   dispatch({
                      //     type: 'UPDATE_PROPERTY_TYPE_NAME',
                      //     id: property.id,
                      //     name: property.name.trim(),
                      //   })
                      // }
                    /> */}
                </FormField>
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField className={classes.input}>
                  {/* <PropertyTypeSelect propertyType={property} /> */}
                </FormField>
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                {/* <PropertyValueInput
                    label={null}
                    className={classes.input}
                    inputType="PropertyType"
                    property={property}
                    onChange={value =>
                      dispatch({
                        type: 'UPDATE_PROPERTY_TYPE',
                        value,
                      })
                    }
                  /> */}
              </TableCell>
              <TableCell style={{width: '20%'}} component="div" scope="row">
                <FormField>
                  {/* <TextInput
                      autoFocus={true}
                      placeholder="Tags"
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
                    /> */}
                </FormField>
              </TableCell>
              <TableCell className={classes.checkbox} component="div">
                <FormAction>
                  <SubjectIcon
                    className={classes.mapping}
                    onClick={handleModal}
                    // onClick={() =>
                    //   dispatch({
                    //     type: 'REMOVE_PROPERTY_TYPE',
                    //     id: property.id,
                    //   })
                    // }
                    // disabled={!supportDelete && !isTempId(property.id)}
                  />
                </FormAction>
              </TableCell>

              <TableCell className={classes.checkbox} component="div">
                <FormField>
                  <Checkbox
                    checked={checked}
                    onClick={handleChecked}
                    // checked={!!property.isMandatory}
                    // onChange={checkedNewValue =>
                    //   dispatch({
                    //     type: 'UPDATE_PROPERTY_TYPE',
                    //     value: {
                    //       ...property,
                    //       isMandatory: checkedNewValue === 'checked',
                    //     },
                    //   })
                    // }
                    title={null}
                  />
                </FormField>
              </TableCell>

              <TableCell className={classes.checkbox} component="div">
                <FormAction>
                  <IconButton aria-label="delete">
                    <DeleteOutlinedIcon
                      color="primary"
                      // onClick={() =>
                      //   dispatch({
                      //     type: 'REMOVE_PROPERTY_TYPE',
                      //     id: property.id,
                      //   })
                      // }
                      onClick={handleDelete}
                      // disabled={!supportDelete && !isTempId(property.id)}
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
          // onClick={() => dispatch({type: 'ADD_PROPERTY_TYPE'})}
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
