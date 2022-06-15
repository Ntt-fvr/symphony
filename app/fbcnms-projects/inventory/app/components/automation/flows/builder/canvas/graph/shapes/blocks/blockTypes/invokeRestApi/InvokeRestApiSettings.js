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

type InvokeRestApiSettings = $ReadOnly<{|
  invokeRestApiSettings: string,
|}>;

export const initialInvokeRestApiSettings: InvokeRestApiSettings = {
  invokeRestApiSettings: 'InvokeRestApiSettings',
};

export const setInvokeRestApiSettings: InvokeRestApiSettings = newInvokeRestApiSettings => {
  return newInvokeRestApiSettings;
};
