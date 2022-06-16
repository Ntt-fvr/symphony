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

import DecisionPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/end/EndPresentation';
import EndBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /End/: ', () => {
  it('AUT-FE-05011 Render component <EndPresentation/>', () => {
    render(<DecisionPresentation />);

    const text = screen.getByText(/end/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05012 Instance class EndBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new EndBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/endblock/i);
    expect(text).toBeInTheDocument();
  });
});
