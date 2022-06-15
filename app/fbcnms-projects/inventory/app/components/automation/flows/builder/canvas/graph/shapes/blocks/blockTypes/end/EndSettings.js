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

type EndSettings = $ReadOnly<{|
  endSettings: string,
|}>;

export const initialEndSettings: EndSettings = {
  endSettings: 'EndSettings',
};

export const setEndSettings: EndSettings = newEndSettings => {
  return newEndSettings;
};
