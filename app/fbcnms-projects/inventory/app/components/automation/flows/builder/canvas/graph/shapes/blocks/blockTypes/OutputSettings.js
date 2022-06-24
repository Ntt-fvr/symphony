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

export type OutputSettings = {
  enableOutputTransformation: boolean,
  outputParamDefinitions: string,
  outputTranfStrategy: string,
  enableOutputStateTransformation: boolean,
  outputStateTransfStrategy: string,
  outputStateParamDefinitions: string,
};

export const initialOutputSettings: OutputSettings = {
  enableOutputTransformation: null,
  outputTranfStrategy: null,
  outputParamDefinitions: null,
  enableOutputStateTransformation: null,
  outputStateTransfStrategy: null,
  outputStateParamDefinitions: null,
};

export const setOutputSettings = newOutputSettings => {
  return newOutputSettings;
};
