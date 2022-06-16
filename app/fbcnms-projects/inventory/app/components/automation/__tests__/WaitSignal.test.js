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

import TriggerStartIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalPresentation';
import WaitSignalBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalBlockType';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /waitSignal/: ', () => {
  it('AUT-FE-05039 Render component <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/wait for signal/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05040 Instance class WaitSignalBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new WaitSignalBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/triggerBlock.wait-signal/i);
    expect(text).toBeInTheDocument();
  });
});
