/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ParallelSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/parallel/ParallelSettings';

import '@testing-library/jest-dom';
import React, {useMemo} from 'react';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/Parallel';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';

import ParallelBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/parallel/ParallelBlockType';
import ParallelPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/parallel/ParallelPresentation';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Parallel/: ', () => {
  it('AUT-FE-05025 Render component <ParallelPresentation/>', () => {
    render(<ParallelPresentation />);
    const text = screen.getByText(/parallel/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05026 Instance class ParallelBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new ParallelBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/parallelBlock/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05054 Test setParallelSettings', () => {
    const objectTest: ParallelSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.parallelSettings).toStrictEqual(null);

    const setObjectTest: ParallelSettings = setBlockSettings(TYPE, {
      ...objectTest,
      parallelSettings: true,
    });
    expect(setObjectTest.parallelSettings).toStrictEqual(true);
  });
});
