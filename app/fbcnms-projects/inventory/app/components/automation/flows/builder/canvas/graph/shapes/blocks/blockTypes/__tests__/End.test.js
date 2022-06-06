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

import DecisionPresentation from '../end/EndPresentation';
import EndBlockType from '../end/EndBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /End/: ', () => {
  it('Render components <EndPresentation/>', () => {
    render(<DecisionPresentation />);

    const text = screen.getByText(/end/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class EndBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new EndBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/endblock/i);
    expect(text).toBeInTheDocument();
  });
});
