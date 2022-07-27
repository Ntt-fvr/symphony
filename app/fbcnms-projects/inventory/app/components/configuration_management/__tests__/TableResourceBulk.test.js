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
import {TableResource} from '../common/TableResourceBulk';
import {render, screen} from '@testing-library/react';

describe('suite test component <TableResource/>', () => {
  const mockValuesTable = [
    {
      resources: "Resource_test",
      parameter: "Parameter_test",
      newValue: 'Value_test',
    }
  ];

  it('CM-07-FE-09001 render titles into card <TableResourceBulk/>', () => {
    render(<TableResource />);
    const textTitleResource = screen.getByText(/Resource/i);
    expect(textTitleResource).toBeInTheDocument();
    const textTitleParameter = screen.getByText(/Parameter/i);
    expect(textTitleParameter).toBeInTheDocument();
    const textTitleCurrentValue = screen.queryByText(/New value/i);
    expect(textTitleCurrentValue).toBeInTheDocument();
  });

  it('CM-07-FE-09002 display info from props into fields of table', () => {
    render(<TableResource valuesTable={mockValuesTable} />);
    const resourceName = screen.getAllByText(/Resource_test/i);
    expect(resourceName).toBeInTheDOM;
    const parameterName = screen.getAllByText(/Parameter_test/i);
    expect(parameterName).toBeInTheDOM;
    const newValue = screen.getAllByText(/Value_test/i);
    expect(newValue).toBeInTheDOM;
  });
});
