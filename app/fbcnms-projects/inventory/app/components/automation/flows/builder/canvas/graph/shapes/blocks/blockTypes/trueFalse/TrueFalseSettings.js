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

import type {BaseBlockInputType} from '../BaseBlockSettingsTypes';

export type TrueFalseBlockInputType = {
  ...BaseBlockInputType,
};
type TrueFalseSettings = $ReadOnly<{|
  trueFalseSettings: string,
|}>;

export const initialTrueFalseSettings: TrueFalseSettings = {
  trueFalseSettings: 'TrueFalseSettings',
};

export const setTrueFalseSettings: TrueFalseSettings = newTrueFalseSettings => {
  return newTrueFalseSettings;
};
