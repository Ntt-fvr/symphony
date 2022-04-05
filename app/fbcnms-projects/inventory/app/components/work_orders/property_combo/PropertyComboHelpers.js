/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddWorkOrderCardTypeQueryResponse} from '../__generated__/AddWorkOrderCardTypeQuery.graphql';
import type {Property} from '../../../common/Property';
import type {
  PropertyType,
  PropertyTypeValues,
} from '../../../common/PropertyType';

import {WorkOrder} from '../../../common/WorkOrder';
import {
  getInitialPropertyFromType,
  toMutablePropertyType,
} from '../../../common/PropertyType';
import {isTempId} from '../../../common/EntUtils';
import {sortPropertiesByIndex} from '../../../common/Property';

const extractNameOfArray = array => {
  return array?.map(value => value.name);
};

export const createPropertyTypeValuesJson = (propertyType: PropertyType) => {
  const temporalPropertyValue = JSON.parse(propertyType.stringValue);
  return temporalPropertyValue?.map(propertyTypeValue => ({
    name: propertyTypeValue,
  }));
};

export const getAllPropertyTypesValuesInString = (
  propertyType: PropertyType,
) => {
  const allInputValuesWithOnlyName = extractNameOfArray(
    propertyType.propertyTypeValues,
  );
  return allInputValuesWithOnlyName
    ? JSON.stringify(allInputValuesWithOnlyName)
    : null;
};

export const getValidDependencePropertyTypeValueInString = (
  property: PropertyType,
  dependencePropertyTypeValues: PropertyType[],
) => {
  const dependencePropertyTypeValueInString = dependencePropertyTypeValues.filter(
    dependencePropertyTypeValue =>
      !!dependencePropertyTypeValue.parentPropertyTypeValue?.find(
        parentPropertyType => parentPropertyType.id === property.id,
      ),
  );

  return JSON.stringify(
    extractNameOfArray(dependencePropertyTypeValueInString),
  );
};

export const isPropertyTypeWithDependenceRelation = (
  propertyType: PropertyType,
) => {
  return (
    propertyType.propertyTypeValues?.length > 0 && !isTempId(propertyType.id)
  );
};

export const isPropertyWithDependenceRelation = (property: Property) => {
  return property.propertyType?.propertyTypeValues?.length > 0;
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
  return workOrder.properties?.filter(
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

const extractParentInformationFromPropertyTypeValues = (
  propertyTypeValues: PropertyTypeValues[],
) => {
  return propertyTypeValues.map(propertyTypeValue => {
    return {
      ...propertyTypeValue,
      parentPropertyTypeValue: undefined,
    };
  });
};

export const getPropertyTypesWithoutParentsInformation = (
  propertyTypes: PropertyType[],
) => {
  return propertyTypes.map(propertyType => {
    const newDependencePropertyTypeWithoutParentInformation =
      propertyType.dependencePropertyTypes?.length > 0
        ? propertyType.dependencePropertyTypes.map(propertyType => ({
            ...propertyType,
            propertyTypeValues: extractParentInformationFromPropertyTypeValues(
              propertyType.propertyTypeValues,
            ),
          }))
        : [];
    const newPropertyTypeValues =
      propertyType.propertyTypeValues?.length > 0
        ? extractParentInformationFromPropertyTypeValues(
            propertyType.propertyTypeValues,
          )
        : undefined;
    return {
      ...propertyType,
      parentPropertyType: undefined,
      propertyTypeValues: newPropertyTypeValues,
      dependencePropertyTypes: newDependencePropertyTypeWithoutParentInformation,
    };
  });
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

export const getPropertiesWithoutActualProperty = (
  property: PropertyType,
  propertyTypeValues: [],
) => {
  return propertyTypeValues.filter(
    propertyTypeValue =>
      propertyTypeValue.id !== property.id &&
      !propertyTypeValue.dependencePropertyTypes,
  );
};

export const orderPropertyTypesIndex = (propertyTypes: PropertyType[]) => {
  let dependentPropertiesCount = 0;
  const newOrderPropertyTypes = propertyTypes.map((propertyType, index) => {
    const newDependencePropertyType = propertyType.dependencePropertyTypes?.map(
      dependencePropertyType => {
        dependentPropertiesCount += 1;
        return {
          ...dependencePropertyType,
          index: index + 1 + (dependentPropertiesCount - 1),
        };
      },
    );
    const newIndex =
      !propertyType.dependencePropertyTypes ||
      propertyType.dependencePropertyTypes?.length < 1
        ? index + dependentPropertiesCount
        : dependentPropertiesCount > 1
        ? index +
          (dependentPropertiesCount -
            propertyType.dependencePropertyTypes?.length)
        : index;
    return {
      ...propertyType,
      dependencePropertyTypes: newDependencePropertyType,
      index: newIndex,
    };
  });
  return newOrderPropertyTypes;
};
