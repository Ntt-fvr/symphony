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

type DecisionSettings = $ReadOnly<{|
  decisionSettings: string,
|}>;

export const initialDecisionSettings: DecisionSettings = {
  decisionSettings: 'DecisionSettings',
};

export const setDecisionSettings: DecisionSettings = newDecisionSettings => {
  return newDecisionSettings;
};
