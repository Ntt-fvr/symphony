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

import InvokeRestApiBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiBlockType';
import InvokeRestApiPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /InvokeRestApi/: ', () => {
  it('AUT-FE-05021 Render component <InvokeRestApiPresentation/>', () => {
    render(<InvokeRestApiPresentation />);
    const text = screen.getByText(/invoke/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05022 Instance class InvokeRestApiBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new InvokeRestApiBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.invoke/i);
    expect(text).toBeInTheDocument();
  });
});
