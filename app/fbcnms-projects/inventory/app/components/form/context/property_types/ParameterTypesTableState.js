/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {ParameterTypeTableDispatcherActionType} from './ParameterTypeTableDispatcherActionType';
import type {PropertyType} from '../../../../common/PropertyType';

import {generateTempId} from '../../../../common/EntUtils';
import {getInitialState, reducerParameter} from './ParameterTypesTableReducer';
import {useReducer} from 'react';

export type ParameterTypesTableState = Array<PropertyType>;

export const getInitialParameterType = (index: number): PropertyType => ({
  id: generateTempId(),
  name: '',
  index: index,
  type: 'string',
  nodeType: null,
  booleanValue: false,
  stringValue: null,
  intValue: null,
  floatValue: null,
  latitudeValue: null,
  longitudeValue: null,
  rangeFromValue: null,
  rangeToValue: null,
  isEditable: true,
  isInstanceProperty: true,
});

export const useParameterTypesReducer = (
  initialParameterTypes: Array<PropertyType>,
) => {
  return useReducer<
    ParameterTypesTableState,
    ParameterTypeTableDispatcherActionType,
    Array<PropertyType>,
  >(reducerParameter, initialParameterTypes, getInitialState);
};
