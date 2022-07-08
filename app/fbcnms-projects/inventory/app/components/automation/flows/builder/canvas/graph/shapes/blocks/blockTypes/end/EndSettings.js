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

import type {BlockUIRepresentationInput} from '../BaseBlockSettingsTypes';

export type EndBlockInputType = {|
  cid: string,
  params: string,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};

export type EndSettings = $ReadOnly<{|
  params: string,
|}>;

export const initialEndSettings: EndSettings = {
  params: undefined,
};

export const setEndSettings: EndSettings = newEndSettings => {
  return newEndSettings;
};
