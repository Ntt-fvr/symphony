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

import type {Property} from '../../../common/Property';

import {WorkOrder} from '../../../common/WorkOrder';
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

export const isPropertyWithDependenceRelation = (property: Property) => {
  return property.propertyType.propertyTypeValues?.length > 0;
};

export const getDependentPropertyFromWorkOrder = (
  workOrder: WorkOrder,
  property: Property,
) => {
  if (
    !property.propertyType?.dependencePropertyTypes ||
    property.propertyType?.dependencePropertyTypes?.length < 1
  ) {
    return null;
  }
  return workOrder.properties?.find(
    propertyWorkOrder =>
      propertyWorkOrder.propertyType.parentPropertyType?.id ===
      property.propertyType.id,
  );
};

export const getParentPropertyFromWorkOrder = (
  workOrder: WorkOrder,
  property: Property,
) => {
  if (!property.propertyType?.parentPropertyType) {
    return null;
  }
  return workOrder.properties?.find(
    propertyWorkOrder =>
      propertyWorkOrder.propertyType?.id ===
      property.propertyType.parentPropertyType?.id,
  );
};

export const getValidPropertyValuesFromParent = (
  parentProperty: Property,
  dependentProperty: Property,
) => {
  return dependentProperty.propertyType.propertyTypeValues?.filter(
    propertyValue =>
      !!propertyValue.parentPropertyTypeValue?.find(
        parentPropertyType =>
          parentPropertyType.name === parentProperty.stringValue,
      ),
  );
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
    return [
      ...previousValue,
      getInitialPropertyFromType(toMutablePropertyType(currentValue)),
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
