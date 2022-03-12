/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import {PropertyTypeValues} from '../../../common/PropertyType';

export const getPropertyTypeValuesToReducer = (
  oldPropertyTypeValues: PropertyTypeValues[],
  newPropertyTypeValues: {
    dependencePropertyValues: PropertyTypeValues[],
    parentPropertyTypeValue: string,
  },
) => {
  const {
    parentPropertyTypeValue,
    dependencePropertyValues,
  } = newPropertyTypeValues;
  const oldPropertyTypeByRelated = getPropertyTypeByRelated(
    oldPropertyTypeValues,
    parentPropertyTypeValue,
  );
  let differentPropertyTypeValue;
  if (oldPropertyTypeByRelated.length > dependencePropertyValues.length) {
    // Delete propertyTypeValue information
    differentPropertyTypeValue = getDifferentPropertyTypeValue(
      oldPropertyTypeByRelated,
      dependencePropertyValues,
    );
    if (differentPropertyTypeValue.parentPropertyTypeValue?.length > 1) {
      // Delete only a relatedPropertyType
      const newPropertyTypeValue = {
        ...differentPropertyTypeValue,
        parentPropertyTypeValue: differentPropertyTypeValue.parentPropertyTypeValue.filter(
          related => related !== parentPropertyTypeValue,
        ),
      };
      const index = oldPropertyTypeValues.findIndex(
        oldPropertyTypeValue =>
          oldPropertyTypeValue.name === differentPropertyTypeValue.name,
      );
      oldPropertyTypeValues.splice(index, 1, newPropertyTypeValue);
      return [...oldPropertyTypeValues];
    } else {
      // Delete all the propertyTypeValue
      const newPropertyTypeValues = oldPropertyTypeValues.filter(
        oldPropertyTypeValue =>
          oldPropertyTypeValue.name !== differentPropertyTypeValue.name,
      );
      return newPropertyTypeValues;
    }
  } else {
    // Add propertyTypeValue information
    differentPropertyTypeValue = getDifferentPropertyTypeValue(
      dependencePropertyValues,
      oldPropertyTypeByRelated,
    );
    const existPropertyTypeValue = getOldPropertyTypeValueWithDifferentRelated(
      differentPropertyTypeValue,
      oldPropertyTypeValues,
    );
    if (existPropertyTypeValue) {
      // Update propertyTypeValue
      const newPropertyTypeValue = addNewPropertyTypeValue(
        existPropertyTypeValue,
        parentPropertyTypeValue,
      );
      const index = oldPropertyTypeValues.findIndex(
        oldPropertyTypeValue =>
          oldPropertyTypeValue.name === existPropertyTypeValue.name,
      );
      oldPropertyTypeValues.splice(index, 1, newPropertyTypeValue);
      return [...oldPropertyTypeValues];
    } else {
      // Add propertyTypeValue
      const newPropertyTypeValue = addNewPropertyTypeValue(
        differentPropertyTypeValue,
        parentPropertyTypeValue,
      );
      return [...oldPropertyTypeValues, newPropertyTypeValue];
    }
  }
};

const getPropertyTypeByRelated: PropertyTypeValues[] = (
  oldPropertyTypeValues: PropertyTypeValues[],
  parentPropertyTypeValue: string,
) => {
  return oldPropertyTypeValues.filter(propertyTypeValue =>
    propertyTypeValue.parentPropertyTypeValue.find(
      related => related === parentPropertyTypeValue,
    ),
  );
};

const addNewPropertyTypeValue: PropertyTypeValues = (
  propertyTypeValue: PropertyTypeValues,
  parentPropertyTypeValue: string,
) => {
  const finalParentPropertyTypeValue =
    propertyTypeValue.parentPropertyTypeValue?.length > 0
      ? [...propertyTypeValue.parentPropertyTypeValue, parentPropertyTypeValue]
      : [parentPropertyTypeValue];
  return {
    ...propertyTypeValue,
    parentPropertyTypeValue: finalParentPropertyTypeValue,
    isDeleted: false,
  };
};

const getDifferentPropertyTypeValue: PropertyTypeValues = (
  morePropertyTypeValues: PropertyTypeValues[],
  lessPropertyTypeValues: PropertyTypeValues[],
) => {
  const differentPropertyTypeValues = morePropertyTypeValues.filter(
    propertyTypeValue =>
      !lessPropertyTypeValues.find(
        comparativePropertyTypeValue =>
          propertyTypeValue.name === comparativePropertyTypeValue.name,
      ),
  );
  return differentPropertyTypeValues.length !== 1
    ? null
    : differentPropertyTypeValues[0];
};

const getOldPropertyTypeValueWithDifferentRelated = (
  propertyTypeValue: PropertyTypeValues,
  oldPropertyTypeValues: PropertyTypeValues[],
) => {
  return oldPropertyTypeValues.find(
    oldPropertyTypeValue =>
      oldPropertyTypeValue.name === propertyTypeValue.name,
  );
};
