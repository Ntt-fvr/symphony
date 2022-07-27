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

export type InputSettingsType = {
  enableInputTransformation: boolean,
  inputTransfStrategy: string,
  inputParamDefinitions: string,
  enableInputStateTransformation: boolean,
  inputStateTransfStrategy: string,
  inputStateParamDefinitions: string,
};

export const initialInputSettings: InputSettingsType = {
  enableInputTransformation: false,
  inputTransfStrategy: undefined,
  inputParamDefinitions: undefined,
  enableInputStateTransformation: false,
  inputStateTransfStrategy: undefined,
  inputStateParamDefinitions: undefined,
};

export const setInputSettings: InputSettingsType = (
  newInputSettings: InputSettingsType,
) => {
  return newInputSettings;
};
