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
  initialOutputSettings,
  setOutputSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/OutputSettings';

describe('Suite Test OutputSettings: ', () => {
  test('AUT-FE-05057 Test OutputSettings', () => {
    expect(initialOutputSettings.enableOutputTransformation).toStrictEqual(
      null,
    );
    expect(initialOutputSettings.outputParamDefinitions).toStrictEqual(null);
    const setInitialOutputSettings = setOutputSettings({
      ...initialOutputSettings,
      enableOutputTransformation: true,
    });
    expect(setInitialOutputSettings.enableOutputTransformation).toStrictEqual(
      true,
    );
    expect(setInitialOutputSettings.outputParamDefinitions).toStrictEqual(null);
  });
});
