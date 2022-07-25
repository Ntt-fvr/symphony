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

export type ErrorHandlingType = {
  enableErrorHandling: boolean,
  enableRetryPolicy: boolean,
  retryInterval: number,
  units: string,
  maxAttemps: number,
  backoffRate: number,
  errorCatching: boolean,
};

export const initialErrorSettings: ErrorHandlingType = {
  enableErrorHandling: undefined,
  enableRetryPolicy: undefined,
  retryInterval: undefined,
  units: undefined,
  maxAttemps: undefined,
  backoffRate: undefined,
  errorCatching: undefined,
};

export const setErrorSettings: ErrorHandlingType = (
  newErrorSettings: ErrorHandlingType,
) => {
  return newErrorSettings;
};
