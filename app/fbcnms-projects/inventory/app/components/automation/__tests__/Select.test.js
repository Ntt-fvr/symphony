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

import InputSelect from '../flows/builder/widgets/detailsPanel/inputs/Select';

describe('Suite Test Component <Select/>', () => {
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

  it('AUT-FE-05001 Render <InputSelect/>', () => {
    render(<InputSelect {...props} />);
    const propsName = screen.getAllByText('textLabel');
    expect(propsName[0]).toBeInTheDocument();
  });
});
