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

export type OutputSettingsType = {
  enableOutputTransformation: boolean,
  outputParamDefinitions: string,
  outputTranfStrategy: string,
  enableOutputStateTransformation: boolean,
  outputStateTransfStrategy: string,
  outputStateParamDefinitions: string,
  addOriginal: boolean,
  addOriginalJson: string,
  additionMethod: string,
};

export const initialOutputSettings: OutputSettingsType = {
  enableOutputTransformation: undefined,
  outputTranfStrategy: undefined,
  outputParamDefinitions: undefined,
  enableOutputStateTransformation: undefined,
  outputStateTransfStrategy: undefined,
  outputStateParamDefinitions: undefined,
  addOriginal: undefined,
  addOriginalJson: undefined,
  additionMethod: undefined,
};

export const setOutputSettings: OutputSettingsType = (
  newOutputSettings: OutputSettingsType,
) => {
  return newOutputSettings;
};
