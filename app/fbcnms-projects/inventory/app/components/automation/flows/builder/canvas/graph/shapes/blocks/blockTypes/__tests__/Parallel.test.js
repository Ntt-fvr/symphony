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

import ParallelPresentation from '../parallel/ParallelPresentation';
import ParallelBlockType from '../parallel/ParallelBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe('Test Components /Parallel/: ', () => {
  it('Render components <ParallelPresentation/>', () => {
    render(<ParallelPresentation />);
    const text = screen.getByText(/parallel/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class ParallelBlockType', () => {
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
