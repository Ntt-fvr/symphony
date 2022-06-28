/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {
  initialErrorSettings,
  setErrorSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/ErrorSettings';

describe('Suite Test ErrorSettings: ', () => {
  test('AUT-FE-05056 Test ErrorSettings', () => {
    expect(initialErrorSettings.enableRetryPolicy).toStrictEqual(null);
    expect(initialErrorSettings.units).toStrictEqual(null);
    const setInitialErrorSettings = setErrorSettings({
      ...initialErrorSettings,
      enableRetryPolicy: true,
    });
    expect(setInitialErrorSettings.enableRetryPolicy).toStrictEqual(true);
    expect(setInitialErrorSettings.units).toStrictEqual(null);
  });
});
