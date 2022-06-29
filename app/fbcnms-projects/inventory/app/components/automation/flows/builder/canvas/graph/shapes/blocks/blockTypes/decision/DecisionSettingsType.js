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
  name: string,
  condition: string,
|};

export type DecisionBlockInputType = {
  routes: DecisionRouteInputType,
  ...BaseBlockInputType,
};
export type DecisionSettingsType = $ReadOnly<{|
  routes: Array<DecisionRouteInputType>,
|}>;

export const initialDecisionSettings: DecisionSettingsType = {
  routes: undefined,
};

export const setDecisionSettings: DecisionSettingsType = (
  newDecisionSettings: Array<DecisionRouteInputType>,
) => {
  return {routes: newDecisionSettings};
};
