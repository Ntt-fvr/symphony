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

import TimerBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/timer/TimerBlockType';
import TriggerStartIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/timer/TimerPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Timer/: ', () => {
  it('AUT-FE-05027 Render component <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/timer/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05028 Instance class TimerBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TimerBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/triggerBlock.timer/i);
    expect(text).toBeInTheDocument();
  });
});
