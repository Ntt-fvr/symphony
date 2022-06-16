/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

export type PropertyType = {|
  id: string,
  name: string,
  index?: ?number,
  isDeleted?: ?boolean,
  options?: string,
|};

import type {TableDispatcherActionType} from './TableDispatcherActionType';
import type {TableState} from './TableTypeState';

import {getInitialTableType} from './TableTypeState';

export function getInitialState(
  propertyTypes: Array<PropertyType>,
): TableState {
  return propertyTypes.length === 0
    ? [getInitialTableType(0)]
    : propertyTypes.slice().map(p => ({...p}));
}

function editPropertyType<T: TableState>(
  state: T,
  updatedPropertyTypeId: string,
  updatingCallback: PropertyType => PropertyType,
): T {
  const propertyTypeIndex = state.findIndex(
    p => p.id === updatedPropertyTypeId,
  );
  return [
    ...state.slice(0, propertyTypeIndex),
    updatingCallback(state[propertyTypeIndex]),
    ...state.slice(propertyTypeIndex + 1),
  ];
}

function removePropertyType<T: TableState>(
  state: T,
  deletedPropertyTypeId: string,
): T {
  const newState = state.filter(
    propertyType => deletedPropertyTypeId !== propertyType.id,
  );
  return [...newState];
}

export function reducer(
  state: TableState,
  action: TableDispatcherActionType,
): TableState {
  switch (action.type) {
    case 'ADD_PROPERTY_TYPE':
      return [...state, getInitialTableType(state.length)];
    case 'DELETE_PROPERTY_TYPE':
      return editPropertyType(state, action.id, pt => ({
        ...pt,
        isDeleted: true,
      }));
    case 'REMOVE_PROPERTY_TYPE':
      return removePropertyType(state, action.id);
    case 'UPDATE_PROPERTY_TYPE_NAME':
      return editPropertyType(state, action.id, pt => ({
        ...pt,
        name: action.name,
        options: action.options,
      }));
    default:
      return state;
  }
}
