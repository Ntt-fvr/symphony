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

import EnumPropertyComboSelectValueInput from '../../common/property_combo/EnumPropertyComboSelectValueInput';
import Grid from '@material-ui/core/Grid';
import PropertyValueInput from '../../components/form/PropertyValueInput';
import React from 'react';
import classNames from 'classnames';

import {
  ElementType,
  getDependentPropertyFromElement,
  getParentPropertyFromElement,
  isPropertyWithDependenceRelation,
} from './PropertyComboHelpers';

type Props = $ReadOnly<{|
  elementType: ElementType,
  property: PropertyType,
  mandatoryPropertiesOnCloseEnabled: boolean,
  classes: object,
  index: number,
  required: boolean,
  _propertyChangedHandler: () => void,
  nextProperty: PropertyType,
|}>;

const PropertyTypeInput = (props: Props) => {
  const {
    elementType,
    property,
    classes,
    required = false,
    index = 0,
    _propertyChangedHandler,
  } = props;

  const dependentPropertyList = getDependentPropertyFromElement(
    elementType,
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
            parentProperty={getParentPropertyFromElement(elementType, property)}
          />
        </Grid>
      </>
    );
  } else {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={4}>
        <PropertyValueInput
          required={required}
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
