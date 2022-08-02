/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import '@testing-library/jest-dom';
import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';

import ManualStartBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import ManualStartPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartPresentation';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/administrative/ManualStart';
import {setBlockSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /ManualStart/: ', () => {
  it('AUT-FE-05023 Render component <ManualStartPresentation/>', () => {
    render(<ManualStartPresentation />);
    const text = screen.getByText(/start/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05024 Instance class ManualStartBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ManualStartBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/startBlock/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05045 Test setManualStartSettings', () => {
    const settings = {
      paramDefinitions: 'testParams',
    };

    const objectTest = setBlockSettings(TYPE, settings);
    expect(objectTest.paramDefinitions).toStrictEqual('testParams');
  });
});
