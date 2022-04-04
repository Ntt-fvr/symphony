/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import PropertyComboList from './PropertyComboList';
import PropertyTypesTableDispatcher from '../../form/context/property_types/PropertyTypesTableDispatcher';
import React, {useContext, useReducer} from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import Strings from '@fbcnms/strings/Strings';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {
  DependentPropertyTypesReducer,
  DependentPropertyTypesReducerInit,
  DependentPropertyTypesReducerTypes,
} from './DependentPropertyTypesReducer';
import {PropertyType} from '../../../common/PropertyType';
import {
  createPropertyTypeValuesJson,
  getPropertiesWithoutActualProperty,
} from './PropertyComboHelpers';
import {isTempId} from '../../../common/EntUtils';

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  onSave: () => void,
  property: PropertyType,
  isNewDependenceProperty: boolean,
  setShowCompleteMessage: () => void,
|}>;

const PropertyComboSelectContent = (props: Props) => {
  const {
    onClose,
    classes,
    property,
    setShowCompleteMessage,
    onSave,
    isNewDependenceProperty = true,
  } = props;
  const {propertyTypes, dispatch: propertyTypesDispatch} = useContext(
    PropertyTypesTableDispatcher,
  );

  const propertyTypeValuesPrincipal =
    property.propertyTypeValues?.length > 0
      ? property.propertyTypeValues
      : createPropertyTypeValuesJson(property);
  const dependentPropertyInitial = !isNewDependenceProperty && property;

  const DependentPropertyTypesInitialState = {
    dependentPropertyInitial,
  };

  const [state, dispatch] = useReducer(
    DependentPropertyTypesReducer,
    DependentPropertyTypesInitialState,
    DependentPropertyTypesReducerInit,
  );

  const handleDependenceProperty = id => {
    const action = {
      type: DependentPropertyTypesReducerTypes.updateDependenceProperty,
      payload: propertyTypes.find(property => property.id === id),
    };
    dispatch(action);
  };

  const saveButtonClicked = () => {
    setShowCompleteMessage(true);
    propertyTypesDispatch({
      type: 'REMOVE_PROPERTY_TYPE',
      id: state.id,
    });
    isTempId(state.id) && delete state.id;
    const dependencePropertyTypes =
      property.dependencePropertyTypes?.length > 0
        ? [...property.dependencePropertyTypes, state]
        : [state];
    onSave({
      dependencePropertyTypes,
      propertyTypeValues: propertyTypeValuesPrincipal,
    });
  };

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Grid container className={classes.dialogTitleContainer}>
          <Text className={classes.dialogTitleText} color={'inherit'}>
            Relate Porperties
          </Text>
          <br />
          <Text variant="body2" color={'inherit'}>
            When relating two properties, the secondary values that will be
            shown to the user will be dependent on the primary values
          </Text>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          className={classes.tableHeader}>
          <Grid item xs={5}>
            <Text className={classes.tableTitleText} color={'inherit'}>
              Primary Property
            </Text>
          </Grid>
          <Grid item xs={5}>
            <Text className={classes.tableTitleText} color={'inherit'}>
              Dependent Property
            </Text>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              disabled
              label="Primary Property"
              fullWidth
              name="primaryProperty"
              variant="outlined"
              value={property?.name}
            />
          </Grid>
          <Grid item xs={5}>
            <Select
              options={getPropertiesWithoutActualProperty(
                property,
                propertyTypes,
              ).map(property => {
                return {
                  key: property.id,
                  label: property.name,
                  value: property.id,
                };
              })}
              selectedValue={state.id}
              onChange={handleDependenceProperty}
              className={classes.selectInput}
              disabled={!!dependentPropertyInitial}
            />
          </Grid>
        </Grid>
        <PropertyComboList
          classes={classes}
          propertyTypeValues={propertyTypeValuesPrincipal}
          dispatch={dispatch}
          disabled={!state.id}
          dependencePropertyTypeValues={state.propertyTypeValues}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} skin="primary-outlined">
          {Strings.common.cancelButton}
        </Button>
        <Button
          onClick={saveButtonClicked}
          disabled={
            !state.id ||
            !state.propertyTypeValues ||
            state.propertyTypeValues?.length < 1
          }>
          {Strings.common.saveButton}
        </Button>
      </DialogActions>
    </>
  );
};

export default PropertyComboSelectContent;
