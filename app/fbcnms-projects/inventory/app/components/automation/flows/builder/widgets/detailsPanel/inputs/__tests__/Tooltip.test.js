import React, {useMemo} from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Tooltip from '../Tooltip';

describe('Test Component <Tooltip/>', () => {
  const props = {
    tooltip: 'testTooltip',
    children: `children`,
  };

  it('Render <Tooltip/>', () => {
    render(<Tooltip {...props} />);
    const textTooltip = screen.getByText(/children/i);
    expect(textTooltip).toBeInTheDocument();
  });
});
