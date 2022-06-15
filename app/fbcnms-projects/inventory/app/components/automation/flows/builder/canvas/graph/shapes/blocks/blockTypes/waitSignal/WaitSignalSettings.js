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

type WaitSignalSettings = $ReadOnly<{|
  waitSignalSettings: string,
|}>;

export const initialWaitSignalSettings: WaitSignalSettings = {
  waitSignalSettings: 'WaitSignalSettings',
};

export const setWaitSignalSettings: WaitSignalSettings = newWaitSignalSettings => {
  return newWaitSignalSettings;
};
