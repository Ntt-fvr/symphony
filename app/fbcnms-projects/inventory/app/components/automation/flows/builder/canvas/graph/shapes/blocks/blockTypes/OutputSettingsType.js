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
  outputTransfStrategy: string,
  enableOutputStateTransformation: boolean,
  outputStateTransfStrategy: string,
  outputStateParamDefinitions: string,
  addOriginal: boolean,
  addOriginalJson: string,
  additionMethod: string,
};

export const initialOutputSettings: OutputSettingsType = {
  enableOutputTransformation: false,
  outputTransfStrategy: undefined,
  outputParamDefinitions: undefined,
  enableOutputStateTransformation: false,
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
