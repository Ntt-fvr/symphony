/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {ParameterKind} from '../mutations/__generated__/AddConfigurationParameterTypeMutation.graphql';

import {isTempId} from './EntUtils';

export type ParameterType = {|
  id: string,
  type: ParameterKind,
  nodeType?: ?string,
  name: string,
  index?: ?number,
  floatValue?: ?number,
  category?: ?string,
  externalId?: ?string,
  // one or more of the following potential value fields will have actual data,
  // depending on the property type selected for this property.
  // e.g. for 'email' the stringValue field will be populated
  booleanValue?: ?boolean,
  stringValue?: ?string,
  intValue?: ?number,
  mappingIn?: ?string,
  mappingOut?: ?string,
  isEditable?: ?boolean,
  isMandatory?: ?boolean,
  isPrioritary?: boolean,
  isListable?: ?boolean,
  isDeleted?: ?boolean,
  parameters?: ?(parameter[]),
  rawValue?: ?string,
  tags?: ?(tagsType[]),
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
export type ParameterTypeInfo = $ReadOnly<{|
  kind: ParameterKind,
  label: string,
  featureFlag?: any,
|}>;

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

export const getInitialParameterFromType = (
  propType: ParameterType,
): parameter => {
  return {
    id: 'prop@tmp' + propType.id,
    parameterType: propType.parameters,
    booleanValue: propType.booleanValue,
    stringValue: propType.type !== 'enum' ? propType.stringValue : '',
    intValue: propType.intValue,
    floatValue: propType.floatValue,
    nodeValue: null,
  };
};

export const toMutableParameterType = (
  immutableParameterType: $ReadOnly<any>,
): ParameterType => ({
  id: immutableParameterType.id,
  type: immutableParameterType.type,
  nodeType: immutableParameterType.nodeType,
  name: immutableParameterType.name,
  index: immutableParameterType.index,
  category: immutableParameterType.category,
  booleanValue: immutableParameterType.booleanValue,
  stringValue: immutableParameterType.stringValue,
  intValue: immutableParameterType.intValue,
  floatValue: immutableParameterType.floatValue,
  isEditable: immutableParameterType.isEditable,
  isMandatory: immutableParameterType.isMandatory,
  isDeleted: immutableParameterType.isDeleted,
  parameters: immutableParameterType.parentPropertyType,
  resourceSpecification: immutableParameterType.resourceSpecification,
});

export const convertParameterTypeToMutationInput = (
  propertyTypes: Array<ParameterType>,
  resourceSpecification: any,
): Array<any> => {
  return propertyTypes
    .filter(propType => !!propType.name)
    .map(prop => {
      return {
        ...prop,
        resourceSpecification: resourceSpecification,
        id: isTempId(prop.id) ? undefined : prop.id,
      };
    });
};
