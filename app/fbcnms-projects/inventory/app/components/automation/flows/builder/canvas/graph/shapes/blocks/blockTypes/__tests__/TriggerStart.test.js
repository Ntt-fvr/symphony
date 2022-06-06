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

import TriggerStartIconPresentation from '../triggerStart/TriggerStartPresentation';
import TriggerStartBlockType from '../triggerStart/TriggerStartBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /TriggerStart/: ', () => {
  it('Render components <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/triggered/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class TriggerStartBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TriggerStartBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/triggerBlock.trigger_start/i);
    expect(text).toBeInTheDocument();
  });
});
