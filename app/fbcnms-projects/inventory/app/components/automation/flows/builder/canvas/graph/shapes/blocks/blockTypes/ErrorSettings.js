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

export type ErrorHandling = {
  enableErrorHandling: boolean,
  enableRetryPolicy: boolean,
  retryInterval: number,
  units: string,
  maxAttemps: number,
  backoffRate: number,
};

export const initialErrorSettings: ErrorHandling = {
  enableErrorHandling: null,
  enableRetryPolicy: null,
  retryInterval: null,
  units: null,
  maxAttemps: null,
  backoffRate: null,
};

export const setErrorSettings = newErrorSettings => {
  return newErrorSettings;
};
