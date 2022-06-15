/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ActionTypeTableDispatcherActionType} from './ActionTypeTableDispatcherActionType';

import type {ActionTypesTableState} from './ActionTypesTableState';

export function getInitialState(
  propertyTypes: Array<PropertyType>,
): ActionTypesTableState {
  return propertyTypes.length === 0
    ? []
    : propertyTypes.slice().map(p => ({...p}));
}

function editActionType<T: ActionTypesTableState>(
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

export function reducer(
  state: ActionTypesTableState,
  action: ActionTypeTableDispatcherActionType,
): ActionTypesTableState {
  switch (action.type) {
    case 'ADD_ACTION_TYPE':
      return [...state, ...action.value];
    case 'REMOVE_ACTION_TYPE':
      return state.filter(prt => prt.id !== action.id);
    case 'UPDATE_ACTION_TYPE_NAME':
      return editActionType(state, action.id, pt => ({
        ...pt,
        name: action.name,
      }));
    case 'UPDATE_ACTION_TYPE':
      return editActionType(state, action.id, pt => ({
        ...pt,
        ...action.value,
      }));
    case 'UPDATE_ACTION_TYPE_ITEMS':
      return editActionType(state, action.id, pt => ({
        ...pt,
        ...action.items,
      }));
    default:
      return state;
  }
}
