/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

export type VariableType =
  | 'DATE'
  | 'INT'
  | 'LOCATION'
  | 'PROJECT'
  | 'STRING'
  | 'USER'
  | 'WORK_ORDER'
  | 'WORK_ORDER_TYPE'
  | '%future added value';

export type BlockUIRepresentationInput = {|
  name: string,
  xPosition: number,
  yPosition: number,
|};

export type VariableDefinitionInput = {|
  key: string,
  type: VariableType,
  mandatory?: ?boolean,
  multipleValues?: ?boolean,
  choices?: ?$ReadOnlyArray<string>,
  defaultValue?: ?string,
|};

export type BaseBlockInputType = $ReadOnly<{|
  cid: string,
  uiRepresentation: {|
    name: string,
    xPosition: number,
    yPosition: number,
  |},
  basicDefinitions: BaseBlockType,
|}>;

export type BaseBlockType = $ReadOnly<{|
  enableInputTransformation: boolean,
  inputTransfStrategy?: string,
  inputParamDefinitions?: string,
  enableInputStateTransformation: boolean,
  inputStateTransfStrategy: string,
  inputStateParamDefinitions: string,
  enableOutputTransformation: boolean,
  outputTransfStrategy?: string,
  outputParamDefinitions?: string,
  enableOutputStateTransformation: boolean,
  outputStateTransfStrategy: string,
  outputStateParamDefinitions: string,
  enableErrorHandling?: boolean,
  enableRetryPolicy?: boolean,
  retryInterval?: number,
  units?: string,
  maxAttemps?: number,
  backoffRate?: number,
|}>;
