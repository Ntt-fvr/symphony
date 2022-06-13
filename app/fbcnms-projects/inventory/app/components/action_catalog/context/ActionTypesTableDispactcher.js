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

 import React from 'react';
 import emptyFunction from '@fbcnms/util/emptyFunction';
 
 type Dispatch<A> = A => void;
 
 type ActionTypesTableDispatcher = Dispatch<ActionTypeTableDispatcherActionType>;
 
 export default (React.createContext<ActionTypesTableDispatcher>(
   emptyFunction,
 ): React$Context<ActionTypesTableDispatcher>);
 