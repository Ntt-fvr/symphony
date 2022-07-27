/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {RuleType} from './RuleType';

import {RulesTableDispatcherActionType} from './RulesTableDispatcherActionType';
import {generateTempId} from '../../../../../../../../../common/EntUtils';
import {getInitialRulesState, rulesTableReducer} from './RulesTableReducer';
import {useReducer} from 'react';

export type RulesTableState = Array<RuleType>;

export const getInitialRule = (
  index: number,
  isDefault: boolean,
): RuleType => ({
  id: generateTempId(),
  name: '',
  index: index,
  rule: '',
  isDeleted: false,
  isDefault,
});

export const useRulesReducer = (initialRules: Array<RuleType>) => {
  return useReducer<
    RulesTableState,
    RulesTableDispatcherActionType,
    Array<RuleType>,
  >(rulesTableReducer, initialRules, getInitialRulesState);
};
