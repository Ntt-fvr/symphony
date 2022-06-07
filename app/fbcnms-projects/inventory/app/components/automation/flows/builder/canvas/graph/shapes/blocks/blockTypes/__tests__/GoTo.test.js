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

import GoToPresentation from '../goTo/GoToPresentation';
import GoToBlockType from '../goTo/GoToBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /GoTo/: ', () => {
  it('Render components <GoToPresentation/>', () => {
    render(<GoToPresentation />);
    const text = screen.getByText(/go to/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class GoToBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new GoToBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/goToBlock/i);
    expect(text).toBeInTheDocument();
  });
});
