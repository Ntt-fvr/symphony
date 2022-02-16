/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {PropertyType} from '../../common/PropertyType';

import EnumDependentPropertySelectValueInput from './property_combo/EnumDependentPropertySelectValueInput';
import Grid from '@material-ui/core/Grid';
import PropertyValueInput from '../form/PropertyValueInput';
import React, {useState} from 'react';
import classNames from 'classnames';
import {AppointmentData} from './SelectAvailabilityAssignee';
import {WorkOrder} from '../../common/WorkOrder';
import {
  isDependentProperty,
  isPropertyWithDependenceRelation,
} from './property_combo/PropertyComboHelpers';
import {useStatusValues} from '../../common/FilterTypes';

type Props = $ReadOnly<{|
  workOrder: WorkOrder,
  property: PropertyType,
  mandatoryPropertiesOnCloseEnabled: boolean,
  classes: any,
  index: number,
  _propertyChangedHandler: () => void,
  nextProperty: PropertyType,
|}>;

const PropertyTypeInput = (props: Props) => {
  const {
    workOrder,
    property,
    mandatoryPropertiesOnCloseEnabled,
    classes,
    index = 0,
    _propertyChangedHandler,
    nextProperty,
  } = props;

  const [
    masterPropertySelected,
    setMasterPropertySelected,
  ] = useState<AppointmentData>(null);

  const {closedStatus} = useStatusValues();

  const onMasterChange = (prop, masterProperty) => {
    setMasterPropertySelected(masterProperty);
    _propertyChangedHandler(index)(prop);
    nextProperty.stringValue = '';
    _propertyChangedHandler(index + 1)(nextProperty);
  };

  const onDependentChange = prop => _propertyChangedHandler(index + 1)(prop);

  if (isPropertyWithDependenceRelation(property)) {
    return isDependentProperty(property) ? null : (
      <>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
          <EnumDependentPropertySelectValueInput
            className={classNames(classes.input, classes.gridInput)}
            property={property}
            onChange={onMasterChange}
            disabled={!property.propertyType.isInstanceProperty}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
          <EnumDependentPropertySelectValueInput
            className={classNames(classes.input, classes.gridInput)}
            property={nextProperty}
            onChange={onDependentChange}
            disabled={
              !property.propertyType.isInstanceProperty ||
              !masterPropertySelected
            }
            isDependentProperty={true}
            masterPropertySelected={masterPropertySelected}
          />
        </Grid>
      </>
    );
  } else {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={4}>
        <PropertyValueInput
          required={
            !!property.propertyType.isMandatory &&
            (workOrder.status === closedStatus.value ||
              !mandatoryPropertiesOnCloseEnabled)
          }
          disabled={!property.propertyType.isInstanceProperty}
          label={property.propertyType.name}
          className={classes.gridInput}
          inputType="Property"
          property={property}
          headlineVariant="form"
          fullWidth={true}
          onChange={_propertyChangedHandler(index)}
        />
      </Grid>
    );
  }
};

export default PropertyTypeInput;
