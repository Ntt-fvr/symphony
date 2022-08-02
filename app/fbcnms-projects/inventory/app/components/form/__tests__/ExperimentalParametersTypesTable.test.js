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
import ExperimentalParametersTypesTable from '../ExperimentalParametersTypesTable';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

describe('suite test component <ExperimentalParametersTypesTable/>', () => {
  it('CM-FE-12001 render titles into table <ExperimentalParametersTypesTable/>', () => {
    render(<ExperimentalParametersTypesTable />);
    const textName = screen.getByText(/Name/i);
    expect(textName).toBeInTheDocument();
    const textPN = screen.getByText(/Parameter Type/i);
    expect(textPN).toBeInTheDocument();
    const textDV = screen.getByText(/Default Value/i);
    expect(textDV).toBeInTheDocument();
    const textTags = screen.getByText(/Tags/i);
    expect(textTags).toBeInTheDocument();
    const textMapping = screen.getByText(/Mapping/i);
    expect(textMapping).toBeInTheDocument();
    const textPriority = screen.getByText(/Priority/i);
    expect(textPriority).toBeInTheDocument();
    const textDelete = screen.getByText(/Delete/i);
    expect(textDelete).toBeInTheDocument();
  });

  const idMock = {id: 123};
  it('CM-FE-12002 event onClick button add parameter type', () => {
    const handleClick = jest.fn();
    render(
      <ExperimentalParametersTypesTable {...idMock} onClick={handleClick} />,
    );
    fireEvent.click(screen.getByText(/Add Property/i));
    expect(handleClick);
  });

  it('CM-FE-12003 event onClick button delete', () => {
    const handleClick = jest.fn();
    render(<ExperimentalParametersTypesTable onClick={handleClick} />);
    screen.getByText(/delete/i);
    fireEvent.click(screen.getByText(/delete/i));
    expect(handleClick);
  });

  it('CM-FE 12004 event onClick into field Mapping', () => {
    const handleClick = jest.fn();
    render(<ExperimentalParametersTypesTable onClick={handleClick} />);
    screen.getByText(/Mapping/i);
    fireEvent.click(screen.getByText(/Mapping/i));
    expect(handleClick);
  });

  it('CM-FE 12005 event onClick into field Priority', () => {
    const handleClick = jest.fn();
    render(<ExperimentalParametersTypesTable onClick={handleClick} />);
    screen.getByText(/Priority/i);
    fireEvent.click(screen.getByText(/Priority/i));
    expect(handleClick);
  });
});
