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
import {CardChangeRequestSchedule} from '../common/CardChangeRequestSchedule';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <CardChangeRequestSchedule/>', () => {
  const mockProps = {
    time: '2022-09-11T06:36:00Z',
    type: 'SCHEDULED_CHANGE',
    weekDay: 'MONDAY',
  };

  it('CM-04-FE-12001 render titles into card <CardChangeRequestSchedule/>', () => {
    render(<CardChangeRequestSchedule />);
    const textRadioButonOne = screen.getByText(/As soon as approved/i);
    expect(textRadioButonOne).toBeInTheDocument();
    const textRadioButtonSecond = screen.getByText(/Schedule with approval/i);
    expect(textRadioButtonSecond).toBeInTheDocument();
    const textSubtitleOnCard = screen.queryByText(
      /Choose date and time for change execution after approval/i,
    );
    expect(textSubtitleOnCard).not.toBeInTheDocument();
  });

  it('CM-04-FE-12002 event onClick radio button As soon as approved', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/As soon as approved/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approved/i));
    expect(handleClick);
  });

  it('CM-04-FE-12003 event onClick radio button Schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/Schedule with approval/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approval/i));
    expect(handleClick);
  });

  it('CM-04-FE-12004 render data from props on card mode schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule schedule={mockProps} />);
    fireEvent.click(screen.getByLabelText(/Schedule with approval/i));
    expect(handleClick);
  });
});
