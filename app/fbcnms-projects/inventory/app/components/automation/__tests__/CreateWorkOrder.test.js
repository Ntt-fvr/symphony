/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {CreateWorkorderSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderSettings';

import '@testing-library/jest-dom';
import CreateWorkorderBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import CreateWorkorderPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderPresentation';
import React, {useMemo} from 'react';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/CreateWorkorder';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /CreateWorkOrder/: ', () => {
  it('AUT-FE-05007 Render component <CreateWorkorderPresentation/>', () => {
    render(<CreateWorkorderPresentation />);
    const text = screen.getByText(/work order/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05008 Instance class CreateWorkorderBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new CreateWorkorderBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.work_order/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05053 Test setCreateWorkorderSettings', () => {
    const objectTest: CreateWorkorderSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.createWorkorderSettings).toStrictEqual(null);
    const setObjectTest: CreateWorkorderSettings = setBlockSettings(TYPE, {
      ...objectTest,
      createWorkorderSettings: true,
    });
    expect(setObjectTest.createWorkorderSettings).toStrictEqual(true);
  });
});
