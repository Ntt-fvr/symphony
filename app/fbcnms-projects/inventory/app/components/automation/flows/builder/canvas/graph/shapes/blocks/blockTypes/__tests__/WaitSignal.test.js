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

import TriggerStartIconPresentation from '../waitSignal/WaitSignalPresentation';
import WaitSignalBlockType from '../waitSignal/WaitSignalBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /waitSignal/: ', () => {
  it('Render components <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/wait for signal/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class WaitSignalBlockType', () => {
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
