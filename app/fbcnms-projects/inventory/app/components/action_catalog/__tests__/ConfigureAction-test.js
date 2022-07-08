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
import DialogSelectName from '../DialogSelectName';
import React from 'react';
import TableConfigureAction from '../TableConfigureAction';
import TableConfigurtionParameter from '../TableConfigurtionParameter';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component TableConfigureAction', () => {
  it('CM FE-1 render <TableConfigureAction/>', () => {
    render(<TableConfigureAction />);
    const text = screen.getByText(/Name/i);
    expect(text).toBeInTheDocument();
    const text1 = screen.getByText(/Action Type/i);
    expect(text1).toBeInTheDocument();
    const text2 = screen.getByText(/Edit/i);
    expect(text2).toBeInTheDocument();
    const text3 = screen.getByText(/Delete/i);
    expect(text3).toBeInTheDocument();
  });

  it('CM FE-2 handle add action', () => {
    const handleClick = jest.fn();
    render(<TableConfigureAction onClick={handleClick} />);
    const addAction = screen.getByText(/Add Action/i);
    fireEvent.click(addAction);
    expect(handleClick);
  });

  it('CM FE-3 handle add action', () => {
    const mockProps = {
      actionTypes: [
        {
          name: 'Action-1',
          type: 'CONFIGURATION_PARAMETER',
        },
      ],
    };
    const handleClick = jest.fn();
    render(<TableConfigureAction {...mockProps} onClick={handleClick} />);
    expect(screen.getByDisplayValue('Action-1')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('CONFIGURATION_PARAMETER'),
    ).toBeInTheDocument();
    const editAction = screen.getByLabelText('Edit', {selector: 'Button'});
    fireEvent.click(editAction);
    expect(handleClick);
  });

  it('CM FE-4 check next is disabled ', () => {
    render(<DialogSelectName isDialogSelectDate="true" />);
    expect(screen.getByText(/Next/i).closest('Button')).toBeDisabled();
  });

  it('CM FE-5 check save is disabled ', () => {
    render(<DialogSelectName />);
    expect(screen.getByText(/Save/i).closest('Button')).toBeDisabled();
  });

  it('CM FE-6 Check if params are loaded', () => {
    const handleClick = jest.fn();
    const mockProps = {
      actionItems: [
        {
          parameters: {id: 0, name: 'test param 1'},
          value: {stringValue: 'value 1'},
          isDeleted: false,
        },
      ],
      testParam: [{id: 0, name: 'test param 1'}],
    };
    render(<TableConfigurtionParameter {...mockProps} onClick={handleClick} />);
    expect(screen.getByDisplayValue(/0/i)).toBeInTheDocument();
  });
});
