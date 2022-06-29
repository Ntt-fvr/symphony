/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {TableDispatcherActionType} from './TableDispatcherActionType';

import React from 'react';
import emptyFunction from '@fbcnms/util/emptyFunction';

type Dispatch<A> = A => void;

type TableDispatcher = Dispatch<TableDispatcherActionType>;

export default (React.createContext<TableDispatcher>(
  emptyFunction,
): React$Context<TableDispatcher>);
