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

type ChoiceRouteInputType = {|
  cid: string,
  name: string,
  condition: string,
|};

export type ChoiceBlockInputType = {
  routes: ChoiceRouteInputType,
  ...BaseBlockInputType,
};
export type ChoiceSettingsType = $ReadOnly<{|
  routes: Array<ChoiceRouteInputType>,
|}>;

export const initialChoiceSettings: ChoiceSettingsType = {
  routes: undefined,
};

export const setChoiceSettings: ChoiceSettingsType = (
  newChoiceSettings: Array<ChoiceRouteInputType>,
) => {
  return {routes: newChoiceSettings};
};
