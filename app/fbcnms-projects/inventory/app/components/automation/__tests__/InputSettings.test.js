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
  initialInputSettings,
  setInputSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/InputSettings';

describe('Suite Test InputSettings: ', () => {
  test('AUT-FE-05058 Test InputSettings', () => {
    expect(initialInputSettings.enableInputTransformation).toStrictEqual(null);
    expect(initialInputSettings.enableInputStateTransformation).toStrictEqual(
      null,
    );
    const setInitialInputSettings = setInputSettings({
      ...initialInputSettings,
      enableInputTransformation: true,
    });
    expect(setInitialInputSettings.enableInputTransformation).toStrictEqual(
      true,
    );
    expect(
      setInitialInputSettings.enableInputStateTransformation,
    ).toStrictEqual(null);
  });
});
