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
import {ConfigurationTable} from '../ConfigurationTable';
import Button from '@symphony/design-system/components/Button';

import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <CardChangeRequestSchedule/>', () => {
  const dataConfig = [
    {
      id: '1',
      name: 'OLT-1',
      location: 'New York',
      parameters: {id: '1', name: 'RTV'},
    },
  ];
  const dataColumn = [
    {
      key: 'resource',
      title: 'Resource',
      render: row => (
        <Button variant="text" tooltip={row?.name ?? ''}>
          {row?.name}
        </Button>
      ),
    },
    {
      key: 'location',
      title: 'Location',
      render: row => (
        <Button variant="text" tooltip={row?.location ?? ''}>
          {row?.location}
        </Button>
      ),
    },
    {
      key: 'parameterPos1Test',
      title: 'Parameter#1',
      render: row => row?.parameters.name,
    },
  ];

  it('CM-04-FE-12001 render values of data at table <ConfigurationTable/>', () => {
    render(
      <ConfigurationTable dataConfig={dataConfig} dataColumn={dataColumn} />,
    );
    const titleResource = screen.getByText(/OLT-1/i);
    expect(titleResource).toBeInTheDocument();
    const titleLocation = screen.getByText(/New York/i);
    expect(titleLocation).toBeInTheDocument();
    const titleParameter1 = screen.getByText(/RTV/i);
    expect(titleParameter1).toBeInTheDocument();
  }); 

  it('CM-04-FE-12001 render titles at table  <ConfigurationTable/>', () => {
    render(
      <ConfigurationTable dataConfig={dataConfig} dataColumn={dataColumn} />,
    );
    const titleResource = screen.getByText(/Resource/i);
    expect(titleResource).toBeInTheDocument();
    const titleLocation = screen.getByText(/Location/i);
    expect(titleLocation).toBeInTheDocument();
    const titleParameter1 = screen.getByText(/Parameter#1/i);
    expect(titleParameter1).toBeInTheDocument();
  }); 
});
