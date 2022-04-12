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

import EnumPropertyComboSelectValueInput from './property_combo/EnumPropertyComboSelectValueInput';
import Grid from '@material-ui/core/Grid';
import PropertyValueInput from '../form/PropertyValueInput';
import React from 'react';
import classNames from 'classnames';
import {WorkOrder} from '../../common/WorkOrder';
import {
  getDependentPropertyFromWorkOrder,
  getParentPropertyFromWorkOrder,
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
  } = props;

  const {closedStatus} = useStatusValues();

  const dependentPropertyList = getDependentPropertyFromWorkOrder(
    workOrder,
    property,
  );

  const onPropertyComboChange = prop => {
    if (dependentPropertyList?.length > 0) {
      dependentPropertyList.forEach(dependentProperty => {
        const newDependentProperty = {...dependentProperty, stringValue: ''};
        _propertyChangedHandler(dependentProperty.propertyType.index)(
          newDependentProperty,
        );
      });
    }
    _propertyChangedHandler(index)(prop);
  };

  if (isPropertyWithDependenceRelation(property)) {
    return (
      <>
        <Grid item xs={12} sm={6} lg={4} xl={4}>
          <EnumPropertyComboSelectValueInput
            className={classNames(classes.input, classes.gridInput)}
            property={property}
            onChange={onPropertyComboChange}
            disabled={!property.propertyType.isInstanceProperty}
            parentProperty={getParentPropertyFromWorkOrder(workOrder, property)}
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
