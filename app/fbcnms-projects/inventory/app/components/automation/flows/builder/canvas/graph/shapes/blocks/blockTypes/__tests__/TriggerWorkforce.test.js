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

import TriggerWorkforceIconPresentation from '../triggerWorkforce/TriggerWorkforcePresentation';
import TriggerWorkforceBlockType from '../triggerWorkforce/TriggerWorkforceBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /TriggerWorkForce/: ', () => {
  it('Render components <TriggerWorkforceIconPresentation/>', () => {
    render(<TriggerWorkforceIconPresentation />);
    const text = screen.getByText(/work order/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class TriggerWorkforceBlockType', () => {
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
