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

export type GoToBlockInputType = {
  cid: string,
  targetBlockCid?: ?string,
  uiRepresentation?: ?BlockUIRepresentationInput,
  type: string,
};

export type GoToSettingsType = $ReadOnly<{|
  type: string,
|}>;

export const initialGoToSettings: GoToSettingsType = {
  type: 'ORIGIN',
};

export const setGoToSettings: GoToSettingsType = (
  newGoToSettings: GoToSettingsType,
) => {
  return newGoToSettings;
};
