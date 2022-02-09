/*[object Object]*/
import type {PropertyType} from '../../../common/PropertyType';

import {isTempId} from '../../../common/EntUtils';

const extractNameOfArray = array => {
  return array?.map(value => value.name);
};

export const getDependencePropertyType = (propertyType: PropertyType) => {
  return propertyType.dependencePropertyTypes
    ? propertyType.dependencePropertyTypes[0]
    : null;
};

export const getAllInputValuesDependentProperty = (
  propertyType: PropertyType,
  isDependentProperty = false,
) => {
  const dependentPropertyType = isDependentProperty
    ? propertyType
    : getDependencePropertyType(propertyType);
  const reducer = (previousValue, currentValue) => [
    ...previousValue,
    ...currentValue.propertyTypeValues,
  ];
  return dependentPropertyType?.propertyTypeValues?.reduce(reducer, []);
};

export const getAllInputValuesDependentPropertyInString = (
  propertyType: PropertyType,
  isDependentProperty = false,
) => {
  const allInputValuesDependentProperty = getAllInputValuesDependentProperty(
    propertyType,
    isDependentProperty,
  );
  const allInputValuesWithOnlyName = extractNameOfArray(
    allInputValuesDependentProperty,
  );

  return allInputValuesWithOnlyName
    ? JSON.stringify(allInputValuesWithOnlyName)
    : null;
};

export const getAllInputValuesEnumPropertyInString = (
  propertyTypeValues: [],
) => {
  return JSON.stringify(extractNameOfArray(propertyTypeValues));
};

export const getPorpertyTypeValuesToReducer = (propertyType: PropertyType) => {
  const temporalPropertyValue = JSON.parse(propertyType.stringValue);
  const createdPropertyValue = getDependencePropertyType(propertyType)
    ?.propertyTypeValues;
  const finalPropertyValues = isTempId(propertyType.id)
    ? temporalPropertyValue?.map(propertyTypeValue => ({
        name: propertyTypeValue,
      })) || []
    : createdPropertyValue;

  return finalPropertyValues || [];
};
