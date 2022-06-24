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

export type GotoBlockInputType = {
  cid: string,
  targetBlockCid?: ?string,
  uiRepresentation?: ?BlockUIRepresentationInput,
  type: string,
};

export type GoToSettings = $ReadOnly<{|
  gotoType: string,
  targetBlockCid: string,
|}>;

export const initialGoToSettings: GoToSettings = {
  gotoType: null,
  targetBlockCid: null,
};

export const setGoToSettings: GoToSettings = newGoToSettings => {
  return newGoToSettings;
};
