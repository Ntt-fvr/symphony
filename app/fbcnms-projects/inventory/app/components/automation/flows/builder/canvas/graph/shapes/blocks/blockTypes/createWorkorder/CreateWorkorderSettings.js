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

export type CreateWorkorderSettings = $ReadOnly<{|
  createWorkorderSettings: string,
|}>;

export const initialCreateWorkorderSettings: CreateWorkorderSettings = {
  createWorkorderSettings: null,
};

export const setCreateWorkorderSettings: CreateWorkorderSettings = newCreateWorkorderSettings => {
  return newCreateWorkorderSettings;
};
