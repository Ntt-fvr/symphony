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

import DecisionBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/decision/DecisionBlockType';
import DecisionPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/decision/DecisionPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Decision/ : ', () => {
  it('AUT-FE-05009 Render component <DecisionPresentation/>', () => {
    render(<DecisionPresentation />);
    const text = screen.getByText(/choice/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05010 Instance class DecisionBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new DecisionBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/decisionBlock/i);
    expect(text).toBeInTheDocument();
  });
});
