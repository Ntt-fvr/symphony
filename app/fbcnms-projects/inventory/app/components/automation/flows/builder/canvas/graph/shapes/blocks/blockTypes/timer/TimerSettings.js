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

export type TimerSettings = $ReadOnly<{|
  behavior: string,
  seconds: number,
  datetime: string,
  enableExpressionL: boolean,
  expression: string,
  exitPoint: string,
|}>;

export const initialTimerSettings: TimerSettings = {
  behavior: null,
  seconds: null,
  datetime: null,
  enableExpressionL: null,
  expression: null,
  exitPoint: null,
};

export const setTimerSettings: TimerSettings = newTimerSettings => {
  return newTimerSettings;
};
