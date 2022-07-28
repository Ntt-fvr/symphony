/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

export type TableType = {|
  id?: ?string,
  name: string,
  index?: ?number,
  isDeleted?: ?boolean,
  resourceSpecification?: ?string,
|};

import type {TableDispatcherActionType} from './TableDispatcherActionType';

import {generateTempId} from '../../common/EntUtils';
import {getInitialState, reducer} from './TableReducer';
import {isTempId} from '../../common/EntUtils';
import {useReducer} from 'react';
export type TableState = Array<TableType>;

export const getInitialTableType = (): TableType => ({
  id: generateTempId(),
  name: '',
  resourceSpecification: '',
});

export const useTableTypesReducer = (initialTableType: T) => {
  return useReducer<TableState, TableDispatcherActionType, T>(
    reducer,
    initialTableType,
    getInitialState,
  );
};

export const toMutableTableType = (immutableTableType: T): T => ({
  id: immutableTableType.name,
  name: immutableTableType.name,
  index: immutableTableType.index,
  resourceSpecification: immutableTableType.resourceSpecification,
});

export const toMutableProperty = (immutablePropertyType: T): T => ({
  id: immutablePropertyType.id,
  type: immutablePropertyType.type,
  name: immutablePropertyType.name,
  booleanValue: immutablePropertyType.booleanValue,
  stringValue: immutablePropertyType.stringValue,
  intValue: immutablePropertyType.intValue,
  floatValue: immutablePropertyType.floatValue,
  latitudeValue: immutablePropertyType.latitudeValue,
  longitudeValue: immutablePropertyType.longitudeValue,
  rangeFromValue: immutablePropertyType.rangeFromValue,
  rangeToValue: immutablePropertyType.rangeToValue,
  propertyType: {
    ...immutablePropertyType,
  },
});

export const toMutablePropertyEdit = (immutablePropertyType: T): T => ({
  id: immutablePropertyType.id,
  type: immutablePropertyType.type,
  name: immutablePropertyType.name,
  booleanValue: immutablePropertyType.booleanValue,
  stringValue: immutablePropertyType.stringValue,
  intValue: immutablePropertyType.intValue,
  floatValue: immutablePropertyType.floatValue,
  latitudeValue: immutablePropertyType.latitudeValue,
  longitudeValue: immutablePropertyType.longitudeValue,
  rangeFromValue: immutablePropertyType.rangeFromValue,
  rangeToValue: immutablePropertyType.rangeToValue,
  propertyType: immutablePropertyType.propertyType,
});

export const convertTableTypeToMutationInput = (
  propertyTypes: Array<TableType>,
): Array<TableType> => {
  return propertyTypes
    ?.filter(propType => !!propType.name)
    .map(prop => {
      return {
        ...prop,
        id: isTempId(prop.id) ? undefined : prop.id,
      };
    });
};
