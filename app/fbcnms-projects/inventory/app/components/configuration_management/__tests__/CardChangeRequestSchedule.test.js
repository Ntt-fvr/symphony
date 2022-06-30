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

  it('CM-FE-12001 render titles into card <CardChangeRequestSchedule/>', () => {
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

  it('CM-FE-12002 event onClick radio button As soon as approved', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/As soon as approved/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approved/i));
    expect(handleClick);
  });

  it('CM-FE-12003 event onClick radio button Schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/Schedule with approval/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approval/i));
    expect(handleClick);
  });

  it('CM-FE-12003 event onClick radio button Schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/Schedule with approval/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approval/i));
    expect(handleClick);
  });

  it('CM-FE-12003 render on card mode schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule schedule={mockProps} />);
    fireEvent.click(screen.getByLabelText(/Schedule with approval/i));
    expect(handleClick);
  });

  /*
  it('CM-FE-12002 display props', () => {
    render(<DialogMapping {...mockProps} />);
    screen.getByText(/Title of Modal/i);
  });

  it('CM-FE-12003 display info from props into inputs and name CP', () => {
    const Padre = props => {
      return (
        <div>
          <DialogMapping {...props} />
        </div>
      );
    };
    render(<Padre {...mockProps} />);
    const mappingIn = screen.getByDisplayValue(/Regular phrase In/i);
    expect(mappingIn).toBeInTheDocument();
    const mappingOut = screen.getByDisplayValue(/Regular phrase Out/i);
    expect(mappingOut).toBeInTheDocument();
    const TitleModal = screen.getByText(/name of Configuration Parameter/i);
    expect(TitleModal).toBeInTheDocument();
  });

  it('CM-FE-12004 event onClick button Cancel', () => {
    const handleClick = jest.fn();
    render(<DialogMapping {...mockProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleClick);
  });

  it('CM-FE-12005 event onClick button Save', () => {
    const handleClick = jest.fn();
    render(<DialogMapping {...mockProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText(/Save/i));
    expect(handleClick);
  });
*/
});
