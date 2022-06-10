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

import UpdateInventoryPresentation from '../updateInventory/UpdateInventoryPresentation';
import UpdateInventoryBlockType from '../updateInventory/UpdateInventoryBlockType';
import {useGraph} from '../../../../graphAPIContext/GraphContext';

describe(' Test Components /UpdateInventory/: ', () => {
  it('Render components <UpdateInventoryPresentation/>', () => {
    render(<UpdateInventoryPresentation />);
    const text = screen.getByText(/update inventory/i);
    expect(text).toBeInTheDocument();
  });

  it('Instance class UpdateInventoryBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new UpdateInventoryBlockType(flow)], [
        flow,
      ]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.update_inventory/i);
    expect(text).toBeInTheDocument();
  });
});
