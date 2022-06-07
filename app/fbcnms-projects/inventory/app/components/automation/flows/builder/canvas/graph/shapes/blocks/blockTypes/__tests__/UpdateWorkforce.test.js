/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import UpdateWorkforcePresentation from '../updateWorkforce/UpdateWorkforcePresentation';
import UpdateWorkforceBlockType from '../updateWorkforce/UpdateWorkforceBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /updateWorkforce/: ', () => {
  it('Render components <UpdateWorkforcePresentation/>', () => {
    render(<UpdateWorkforcePresentation />);
    const text = screen.getByText(/update workforce/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class UpdateWorkforceBlockType', () => {
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
