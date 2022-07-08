/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ParameterType} from '../../../../common/ParameterType';
import type {ParameterTypeTableDispatcherActionType} from './ParameterTypeTableDispatcherActionType';
import type {ParameterTypesTableState} from './ParameterTypesTableState';

import {getInitialParameterType} from './ParameterTypesTableState';
import {reorder} from '../../../draggable/DraggableUtils';
import {sortByIndex} from '../../../draggable/DraggableUtils';

export function getInitialState(parameterTyp: any): ParameterTypesTableState {
  const {parameterTypes, resourceSpecification} = parameterTyp;
  return parameterTypes.length === 0
    ? [getInitialParameterType(0, resourceSpecification)]
    : parameterTypes.slice().map(p => ({...p}));
}

function editParameterType<T: ParameterTypesTableState>(
  state: T,
  updatedParameterTypeId: string,
  updatingCallback: ParameterType => ParameterType,
): T {
  const parameterTypeIndex = state.findIndex(
    p => p.id === updatedParameterTypeId,
  );
  return [
    ...state.slice(0, parameterTypeIndex),
    updatingCallback(state[parameterTypeIndex]),
    ...state.slice(parameterTypeIndex + 1),
  ];
}
function removeParameterType<T: ParameterTypesTableState>(
  state: T,
  deletedParameterTypeId: string,
): T {
  const newState = state.filter(
    parameterType => deletedParameterTypeId !== parameterType.id,
  );
  return [...newState];
}

export function reducerParameter(
  state: ParameterTypesTableState,
  action: ParameterTypeTableDispatcherActionType,
): ParameterTypesTableState {
  switch (action.type) {
    case 'ADD_PARAMETER_TYPE':
      return [
        ...state,
        getInitialParameterType(state.length, action.resourceSpecification),
      ];
    case 'DELETE_PARAMETER_TYPE':
      return editParameterType(state, action.id, pt => ({
        ...pt,
        isDeleted: true,
      }));
    case 'REMOVE_PARAMETER_TYPE':
      return removeParameterType(state, action.id);
    case 'UPDATE_PARAMETER_TYPE_NAME':
      return editParameterType(state, action.id, pt => ({
        ...pt,
        name: action.name,
      }));
    case 'UPDATE_PARAMETER_TYPE_TEXT_IN':
      return editParameterType(state, action.id, pt => ({
        ...pt,
        mappingIn: action.mappingIn,
      }));
    case 'UPDATE_PARAMETER_TYPE_TEXT_OUT':
      return editParameterType(state, action.id, pt => ({
        ...pt,
        mappingOut: action.mappingOut,
      }));
    case 'UPDATE_PARAMETER_TYPE_KIND':
      return editParameterType(state, action.id, pt => ({
        ...getInitialParameterType(pt.index ?? 0, action.resourceSpecification),
        id: action.id,
        type: action.kind,
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
        ...reorder<ParameterType>(
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
