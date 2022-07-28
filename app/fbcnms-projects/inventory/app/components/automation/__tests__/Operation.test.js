/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

 import '@testing-library/jest-dom/extend-expect';
 import ButtonFlowStatus from '../common/ButtonFlowStatus';
 import Operation from '../Operation';
 import React from 'react';
 import {fireEvent, render, screen} from '@testing-library/react';
 
 it('CM FE-1 coloumn name checking', () => {
   render(<Operation />);
 
   const columnIDInstance = screen.getByText('ID Instance');
   expect(columnIDInstance);
 
   const columnStatus = screen.getByText('Status');
   expect(columnStatus);
 
   const columnFlowTemplate = screen.getByText('Flow Template');
   expect(columnFlowTemplate);
 
   const columnCreatedDate = screen.getByText('Created Date');
   expect(columnCreatedDate);
 
   const columnAuthor = screen.getByText('Author');
   expect(columnAuthor);
 
   const columnError = screen.getByText('Error');
   expect(columnError);
 
   const columnActions = screen.getByText('Actions');
   expect(columnActions);
 });
 
 it('CM FE-2 button test', () => {
   render(<Operation />);
   const button = screen.getByLabelText('386547056646');
   expect(button).toBeInTheDocument();
   fireEvent.click(button);
   expect(screen.getAllByText(/Cancel/i)[0]).toBeInTheDocument();
 });
 
 it('CM FE-3 handle cancel button test for popup', () => {
   const handleClick = jest.fn();
   render(<Operation onClick={handleClick} />);
   fireEvent.click(screen.getAllByText(/Cancel/i)[0]);
   expect(handleClick);
 });
 
 it('CM FE-4 checking status color for Running', () => {
   render(
     <ButtonFlowStatus className="RUNNING" skin="RUNNING">
       RUNNING
     </ButtonFlowStatus>,
   );
   expect(screen.getByText('RUNNING')).toHaveStyle('color:rgb(48,56,70)');
 });
 
 it('CM FE-5 checking status color for Failing', () => {
   render(
     <ButtonFlowStatus className="FAILING" skin="FAILING">
       FAILING
     </ButtonFlowStatus>,
   );
   expect(screen.getByText('FAILING')).toHaveStyle('color:rgb(48,56,70)');
 });
 
 it('CM FE-6 checking status color for Pausing', () => {
   render(
     <ButtonFlowStatus className="PAUSING" skin="PAUSING">
       PAUSING
     </ButtonFlowStatus>,
   );
   expect(screen.getByText('PAUSING')).toHaveStyle('color:rgb(48,56,70)');
 });
 