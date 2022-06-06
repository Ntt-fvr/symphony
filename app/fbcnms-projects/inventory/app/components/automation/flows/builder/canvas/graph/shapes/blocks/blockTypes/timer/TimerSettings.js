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

type TimerSettings = $ReadOnly<{|
  timerSettings: string,
|}>;

export const initialTimerSettings: TimerSettings = {
  timerSettings: 'TimerSettings',
};

export const setTimerSettings: TimerSettings = newTimerSettings => {
  return {
    newTimerSettings,
  };
};
