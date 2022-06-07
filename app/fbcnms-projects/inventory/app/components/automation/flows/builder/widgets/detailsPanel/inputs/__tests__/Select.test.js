import React, {useMemo} from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import InputSelect from '../Select';

describe('Test Component <Select/>', () => {
  const props = {
    value: null,
    name: 'textName',
    label: 'textLabel',
    onChane: () => {},
    items: [
      {
        id: 1,
        name: 'NameTest1',
      },
      {
        id: 2,
        name: 'NameTest2',
      },
    ],
  };

  it('Render <InputSelect/>', () => {
    render(<InputSelect {...props} />);
    const propsName = screen.getAllByText('textLabel');
    expect(propsName[0]).toBeInTheDocument();
  });
});
