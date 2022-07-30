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
import {ConfigurationsView} from '../ConfigurationsView';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <CardChangeRequestSchedule/>', () => {
  const mockProps = {
    time: '2022-09-11T06:36:00Z',
    type: 'SCHEDULED_CHANGE',
    weekDay: 'MONDAY',
  };

  it('CM-04-FE-12001 render title at page principal <ConfigurationsView/>', () => {
    render(<ConfigurationsView />);
    const title = screen.getByText(/Configurations/i);
    expect(title).toBeInTheDocument();
  });
});
