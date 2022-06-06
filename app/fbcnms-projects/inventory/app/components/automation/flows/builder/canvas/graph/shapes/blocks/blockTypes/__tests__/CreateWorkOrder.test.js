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

import CreateWorkorderPresentation from '../createWorkorder/CreateWorkorderPresentation';
import CreateWorkorderBlockType from '../createWorkorder/CreateWorkorderBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /CreacteWorkOrder/: ', () => {
  it('Render components <CreateWorkorderPresentation/>', () => {
    render(<CreateWorkorderPresentation />);
    const text = screen.getByText(/work order/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class CreateWorkorderBlockType', () => {
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
