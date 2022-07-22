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
import {fireEvent, render, screen} from '@testing-library/react';

import Sidebar from '../flows/builder/widgets/detailsPanel/inputs/Sidebar';

describe('Suite Test Component <Sidebar/>', () => {
  const props = {
    drawerWidth: '',
    smallWidth: '',
    top: '',
    title: 'textTitle',
    openDefault: true,
    children: 'children',
    collapsed: () => {},
  };

  it('AUT-FE-05002 Render <Sidebar/>', () => {
    render(<Sidebar {...props} />);
    const textChildren = screen.getByText('children');
    expect(textChildren).toBeInTheDocument();
  });

  it('AUT-FE-05003 onClick Button <Sidebar/>', () => {
    let textTitle;

    render(<Sidebar {...props} />);

    fireEvent.click(screen.getByRole('button'));
    textTitle = screen.getByText('textTitle');
    expect(textTitle).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    textTitle = screen.queryByText('textTitle');
    expect(textTitle).toBeNull();
  });
});
