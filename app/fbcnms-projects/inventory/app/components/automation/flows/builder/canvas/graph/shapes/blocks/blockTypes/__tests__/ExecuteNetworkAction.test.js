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

import ExecuteNetworkActionPresentation from '../executeNetworkAction/ExecuteNetworkActionPresentation';
import ExecuteNetworkActionBlockType from '../executeNetworkAction/ExecuteNetworkActionBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /ExecuteNetworkAction/: ', () => {
  it('Render components <ExecuteNetworkActionPresentation/>', () => {
    render(<ExecuteNetworkActionPresentation />);
    const text = screen.getByText(/execute network action/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class ExecuteNetworkActionBlockType', () => {
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
});
