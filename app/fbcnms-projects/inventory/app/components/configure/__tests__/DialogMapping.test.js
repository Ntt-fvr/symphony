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
import DialogMapping from '../DialogMapping';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <DialogMapping/>', () => {
  const mockProps = {
    title: 'Title of Modal',
    open: true,
    parameter: {
      name: 'name of Configuration Parameter',
      mappingIn: 'Regular phrase In',
      mappingOut: 'Regular phrase Out',
    },
  };

  it('CM-FE-12001 render <DialogMapping/>', () => {
    render(<DialogMapping />);
    const text = screen.getByText(/Parameter/i);
    expect(text).toBeInTheDocument();
  });

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

  it('CM-FE 12001 event onChange into field name', async () => {
    const component = render(<DialogMapping />);
    const inputName = component.getByPlaceholderText(/Text-uno/i);
    fireEvent.change(inputName, {target: {value: 'xxx'}});
    await expect(inputName.itemValue).toBe('xxx');
  });
});
