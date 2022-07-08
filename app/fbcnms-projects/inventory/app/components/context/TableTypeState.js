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
  id: string,
  name: string,
  index?: ?number,
  isDeleted?: ?boolean,
  options?: string,
  resourceSpecification?: string,
|};

import type {TableDispatcherActionType} from './TableDispatcherActionType';

import {generateTempId} from '../../common/EntUtils';
import {getInitialState, reducer} from './TableReducer';
import {isTempId} from '../../common/EntUtils';
import {useReducer} from 'react';
export type TableState = Array<TableType>;

export const getInitialTableType = (index: number): TableType => ({
  id: generateTempId(),
  name: '',
  index: index,
  options: '',
  resourceSpecification: '',
});

export const useTableTypesReducer = (initialTableType: Array<TableType>) => {
  return useReducer<TableState, TableDispatcherActionType, Array<TableType>>(
    reducer,
    initialTableType,
    getInitialState,
  );
};

export const toMutableTableType = (
  immutableTableType: TableType,
): TableType => ({
  id: undefined,
  name: immutableTableType.name,
  index: immutableTableType.index,
  isDeleted: immutableTableType.isDeleted,
  options: immutableTableType.options,
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
