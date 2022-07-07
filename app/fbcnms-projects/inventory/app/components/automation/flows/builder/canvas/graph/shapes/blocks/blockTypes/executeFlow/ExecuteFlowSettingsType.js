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

export type ExecuteFlowSettingsType = $ReadOnly<{|
  flow: string,
|}>;

export const initialExecuteFlowSettings: ExecuteFlowSettingsType = {
  flow: undefined,
};

export const setExecuteFlowSettings: ExecuteFlowSettingsType = (
  newExecuteFlowSettings: ExecuteFlowSettingsType,
) => {
  return newExecuteFlowSettings;
};
