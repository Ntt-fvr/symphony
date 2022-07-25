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

import TrueFalseBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/trueFalse/TrueFalseBlockType';
import TrueFalsePresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/trueFalse/TrueFalsePresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe(' Suite Test Components /TrueFalse/: ', () => {
  it('AUT-FE-05033 Render component <TrueFalsePresentation/>', () => {
    render(<TrueFalsePresentation />);
    const text = screen.getByText(/true/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05034 Instance class TrueFalseBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TrueFalseBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/trueFalseBlock/i);
    expect(text).toBeInTheDocument();
  });
});
