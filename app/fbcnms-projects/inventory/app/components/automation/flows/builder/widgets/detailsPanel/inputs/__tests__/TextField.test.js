import React, {useMemo} from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TextField from '../TextField';

describe('Test Component <TextField/>', () => {
  const props = {
    variant: null,
    label: 'textLabel',
    type: 'text',
    name: 'textLabel',
    value: '',
    handleInputChange: () => {},
  };

  it('Render <TextField/>', () => {
    render(<TextField {...props} />);
    const textLabel = screen.getAllByText('textLabel');
    expect(textLabel[0]).toBeInTheDocument();
  });
});
