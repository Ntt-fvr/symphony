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

export type InputSettings = {
  enableInputTransformation: boolean,
  inputTransfStrategy: string,
  inputParamDefinitions: string,
  enableInputStateTransformation: boolean,
  inputStateTransfStrategy: string,
  inputStateParamDefinitions: string,
};

export const initialInputSettings: InputSettings = {
  enableInputTransformation: null,
  inputTransfStrategy: null,
  inputParamDefinitions: null,
  enableInputStateTransformation: null,
  inputStateTransfStrategy: null,
  inputStateParamDefinitions: null,
};

export const setInputSettings = newInputSettings => {
  return newInputSettings;
};
