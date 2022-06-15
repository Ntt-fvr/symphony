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

type TriggerStartSettings = $ReadOnly<{|
  triggerStartSettings: string,
|}>;

export const initialTriggerStartSettings: TriggerStartSettings = {
  triggerStartSettings: 'TriggerStartSettings',
};

export const setTriggerStartSettings: TriggerStartSettings = newTriggerStartSettings => {
  return newTriggerStartSettings;
};
