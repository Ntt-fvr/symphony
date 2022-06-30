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

  it('CM-03-FE-12001 render titles into card <TableResource/>', () => {
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

  it('CM-FE-12003 display info from props into fields of table', () => {
    render(<TableResource valuesTable={mockValuesTable} />);
    const resourceName = screen.getAllByText(/Resource Test/i);
    expect(resourceName).toBeInTheDOM;
    const parameterName = screen.getAllByText(/Parameter Test/i);
    expect(parameterName).toBeInTheDOM;
    const currentValue = screen.getAllByText(/Current/i);
    expect(currentValue).toBeInTheDOM;
    const newValue = screen.getAllByText(/New/i);
    expect(newValue).toBeInTheDOM;

    screen.debug(resourceName);
  });

  /*
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
    screen.debug();
  });

  it('CM-FE-12003 event onClick radio button Schedule with approval', () => {
    const handleClick = jest.fn();
    render(<CardChangeRequestSchedule {...mockProps} onClick={handleClick} />);
    const textRadioButonOne = screen.getByLabelText(/Schedule with approval/i);
    expect(textRadioButonOne).toBeInTheDocument();
    fireEvent.click(screen.getByDisplayValue(/approval/i));
    expect(handleClick);
    screen.debug(screen.getByDisplayValue(/approval/i));
  });
  */

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
