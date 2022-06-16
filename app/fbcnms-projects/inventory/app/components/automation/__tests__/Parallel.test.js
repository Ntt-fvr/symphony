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

import ParallelBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/parallel/ParallelBlockType';
import ParallelPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/parallel/ParallelPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Parallel/: ', () => {
  it('AUT-FE-05025 Render component <ParallelPresentation/>', () => {
    render(<ParallelPresentation />);
    const text = screen.getByText(/parallel/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05026 Instance class ParallelBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ParallelBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/parallelBlock/i);
    expect(text).toBeInTheDocument();
  });
});
