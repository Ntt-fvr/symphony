/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import DialogModal from '../flows/view/dialogs/DialogModal';

describe('Test component <DialogModal/>', () => {
  const mockPropsAlert = {
    alertType: 'info',
    isOpen: true,
    handleOpenModal: () => {},
    handleClick: () => {},
    btnConfirmText: 'send',
    title: 'titleTest',
  };
  const mockPropsInput = {
    isOpen: true,
    handleOpenModal: () => {},
    handleClick: () => {},
    btnConfirmText: 'send',
    title: 'titleTest',
  };

  test('AUT-FE-05041 Render component <DialogModal/> alert', () => {
    render(<DialogModal {...mockPropsAlert} />);
    const title = screen.getByText(/title/i);
    expect(title).toBeInTheDocument();
  });

  test('AUT-FE-05042 Render component <DialogModal/> with children', () => {
    render(
      <DialogModal {...mockPropsInput}>
        <h1>i have children</h1>
      </DialogModal>,
    );
    const text = screen.getByText(/children/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05043 Test btnModal', () => {
    const TestComponent = () => {
      const [openModal, setOpenModal] = useState(true);
      const mockPropsAlert = {
        alertType: 'info',
        isOpen: openModal,
        handleOpenModal: () => {
          setOpenModal(!openModal);
        },
        handleClick: () => {},
        btnConfirmText: 'send',
        title: 'titleTest',
      };
      return (
        <div>
          <DialogModal {...mockPropsAlert} />;
        </div>
      );
    };
    render(<TestComponent />);
    const btnCancel = screen.getByText(/cancel/i);
    fireEvent.click(btnCancel);
    const titleEmpy = screen.queryByText(/title/i);
    expect(titleEmpy).toBeNull();
  });
});
