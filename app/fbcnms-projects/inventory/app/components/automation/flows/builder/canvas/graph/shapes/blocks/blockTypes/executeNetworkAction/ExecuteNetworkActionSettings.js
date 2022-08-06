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

export type ExecuteNetworkActionSettings = $ReadOnly<{|
  executeNetworkActionSettings: string,
|}>;

export const initialExecuteNetworkActionSettings: ExecuteNetworkActionSettings = {
  executeNetworkActionSettings: null,
};

export const setExecuteNetworkActionSettings: ExecuteNetworkActionSettings = newExecuteNetworkActionSettings => {
  return newExecuteNetworkActionSettings;
};
