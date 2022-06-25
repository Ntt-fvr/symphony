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
import type {BaseBlockInputType} from '../BaseBlockSettingsTypes';

export type ExecuteFlowBlockInputType = {
  flow: string,
  ...BaseBlockInputType,
};

export type ExecuteFlowSettings = $ReadOnly<{|
  flow: string,
|}>;

export const initialExecuteFlowSettings: ExecuteFlowSettings = {
  flow: null,
};

export const setExecuteFlowSettings: ExecuteFlowSettings = newExecuteFlowSettings => {
  return newExecuteFlowSettings;
};
