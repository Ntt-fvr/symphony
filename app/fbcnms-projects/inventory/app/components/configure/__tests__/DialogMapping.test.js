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
// import userEvent from '@testing-library/user-event';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <DialogMapping/>', () => {
  it('CM-FE-03001 render <DialogMapping/>', () => {
    render(<DialogMapping />);
    const text = screen.getByText(/Parameter/i);
    // screen.debug(); //Estructura del DOM
    expect(text).toBeInTheDocument();
  });
  const mockProps = {
    title: 'Mapping',
    open: true,
    parameter: {
      mappingIn: 'sergio',
      mappingOut: 'test #1',
    },
  };
  it('CM-FE-03002 display props', () => {
    render(<DialogMapping {...mockProps} />);
    screen.getByText(/Mapping/i);
    // screen.debug();
  });
  it('CM-FE-03003 button', () => {
    const Padre = props => {
      return (
        <div>
          <DialogMapping {...props} />
        </div>
      );
    };
    render(<Padre {...mockProps} />);
    // screen.debug();
    const button = screen.getByText(/Cancel/i);
    fireEvent.click(button);
    const title = screen.queryByText(/Mapping/i);
    // expect(title).not.toBeInTheDocument();
  });
});
