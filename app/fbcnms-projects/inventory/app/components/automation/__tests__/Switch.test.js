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

import Switch from '../flows/builder/widgets/detailsPanel/inputs/Switch';

describe('Suite Test Component <Switch/>', () => {
  const props = {
    value: true,
    name: 'textName',
    label: 'textLabel',
    handleInputChange: () => {},
  };

  it('AUT-FE-05004 Render <Switch/>', () => {
    render(<Switch {...props} />);
    const textLabel = screen.getByText('textLabel');
    expect(textLabel).toBeInTheDocument();
  });
});
