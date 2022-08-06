/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

export type TableDispatcherActionType =
  | {|
      type: 'ADD_PROPERTY_TYPE',
    |}
  | {|
      type: 'DELETE_PROPERTY_TYPE',
      id: string,
    |}
  | {|
      type: 'REMOVE_PROPERTY_TYPE',
      id: string,
    |}
  | {|
      type: 'UPDATE_PROPERTY_TYPE_NAME',
      id: string,
      name: string,
      resourceSpecification: string,
    |};
