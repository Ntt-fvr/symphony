import React, {useMemo} from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';

import Sidebar from '../Sidebar';

describe('Test Component <Sidebar/>', () => {
  const props = {
    drawerWidth: '',
    smallWidth: '',
    top: '',
    title: 'textTitle',
    openDefault: true,
    children: 'children',
    collapsed: boolen => {},
  };

  it('Render <Sidebar/>', () => {
    render(<Sidebar {...props} />);
    const textChildren = screen.getByText('children');
    expect(textChildren).toBeInTheDocument();
  });

  it('onClick Button <Sidebar/>', () => {
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
