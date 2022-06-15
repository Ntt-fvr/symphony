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

type ParallelSettings = $ReadOnly<{|
  parallelSettings: string,
|}>;

export const initialParallelSettings: ParallelSettings = {
  parallelSettings: 'ParallelSettings',
};

export const setParallelSettings: ParallelSettings = newParallelSettings => {
  return newParallelSettings;
};
