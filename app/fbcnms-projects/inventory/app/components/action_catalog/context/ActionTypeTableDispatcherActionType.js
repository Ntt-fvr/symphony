/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
export type ActionTypeTableDispatcherActionType =
  | {|
      type: 'ADD_ACTION_TYPE',
      value: {},
    |}
  | {|
      type: 'REMOVE_ACTION_TYPE',
      id: string,
    |}
  | {|
      type: 'UPDATE_ACTION_TYPE_NAME',
      id: string,
      name: string,
    |}
  | {|
      type: 'UPDATE_ACTION_TYPE',
      id: string,
      value: string,
    |}
  | {|
      type: 'UPDATE_ACTION_TYPE_ITEMS',
      id: string,
      actionTemplateItem: [],
    |};
