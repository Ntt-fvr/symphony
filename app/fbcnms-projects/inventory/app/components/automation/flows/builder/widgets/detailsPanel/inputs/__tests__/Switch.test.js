import React, {useMemo} from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Switch from '../Switch';

describe('Test Component <Switch/>', () => {
  const props = {
    value: true,
    name: 'textName',
    label: 'textLabel',
    onChane: () => {},
  };

  it('Render <Switch/>', () => {
    render(<Switch {...props} />);
    const textLabel = screen.getByText('textLabel');
    expect(textLabel).toBeInTheDocument();
  });
});
