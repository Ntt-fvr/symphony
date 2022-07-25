/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import {render, screen} from '@testing-library/react';

import Rule from '../flows/builder/widgets/detailsPanel/inputs/Rule';

describe('Suite Test Component <Rule/>', () => {
  const props = {
    rule: {
      id: 'string',
      name: 'Una Rule',
      index: 1,
      rule: 'dos00000000',
      isDeleted: false,
      isDefault: false,
    },
    label: 'testLabel',
  };

  it('AUT-FE-05070 Render <Rule/>', () => {
    render(<Rule {...props} />);
    const text = screen.getByText(/rule/i);
    expect(text).toBeInTheDocument();
  });
});
