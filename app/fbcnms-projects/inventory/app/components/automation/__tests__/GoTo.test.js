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

import GoToBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/goTo/GoToBlockType';
import GoToPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/goTo/GoToPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /GoTo/: ', () => {
  it('AUT-FE-05019 Render component <GoToPresentation/>', () => {
    render(<GoToPresentation />);
    const text = screen.getByText(/go to/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05020 Instance class GoToBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new GoToBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/goToBlock/i);
    expect(text).toBeInTheDocument();
  });
});
