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

type TriggerWorkforceSettings = $ReadOnly<{|
  triggerWorkforceSettings: string,
|}>;

export const initialTriggerWorkforceSettings: TriggerWorkforceSettings = {
  triggerWorkforceSettings: 'TriggerWorkforceSettings',
};

export const setTriggerWorkforceSettings: TriggerWorkforceSettings = newTriggerWorkforceSettings => {
  return newTriggerWorkforceSettings;
};
