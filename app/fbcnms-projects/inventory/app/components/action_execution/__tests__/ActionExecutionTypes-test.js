/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

 import 'jest-dom/extend-expect';
 import ExecutionsTypes from '../ExecutionsTypes';
 import { TableDetails } from '../common/TableDetails';
 import { TableLogs } from '../common/TableLogs';
 import { TableAffectedResources } from '../common/TableAffectedResources';
 import React from 'react';
 import {render, screen} from '@testing-library/react';
 
 describe('test suite component for ExecutionsTypes', () => {
   it('CM-1 action execution types table details render ', () => {

    const mockProps = {
      resourceData: [],
    };
    render(<TableDetails {...mockProps} />);

    const columnActionType = screen.getByText('Action Type');
    expect(columnActionType);

    const columnResourceType = screen.getByText('Resource Type');
    expect(columnResourceType);

    const columnResourceSpecification = screen.getByText('Resource Specification');
    expect(columnResourceSpecification);

    const columnExecutionType = screen.getByText('Execution Type');
    expect(columnExecutionType);

  });

  it('CM-2 action execution types table details logs render ', () => {

    render(<TableLogs />);

    const columnLogs = screen.getByText('Logs');
    expect(columnLogs);

    const columnDataTime = screen.getByText('Data Time');
    expect(columnDataTime);

  });
  
  it('CM-3 action execution types table details affected resources render ', () => {

    const mockProps = {
      resourceData: [],
    };
    render(<TableAffectedResources {...mockProps} />);

    const columnResource = screen.getByText('Resource');
    expect(columnResource);

    const columnExecutionResult = screen.getByText('Execution Result');
    expect(columnExecutionResult);

    const columnViewDetails = screen.getByText('View Details');
    expect(columnViewDetails);
    
  });

  it('CM action execution types render ', () => {
    render(<ExecutionsTypes />);

    const columnID = screen.getByText('ID');
    expect(columnID);

    const columnActionTemplate = screen.getByText('Action Template');
    expect(columnActionTemplate);

    const columnResourceSpecification = screen.getByText('Resource Specification');
    expect(columnResourceSpecification);

    const columnExecutionTime = screen.getByText('Execution Time');
    expect(columnExecutionTime);

  });
  
 });

  