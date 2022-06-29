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

export type StartBlockInputType = {
  cid: string,
  paramDefinitions: string,
  uiRepresentation?: ?BlockUIRepresentationInput,
};

export type ManualStartSettingsType = $ReadOnly<{|
  paramDefinitions: string,
|}>;

export const initialManualStartSettings: ManualStartSettingsType = {
  paramDefinitions: null,
};

export const setManualStartSettings: ManualStartSettingsType = (
  newManualStartSettings: ManualStartSettingsType,
) => {
  return newManualStartSettings;
};
