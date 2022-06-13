/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ParameterTypeTableDispatcherActionType} from './ParameterTypeTableDispatcherActionType';
import type {ParameterTypesTableState} from './ParameterTypesTableState';
import type {PropertyType} from '../../../../common/PropertyType';

import {getInitialParameterType} from './ParameterTypesTableState';
import {reorder} from '../../../draggable/DraggableUtils';
import {sortByIndex} from '../../../draggable/DraggableUtils';

export function getInitialState(
  propertyTypes: Array<PropertyType>,
): ParameterTypesTableState {
  return propertyTypes.length === 0
    ? [getInitialParameterType(0)]
    : propertyTypes.slice().map(p => ({...p}));
}

function editParameterType<T: ParameterTypesTableState>(
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

export function reducerParameter(
  state: ParameterTypesTableState,
  action: ParameterTypeTableDispatcherActionType,
): ParameterTypesTableState {
  switch (action.type) {
    case 'ADD_PARAMETER_TYPE':
      return [...state, getInitialParameterType(state.length)];
    case 'REMOVE_PARAMETER_TYPE':
      return state.filter(prt => prt.id !== action.id);
    case 'UPDATE_PARAMETER_TYPE_NAME':
      return editParameterType(state, action.id, pt => ({
        ...pt,
        name: action.name,
      }));
    case 'UPDATE_PARAMETER_TYPE_KIND':
      return editParameterType(state, action.id, pt => ({
        ...getInitialParameterType(pt.index ?? 0),
        id: action.id,
        // type: action.kind,
        name: pt.name,
        nodeType: action.nodeType,
      }));
    case 'UPDATE_PARAMETER_TYPE':
      return editParameterType(state, action.value.id, pt => ({
        ...pt,
        ...action.value,
      }));
    case 'CHANGE_PARAMETER_TYPE_INDEX':
      const sortedNotDeletedState = state
        .filter(pt => !pt.isDeleted)
        .sort(sortByIndex);
      return [
        ...reorder<PropertyType>(
          sortedNotDeletedState,
          action.sourceIndex,
          action.destinationIndex,
        ).map((p, index) => {
          return {
            ...p,
            index,
          };
        }),
        ...state.filter(pt => pt.isDeleted),
      ];
    default:
      return state;
  }
}
