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

type ManualStartSettings = $ReadOnly<{|
  manualStartSettings: string,
|}>;

export const initialManualStartSettings: ManualStartSettings = {
  manualStartSettings: 'ManualStartSettings',
};

export const setManualStartSettings: ManualStartSettings = newManualStartSettings => {
  return {
    newManualStartSettings,
  };
};
