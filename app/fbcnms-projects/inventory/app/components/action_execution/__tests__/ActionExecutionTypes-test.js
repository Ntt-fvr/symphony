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
 import React from 'react';
 import {render, screen} from '@testing-library/react';
 
 describe('test suite component for ExecutionsTypes', () => {
   it('CM action execution types render ', () => {
     render(<ExecutionsTypes />);
 
     const columnID = screen.getByText('ID');
     expect(columnID);
 
     const columnActionTemplate = screen.getByText('Action Template');
     expect(columnActionTemplate);
 
     const columnResourceSpecification = screen.getByText(
       'Resource Specification',
     );
     expect(columnResourceSpecification);
 
     const columnExecutionTime = screen.getByText('Execution Time');
     expect(columnExecutionTime);

   });

 });