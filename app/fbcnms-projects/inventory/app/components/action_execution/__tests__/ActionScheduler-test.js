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
import StepperAction from '../StepperAction';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component ScheduledActionTypes', () => {
  it('CM-ASDLR FE-1 render create action component ', () => {
    render(<StepperAction />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('CM-ASDLR FE-2 check if next is disabled', () => {
    render(<StepperAction />);
    expect(screen.getByText(/Next/i).closest('Button')).toBeDisabled();
  });

  it('CM-ASDLR FE-2 check if name is not duplicate is disabled', () => {
    const mockProps = {
      names: ['action-1'],
    };
    const {getByPlaceholderText} = render(<StepperAction {...mockProps} />);
    const Button = getByPlaceholderText('actionName');
    fireEvent.change(Button, {
      target: {value: 'action-1'},
    });
    expect(
      screen.getByText('Action name existing', {exact: false}),
    ).toBeInTheDocument();
  });
});
