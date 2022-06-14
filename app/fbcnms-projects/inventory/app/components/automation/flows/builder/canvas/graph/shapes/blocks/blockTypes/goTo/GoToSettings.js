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

type GoToSettings = $ReadOnly<{|
  goToSettings: string,
|}>;

export const initialGoToSettings: GoToSettings = {
  goToSettings: 'GoToSettings',
};

export const setGoToSettings: GoToSettings = newGoToSettings => {
  return newGoToSettings;
};
