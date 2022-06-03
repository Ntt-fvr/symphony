/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

// import type {PropertyKind} from '../../../configure/__generated__/AddEditEquipmentTypeCard_editingEquipmentType.graphql';
import type {PropertyType} from '../../../../common/PropertyType';

export type ParameterTypeTableDispatcherActionType =
  | {|
      type: 'ADD_PARAMETER_TYPE',
      resourceSpecification: string,
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
      type: 'UPDATE_PARAMETER_TYPE_KIND',
      id: string,
      // kind: PropertyKind,
      nodeType?: ?string,
      resourceSpecification: string,
    |}
  | {|
      type: 'UPDATE_PARAMETER_TYPE',
      value: PropertyType,
    |}
  | {|
      type: 'CHANGE_PARAMETER_TYPE_INDEX',
      sourceIndex: number,
      destinationIndex: number,
    |};
