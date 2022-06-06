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

type ExecuteFlowSettings = $ReadOnly<{|
  executeFlowSettings: string,
|}>;

export const initialExecuteFlowSettings: ExecuteFlowSettings = {
  executeFlowSettings: 'ExecuteFlowSettings',
};

export const setExecuteFlowSettings: ExecuteFlowSettings = newExecuteFlowSettings => {
  return {
    newExecuteFlowSettings,
  };
};
