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

type DecisionRouteInputType = {|
  cid: string,
  name: String,
  condition: string,
|};

export type DecisionBlockInputType = {
  routes: DecisionRouteInputType,
  ...BaseBlockInputType,
};
export type DecisionSettings = $ReadOnly<{|
  routes: DecisionRouteInputType,
|}>;

export const initialDecisionSettings: DecisionSettings = {
  routes: {
    cid: null,
    name: null,
    condition: null,
  },
};

export const setDecisionSettings: DecisionSettings = newDecisionSettings => {
  return newDecisionSettings;
};
