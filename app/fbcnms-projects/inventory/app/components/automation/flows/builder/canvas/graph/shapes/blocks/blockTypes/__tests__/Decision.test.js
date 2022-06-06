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

import DecisionPresentation from '../decision/DecisionPresentation';
import DecisionBlockType from '../decision/DecisionBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /Decision/ : ', () => {
  it('Render components <DecisionPresentation/>', () => {
    render(<DecisionPresentation />);
    const text = screen.getByText(/choice/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class DecisionBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new DecisionBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/decisionBlock/i);
    expect(text).toBeInTheDocument();
  });
});
