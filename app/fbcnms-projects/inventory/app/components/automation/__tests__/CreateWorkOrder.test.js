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

import CreateWorkorderBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import CreateWorkorderPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /CreateWorkOrder/: ', () => {
  it('AUT-FE-05007 Render component <CreateWorkorderPresentation/>', () => {
    render(<CreateWorkorderPresentation />);
    const text = screen.getByText(/work order/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05008 Instance class CreateWorkorderBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new CreateWorkorderBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.work_order/i);
    expect(text).toBeInTheDocument();
  });
});
