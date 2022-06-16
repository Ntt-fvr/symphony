/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import '@testing-library/jest-dom';
import React from 'react';
import {render, screen} from '@testing-library/react';

import Tooltip from '../flows/builder/widgets/detailsPanel/inputs/Tooltip';

describe('Suit Test Component <Tooltip/>', () => {
  const props = {
    tooltip: 'testTooltip',
    children: `children`,
  };

  it('AUT-FE-05006 Render <Tooltip/>', () => {
    render(<Tooltip {...props} />);
    const textTooltip = screen.getByText(/children/i);
    expect(textTooltip).toBeInTheDocument();
  });
});
