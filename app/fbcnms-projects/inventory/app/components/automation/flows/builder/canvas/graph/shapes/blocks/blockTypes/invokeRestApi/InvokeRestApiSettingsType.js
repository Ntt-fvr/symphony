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

type EntryPointInput = {
  role: string,
  cid: string,
};
type ExitPointInput = {
  role: string,
  cid: string,
};

export type InvokeRestAPIBlockInputType = {
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  method: string,
  url: string,
  connectionTimeOut: number,
  body: string,
  headers: string,
  ...BaseBlockInputType,
};
export type InvokeRestApiSettingsType = $ReadOnly<{|
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  method: string,
  url: string,
  connectionTimeOut: number,
  body: string,
  headers: string,
|}>;

export const initialInvokeRestApiSettings: InvokeRestApiSettingsType = {
  entryPoint: null,
  exitPoint: null,
  method: null,
  url: null,
  connectionTimeOut: null,
  body: null,
  headers: null,
};

export const setInvokeRestApiSettings: InvokeRestApiSettingsType = (
  newInvokeRestApiSettings: InvokeRestApiSettingsType,
) => {
  return newInvokeRestApiSettings;
};
