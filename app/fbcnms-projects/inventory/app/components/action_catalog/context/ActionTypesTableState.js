/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

 import type {ActionType} from '../../../common/ActionType';
 import type {ActionTypeTableDispatcherActionType} from './ActionTypeTableDispatcherActionType';
 
 import {generateTempId} from '../../../common/EntUtils';
 import {getInitialState, reducer} from './ActionTypesTableReducer';
 import {useReducer} from 'react';
 
 export type ActionTypesTableState = Array<ActionType>;
 
 export const getInitialActionType = (index: number,resourceSpecification:string): ActionType => ({
   id: generateTempId(),
   name: '',
   index: index,
   type: '',
   resourceSpecification: resourceSpecification,
   actionTemplateItem: [],
 });
 
 export const useActionTypesReducer = (
   initialActionTypes: Array<ActionType>,
 ) => {
   return useReducer<
     ActionTypesTableState,
     ActionTypeTableDispatcherActionType,
     Array<ActionType>,
   >(reducer, initialActionTypes, getInitialState);
 };
 