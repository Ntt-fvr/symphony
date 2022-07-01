/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ExecuteNetworkActionSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/executeNetworkAction/ExecuteNetworkActionSettings';

import '@testing-library/jest-dom';
import ExecuteNetworkActionBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/executeNetworkAction/ExecuteNetworkActionBlockType';
import ExecuteNetworkActionPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/executeNetworkAction/ExecuteNetworkActionPresentation';
import React, {useMemo} from 'react';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteNetworkAction';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /ExecuteNetworkAction/: ', () => {
  it('AUT-FE-05015 Render component <ExecuteNetworkActionPresentation/>', () => {
    render(<ExecuteNetworkActionPresentation />);
    const text = screen.getByText(/execute network action/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05016 Instance class ExecuteNetworkActionBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(
        () => [new ExecuteNetworkActionBlockType(flow)],
        [flow],
      );
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.execute/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05052 Test setExecuteNetworkActionSettings', () => {
    const objectTest: ExecuteNetworkActionSettings = getInitialBlockSettings(
      TYPE,
    );

    expect(objectTest.executeNetworkActionSettings).toStrictEqual(null);
    const setObjectTest: ExecuteNetworkActionSettings = setBlockSettings(TYPE, {
      ...objectTest,
      executeNetworkActionSettings: 'testParams',
    });
    expect(setObjectTest.executeNetworkActionSettings).toStrictEqual(
      'testParams',
    );
  });
});
