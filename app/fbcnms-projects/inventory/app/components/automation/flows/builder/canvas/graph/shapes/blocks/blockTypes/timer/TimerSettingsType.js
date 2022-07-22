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

export type TimerSettingsType = $ReadOnly<{|
  behavior: string,
  seconds: number,
  specificDatetime: string,
  enableExpressionL: boolean,
  expression: string,
  exitPoint: string,
|}>;

export const initialTimerSettings: TimerSettingsType = {
  behavior: null,
  seconds: null,
  specificDatetime: null,
  enableExpressionL: null,
  expression: null,
  exitPoint: null,
};

export const setTimerSettings: TimerSettingsType = (
  newTimerSettings: TimerSettingsType,
) => {
  return newTimerSettings;
};
