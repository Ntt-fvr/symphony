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

import type {
  BaseBlockInput,
  BlockUIRepresentationInput,
} from '../BaseBlockSettingsTypes';

type DecisionRouteInputType = {|
  cid?: ?string,
  name: String,
  condition: string,
|};

export type DecisionBlockInputType = {
  routes: DecisionRouteInputType,
  uiRepresentation?: ?BlockUIRepresentationInput,
  ...BaseBlockInput,
};
type DecisionSettings = $ReadOnly<{|
  routes: DecisionRouteInputType,
|}>;

export const initialDecisionSettings: DecisionSettings = {
  routes: null,
};

export const setDecisionSettings: DecisionSettings = newDecisionSettings => {
  return newDecisionSettings;
};
