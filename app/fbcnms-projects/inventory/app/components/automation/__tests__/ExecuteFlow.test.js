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

import ExecuteFlowBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/executeFlow/ExecuteFlowBlockType';
import ExecuteFlowPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/executeFlow/ExecuteFlowPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /ExecuteFlow/: ', () => {
  it('AUT-FE-05013  Render component <ExecuteFlowPresentation/>', () => {
    render(<ExecuteFlowPresentation />);
    const text = screen.getByText(/execute flow/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05014 Instance class ExecuteFlowBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ExecuteFlowBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.execute/i);
    expect(text).toBeInTheDocument();
  });
});
