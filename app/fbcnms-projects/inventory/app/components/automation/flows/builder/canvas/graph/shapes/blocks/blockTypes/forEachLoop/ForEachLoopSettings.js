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

export type ForEachLoopSettings = $ReadOnly<{|
  forEachLoopSettings: string,
|}>;

export const initialForEachLoopSettings: ForEachLoopSettings = {
  forEachLoopSettings: null,
};

export const setForEachLoopSettings: ForEachLoopSettings = newForEachLoopSettings => {
  return newForEachLoopSettings;
};
