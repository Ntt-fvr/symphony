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
import ButtonAlarmStatus from '../common/ButtonAlarmStatus';
import React from 'react';
import {render, screen} from '@testing-library/react';

describe('suite test component <ButtonAlarmStatus/>', () => {
  const mockSkin = 'SUBMITTED';

  it('CM-04-FE-12001 render component and reception props <ButtonAlarmStatus/>', () => {
    const stringCapitalizeFisrt = string => {
      const convertString = string.toLowerCase();

      return convertString.charAt(0).toUpperCase() + convertString.slice(1);
    };
    render(
      <ButtonAlarmStatus skin={mockSkin}>
        Status: {stringCapitalizeFisrt(mockSkin)}
      </ButtonAlarmStatus>,
    );
    const textTitle = screen.getByText(/Submitted/i);
    expect(textTitle).toBeInTheDOM;
  });
});
