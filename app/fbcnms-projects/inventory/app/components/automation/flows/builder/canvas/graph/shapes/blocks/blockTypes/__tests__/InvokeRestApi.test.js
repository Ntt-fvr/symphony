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

import InvokeRestApiPresentation from '../invokeRestApi/InvokeRestApiPresentation';
import InvokeRestApiBlockType from '../invokeRestApi/InvokeRestApiBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /InvokeRestApi/: ', () => {
  it('Render components <InvokeRestApiPresentation/>', () => {
    render(<InvokeRestApiPresentation />);
    const text = screen.getByText(/invoke/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class InvokeRestApiBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new InvokeRestApiBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.invoke/i);
    expect(text).toBeInTheDocument();
  });
});
