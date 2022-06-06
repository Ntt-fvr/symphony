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

import ManualStartPresentation from '../manualStart/ManualStartPresentation';
import ManualStartBlockType from '../manualStart/ManualStartBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /ManualStart/: ', () => {
  it('Render components <ManualStartPresentation/>', () => {
    render(<ManualStartPresentation />);
    const text = screen.getByText(/start/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class ManualStartBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ManualStartBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/startBlock/i);
    expect(text).toBeInTheDocument();
  });
});
