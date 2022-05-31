/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

export type RulesTableDispatcherActionType =
  | {|
      type: 'ADD_RULE',
    |}
  | {|
      type: 'DELETE_RULE',
      id: string,
    |}
  | {|
      type: 'UPDATE_RULE_NAME',
      id: string,
      name: string,
    |}
  | {|
      type: 'UPDATE_RULE_VALUE',
      id: string,
      rule: string,
    |}
  | {|
      type: 'CHANGE_RULE_INDEX',
      sourceIndex: number,
      destinationIndex: number,
    |};
