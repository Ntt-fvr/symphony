/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {PropertyType} from '../../../common/PropertyType';

import type {AddWorkOrderCardTypeQueryResponse} from '../__generated__/AddWorkOrderCardTypeQuery.graphql';

import {
  getInitialPropertyFromType,
  toMutablePropertyType,
} from '../../../common/PropertyType';
import {sortPropertiesByIndex} from '../../../common/Property';

const extractNameOfArray = array => {
  return array?.map(value => value.name);
};

export const getDependencePropertyType = (propertyType: PropertyType) => {
  return propertyType.dependencePropertyTypes
    ? propertyType.dependencePropertyTypes[0]
    : null;
};

export const createPropertyTypeValuesJson = (propertyType: PropertyType) => {
  const temporalPropertyValue = JSON.parse(propertyType.stringValue);
  return temporalPropertyValue?.map(propertyTypeValue => ({
    name: propertyTypeValue,
  }));
};

export const getPropertyTypesValuesInString = (propertyType: PropertyType) => {
  const allInputValuesWithOnlyName = extractNameOfArray(
    propertyType.propertyTypeValues,
  );
  return allInputValuesWithOnlyName
    ? JSON.stringify(allInputValuesWithOnlyName)
    : null;
};

//COmprobados

export const isDependentProperty = (propertyType: PropertyType) => {
  return !!propertyType.propertyTypeValues;
};

export const getAllInputValuesDependentProperty = (
  propertyType: PropertyType,
  isDependentProperty: boolean = false,
) => {
  const dependentPropertyType = isDependentProperty
    ? propertyType
    : getDependencePropertyType(propertyType);
  const reducer = (previousValue, currentValue) => {
    if (!Array.isArray(currentValue?.propertyTypeValues)) return;
    return [...previousValue, ...currentValue.propertyTypeValues];
  };
  return dependentPropertyType?.propertyTypeValues?.reduce(reducer, []);
};

export const getAllInputValuesEnumPropertyInString = (
  propertyTypeValues: [],
) => {
  return JSON.stringify(extractNameOfArray(propertyTypeValues));
};

export const getPropertiesWithoutActualProperty = (
  property: PropertyType,
  propertyTypeValues: [],
) => {
  return propertyTypeValues.filter(
    propertyTypeValue => propertyTypeValue.id !== property.id,
  );
};

export const getAllInitialProperties = (
  workOrderType: AddWorkOrderCardTypeQueryResponse,
) => {
  const reducer = (previousValue, currentValue) => {
    return currentValue.dependencePropertyTypes.length < 1
      ? [
          ...previousValue,
          getInitialPropertyFromType(toMutablePropertyType(currentValue)),
        ]
      : [
          ...previousValue,
          getInitialPropertyFromType(toMutablePropertyType(currentValue)),
          getInitialPropertyFromType(
            toMutablePropertyType(
              currentValue.dependencePropertyTypes[0],
              currentValue.index,
            ),
          ),
        ];
  };

  return (
    workOrderType.propertyTypes
      ?.filter(Boolean)
      .filter(propertyType => !propertyType.isDeleted)
      .reduce(reducer, [])
      .sort(sortPropertiesByIndex) ?? []
  );
};

export const isPropertyWithDependenceRelation = (
  propertyType: PropertyType,
) => {
  return (
    !!getDependencePropertyType(propertyType) ||
    isDependentProperty(propertyType)
  );
};
