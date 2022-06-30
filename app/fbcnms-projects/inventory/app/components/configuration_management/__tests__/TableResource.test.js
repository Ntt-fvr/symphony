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
import {TableResource} from '../common/TableResource';
import {render, screen} from '@testing-library/react';

describe('suite test component <TableResource/>', () => {
  const mockValuesTable = {
    items: [
      {
        resource: {name: 'Resource Test'},
        parameterType: {
          name: 'Parameter Test',
          parameters: [{stringValue: 'Current'}],
        },
        stringValue: 'New',
      },
    ],
  };

  it('CM-04-FE-12001 render titles into card <TableResource/>', () => {
    render(<TableResource />);
    const textTitleResource = screen.getByText(/Resource/i);
    expect(textTitleResource).toBeInTheDocument();
    const textTitleParameter = screen.getByText(/Parameter/i);
    expect(textTitleParameter).toBeInTheDocument();
    const textTitleCurrentValue = screen.queryByText(/Current value/i);
    expect(textTitleCurrentValue).toBeInTheDocument();
    const textTitleNewValue = screen.queryByText(/New value/i);
    expect(textTitleNewValue).toBeInTheDocument();
    const textInexistent = screen.queryByText(/Text inexixtent/i);
    expect(textInexistent).not.toBeInTheDocument();
  });

  it('CM-04-FE-12002 display info from props into fields of table', () => {
    render(<TableResource valuesTable={mockValuesTable} />);
    const resourceName = screen.getAllByText(/Resource Test/i);
    expect(resourceName).toBeInTheDOM;
    const parameterName = screen.getAllByText(/Parameter Test/i);
    expect(parameterName).toBeInTheDOM;
    const currentValue = screen.getAllByText(/Current/i);
    expect(currentValue).toBeInTheDOM;
    const newValue = screen.getAllByText(/New/i);
    expect(newValue).toBeInTheDOM;
  });
});
