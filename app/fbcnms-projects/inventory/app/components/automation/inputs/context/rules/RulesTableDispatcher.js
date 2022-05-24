/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import emptyFunction from '@fbcnms/util/emptyFunction';
import {RulesTableDispatcherActionType} from './RulesTableDispatcherActionType';

type Dispatch<A> = A => void;

type RulesTableDispatcher = Dispatch<RulesTableDispatcherActionType>;

export default (React.createContext<RulesTableDispatcher>(
  emptyFunction,
): React$Context<RulesTableDispatcher>);
