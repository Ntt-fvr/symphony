/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

// import type {PropertyFormField_property} from '../components/form/__generated__/PropertyFormField_property.graphql';
import type {PropertyKind} from '../components/form/__generated__/PropertyTypeFormField_propertyType.graphql';

// import type {PropertyTypeInput} from '../components/configure/mutations/__generated__/EditProjectTypeMutation.graphql';

// import {isTempId} from './EntUtils';

export type ParameterType = {|
  id: string,
  type: PropertyKind,
  nodeType?: ?string,
  name: string,
  index?: ?number,
  category?: ?string,
  externalId?: ?string,
  // one or more of the following potential value fields will have actual data,
  // depending on the property type selected for this property.
  // e.g. for 'email' the stringValue field will be populated
  booleanValue?: ?boolean,
  stringValue?: ?string,
  intValue?: ?number,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  mappingIn?: ?string,
  mappingOut?: ?string,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  isEditable?: ?boolean,
  isMandatory?: ?boolean,
  isPrioritary?: boolean,
  isListable?: ?boolean,
  isDeleted?: ?boolean,
  parameters?: ?(parameter[]),
  rawValue?: ?string,
  tags?: ?(tagsType[]),
  tagsAggregate?: ?tagsAggregate,
  resourceSpecification?: ?string,
|};

export type parameter = {|
  booleanValue?: ?boolean,
  id?: ?string,
  floatValue?: ?number,
  latitudeValue?: ?number,
  intValue?: ?number,
  parameterType?: ?ParameterType,
  nodeValue?: ?{id: string, name: string, ...},
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  previous?: ?parameter,
  stringValue?: ?string,
  rangeToValue?: ?number,
|};

export type tagsType = {|
  id?: ?string,
  name?: ?string,
  parameters?: ?(parameter[]),
|};

export type tagsAggregate = {|
  count?: number,
  nameMax?: string,
  nameMin?: string,
|};

export const getParameterDefaultValue = (parameterType: ParameterType) => {
  {
    switch (parameterType.type) {
      case 'date':
      case 'email':
      case 'enum':
      case 'string':
        return parameterType.stringValue;
      case 'bool':
        return parameterType.booleanValue != undefined
          ? parameterType.booleanValue.toString()
          : '';
      case 'int':
        return parameterType.intValue;
      case 'float':
        return parameterType.floatValue;
      case 'range':
        return parameterType.rangeFromValue !== null &&
          parameterType.rangeToValue !== null
          ? (parameterType.rangeFromValue ?? '') +
              ' - ' +
              (parameterType.rangeToValue ?? '')
          : '';
      case 'gps_location':
        return parameterType.latitudeValue !== null &&
          parameterType.longitudeValue !== null
          ? (parameterType.latitudeValue ?? '') +
              ', ' +
              (parameterType.longitudeValue ?? '')
          : '';
      case 'node':
        return '';
    }
  }
};

export const getInitialPropertyFromType = (
  propType: ParameterType,
): parameter => {
  return {
    id: 'prop@tmp' + propType.id,
    parameterType: propType.parameterss,
    booleanValue: propType.booleanValue,
    stringValue: propType.type !== 'enum' ? propType.stringValue : '',
    intValue: propType.intValue,
    floatValue: propType.floatValue,
    latitudeValue: propType.latitudeValue,
    longitudeValue: propType.longitudeValue,
    rangeFromValue: propType.rangeFromValue,
    rangeToValue: propType.rangeToValue,
    previous: propType.previous,
    nodeValue: propType.nodeType,
  };
};

export const toMutableParameterType = (
  immutablePropertyType: $ReadOnly<any>,
): ParameterType => ({
  id: immutablePropertyType.id,
  type: immutablePropertyType.type,
  nodeType: immutablePropertyType.nodeType,
  name: immutablePropertyType.name,
  index: immutablePropertyType.index,
  category: immutablePropertyType.category,
  booleanValue: immutablePropertyType.booleanValue,
  stringValue: immutablePropertyType.stringValue,
  intValue: immutablePropertyType.intValue,
  floatValue: immutablePropertyType.floatValue,
  latitudeValue: immutablePropertyType.latitudeValue,
  longitudeValue: immutablePropertyType.longitudeValue,
  rangeFromValue: immutablePropertyType.rangeFromValue,
  rangeToValue: immutablePropertyType.rangeToValue,
  isEditable: immutablePropertyType.isEditable,
  isMandatory: immutablePropertyType.isMandatory,
  isDeleted: immutablePropertyType.isDeleted,
  parameters: immutablePropertyType.parentPropertyType,
  resourceSpecification: immutablePropertyType.resourceSpecification,
});

export const convertParameterTypeToMutationInput = (
  propertyTypes: Array<ParameterType>,
): Array<any> => {
  return propertyTypes
    .filter(propType => !!propType.name)
    .map(prop => {
      return {
        name: prop.name,
        resourceSpecification: prop.resourceSpecification,
        type: prop.type,
      };
    });
};
