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

import ForEachLoopPresentation from '../forEachLoop/ForEachLoopPresentation';
import ForEachLoopBlockType from '../forEachLoop/ForEachLoopBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /ForEachLoop/: ', () => {
  it('Render components <ForEachLoopPresentation/>', () => {
    render(<ForEachLoopPresentation />);

    const text = screen.getByText(/for each/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class ForEachLoopBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ForEachLoopBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/forEachLoopBlock/i);
    expect(text).toBeInTheDocument();
  });
});
