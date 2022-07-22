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

import TextField from '../flows/builder/widgets/detailsPanel/inputs/TextField';

describe('Suite Test Component <TextField/>', () => {
  const props = {
    variant: null,
    label: 'textLabel',
    type: 'text',
    name: 'textLabel',
    value: '',
    handleInputChange: () => {},
  };

  it('AUT-FE-05005 Render <TextField/>', () => {
    render(<TextField {...props} />);
    const textLabel = screen.getAllByText('textLabel');
    expect(textLabel[0]).toBeInTheDocument();
  });
});
