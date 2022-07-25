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

type UpdateInventorySettings = $ReadOnly<{|
  updateInventorySettings: string,
|}>;

export const initialUpdateInventorySettings: UpdateInventorySettings = {
  updateInventorySettings: 'UpdateInventorySettings',
};

export const setUpdateInventorySettings: UpdateInventorySettings = newUpdateInventorySettings => {
  return newUpdateInventorySettings;
};
