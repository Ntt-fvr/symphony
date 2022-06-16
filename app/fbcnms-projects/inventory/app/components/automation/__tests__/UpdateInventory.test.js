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

import UpdateInventoryBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/updateInventory/UpdateInventoryBlockType';
import UpdateInventoryPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/updateInventory/UpdateInventoryPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe(' Suite Test Components /UpdateInventory/: ', () => {
  it('AUT-FE-05035 Render component <UpdateInventoryPresentation/>', () => {
    render(<UpdateInventoryPresentation />);
    const text = screen.getByText(/update inventory/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05036 Instance class UpdateInventoryBlockType', () => {
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
