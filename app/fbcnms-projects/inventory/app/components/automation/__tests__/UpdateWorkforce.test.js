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
import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';

import UpdateWorkforceBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/updateWorkforce/UpdateWorkforceBlockType';
import UpdateWorkforcePresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/updateWorkforce/UpdateWorkforcePresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /updateWorkforce/: ', () => {
  it('AUT-FE-05037 Render component <UpdateWorkforcePresentation/>', () => {
    render(<UpdateWorkforcePresentation />);
    const text = screen.getByText(/update workforce/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05038 Instance class UpdateWorkforceBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new UpdateWorkforceBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.update_workforce/i);
    expect(text).toBeInTheDocument();
  });
});
