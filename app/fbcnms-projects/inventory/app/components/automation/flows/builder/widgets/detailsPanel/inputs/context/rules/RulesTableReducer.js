/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {
  reorder,
  sortByIndex,
} from '../../../../../../../../draggable/DraggableUtils';

import type {RuleType} from './RuleType';

import {RulesTableDispatcherActionType} from './RulesTableDispatcherActionType';
import {RulesTableState, getInitialRule} from './RulesTableState';

export function getInitialRulesState(rules: Array<RuleType>): RulesTableState {
  return rules.length === 0
    ? [getInitialRule(0)]
    : rules.slice().map(p => ({...p}));
}

function editRule<T: RuleType>(
  state: T,
  updatedRuleId: string,
  updatingCallback: RuleType => RuleType,
): T {
  const ruleIndex = state.findIndex(rule => rule.id === updatedRuleId);
  return [
    ...state.slice(0, ruleIndex),
    updatingCallback(state[ruleIndex]),
    ...state.slice(ruleIndex + 1),
  ];
}

export function rulesTableReducer(
  state: RulesTableState,
  action: RulesTableDispatcherActionType,
): RulesTableState {
  switch (action.type) {
    case 'ADD_PROPERTY_TYPE':
      return [...state, getInitialRule(state.length)];
    case 'DELETE_RULE':
      return editRule(state, action.id, rule => ({
        ...rule,
        isDeleted: true,
      }));
    case 'UPDATE_RULE_NAME':
      return editRule(state, action.id, rule => ({
        ...rule,
        name: action.name,
      }));
    case 'UPDATE_RULE_VALUE':
      return editRule(state, action.id, rule => ({
        ...rule,
        rule: action.rule,
      }));
    case 'CHANGE_RULE_INDEX':
      const sortedNotDeletedState = state
        .filter(rule => !rule.isDeleted)
        .sort(sortByIndex);
      return [
        ...reorder<RuleType>(
          sortedNotDeletedState,
          action.sourceIndex,
          action.destinationIndex,
        ).map((p, index) => {
          return {
            ...p,
            index,
          };
        }),
        ...state.filter(rule => rule.isDeleted),
      ];
    default:
      return state;
  }
}
