/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ForEachLoopSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/forEachLoop/ForEachLoopSettings';

import '@testing-library/jest-dom';
import React, {useMemo} from 'react';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/ForEachLoop';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';

import ForEachLoopBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/forEachLoop/ForEachLoopBlockType';
import ForEachLoopPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/forEachLoop/ForEachLoopPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /ForEachLoop/: ', () => {
  it('AUT-FE-05017 Render component <ForEachLoopPresentation/>', () => {
    render(<ForEachLoopPresentation />);

    const text = screen.getByText(/for each/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05018 Instance class ForEachLoopBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ForEachLoopBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/forEachLoopBlock/i);
    expect(text).toBeInTheDocument();
  });
  test('AUT-FE-05055 Test setParallelSettings', () => {
    const objectTest: ForEachLoopSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.forEachLoopSettings).toStrictEqual(null);

    const setObjectTest: ForEachLoopSettings = setBlockSettings(TYPE, {
      ...objectTest,
      forEachLoopSettings: true,
    });
    expect(setObjectTest.forEachLoopSettings).toStrictEqual(true);
  });
});
