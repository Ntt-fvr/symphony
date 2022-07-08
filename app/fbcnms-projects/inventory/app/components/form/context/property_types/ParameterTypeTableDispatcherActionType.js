/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {ParameterKind} from '../../../../mutations/__generated__/AddConfigurationParameterTypeMutation.graphql';
import type {ParameterType} from '../../../../common/ParameterType';

export type ParameterTypeTableDispatcherActionType =
  | {|
      type: 'ADD_PARAMETER_TYPE',
      resourceSpecification: string,
    |}
  | {|
      type: 'DELETE_PARAMETER_TYPE',
      id: string,
    |}
  | {|
      type: 'REMOVE_PARAMETER_TYPE',
      id: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE_NAME',
      id: string,
      name: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE_TEXT_IN',
      id: string,
      mappingIn: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE_TEXT_OUT',
      id: string,
      mappingOut: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE_KIND',
      id: string,
      kind: ParameterKind,
      nodeType?: ?string,
      resourceSpecification: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE',
      value: ParameterType,
    |}
  | {|
      type: 'CHANGE_PARAMETER_TYPE_INDEX',
      sourceIndex: number,
      destinationIndex: number,
    |};
