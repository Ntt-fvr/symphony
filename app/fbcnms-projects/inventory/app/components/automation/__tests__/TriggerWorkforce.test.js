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

import TriggerWorkforceBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/triggerWorkforce/TriggerWorkforceBlockType';
import TriggerWorkforceIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/triggerWorkforce/TriggerWorkforcePresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /TriggerWorkForce/: ', () => {
  it('AUT-FE-05031 Render component <TriggerWorkforceIconPresentation/>', () => {
    render(<TriggerWorkforceIconPresentation />);
    const text = screen.getByText(/work order/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05032 Instance class TriggerWorkforceBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TriggerWorkforceBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/triggerBlock.work_order/i);
    expect(text).toBeInTheDocument();
  });
});
