/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {ParameterType} from '../../../../common/ParameterType';
import type {ParameterTypeTableDispatcherActionType} from './ParameterTypeTableDispatcherActionType';

import {generateTempId} from '../../../../common/EntUtils';
import {getInitialState, reducerParameter} from './ParameterTypesTableReducer';
import {useReducer} from 'react';

export type ParameterTypesTableState = Array<ParameterType>;

export const getInitialParameterType = (
  index: number,
  resourceSpecification: string = '',
): ParameterType => ({
  booleanValue: false,
  category: null,
  externalId: null,
  floatValue: null,
  id: generateTempId(),
  index: index,
  intValue: null,
  isDeleted: null,
  isEditable: true,
  isListable: null,
  isMandatory: null,
  isPrioritary: false,
  mappingIn: null,
  mappingOut: null,
  name: '',
  nodeType: null,
  parameters: null,
  rawValue: null,
  resourceSpecification,
  stringValue: null,
  tags: null,
  type: 'string',
});

export const useParameterTypesReducer = (
  initialParameterTypes: Array<ParameterType>,
) => {
  return useReducer<
    ParameterTypesTableState,
    ParameterTypeTableDispatcherActionType,
    Array<ParameterType>,
  >(reducerParameter, initialParameterTypes, getInitialState);
};
