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

import TrueFalsePresentation from '../trueFalse/TrueFalsePresentation';
import TrueFalseBlockType from '../trueFalse/TrueFalseBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /TrueFalse/: ', () => {
  it('Render components <TrueFalsePresentation/>', () => {
    render(<TrueFalsePresentation />);
    const text = screen.getByText(/true/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class TrueFalseBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TrueFalseBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/trueFalseBlock/i);
    expect(text).toBeInTheDocument();
  });
});
