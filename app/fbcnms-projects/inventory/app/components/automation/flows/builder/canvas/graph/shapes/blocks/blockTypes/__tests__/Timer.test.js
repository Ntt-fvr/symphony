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

import TriggerStartIconPresentation from '../timer/TimerPresentation';
import TimerBlockType from '../timer/TimerBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /Timer/: ', () => {
  it('Render components <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/timer/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class TimerBlockType', () => {
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
