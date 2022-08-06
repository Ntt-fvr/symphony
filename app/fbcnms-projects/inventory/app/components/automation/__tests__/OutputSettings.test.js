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
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/OutputSettingsType';

describe('Suite Test OutputSettings: ', () => {
  test('AUT-FE-05057 Test OutputSettings', () => {
    expect(initialOutputSettings.enableOutputTransformation).toStrictEqual(
      false,
    );
    expect(initialOutputSettings.outputParamDefinitions).toStrictEqual(
      undefined,
    );
    const setInitialOutputSettings = setOutputSettings({
      ...initialOutputSettings,
      enableOutputTransformation: true,
    });
    expect(setInitialOutputSettings.enableOutputTransformation).toStrictEqual(
      true,
    );
    expect(setInitialOutputSettings.outputParamDefinitions).toStrictEqual(
      undefined,
    );
  });
});
