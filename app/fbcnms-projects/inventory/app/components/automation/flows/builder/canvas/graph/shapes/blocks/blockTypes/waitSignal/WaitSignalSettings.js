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

export type WaitSignalSettings = $ReadOnly<{|
  signalType: string,
  signalModule: string,
  customFilter: string,
  blocked: true,
|}>;

export const initialWaitSignalSettings: WaitSignalSettings = {
  signalType: null,
  signalModule: null,
  customFilter: null,
  blocked: null,
};

export const setWaitSignalSettings: WaitSignalSettings = newWaitSignalSettings => {
  return newWaitSignalSettings;
};
