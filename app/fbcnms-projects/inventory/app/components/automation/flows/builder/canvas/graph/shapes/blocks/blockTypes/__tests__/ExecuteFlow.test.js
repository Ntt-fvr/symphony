/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import ExecuteFlowPresentation from '../executeFlow/ExecuteFlowPresentation';
import ExecuteFlowBlockType from '../executeFlow/ExecuteFlowBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /ExecuteFlow/: ', () => {
  it('Render components <ExecuteFlowPresentation/>', () => {
    render(<ExecuteFlowPresentation />);
    const text = screen.getByText(/execute flow/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class ExecuteFlowBlockType', () => {
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
