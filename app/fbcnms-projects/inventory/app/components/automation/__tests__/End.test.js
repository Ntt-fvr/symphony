/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {EndSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/end/EndSettings';

import '@testing-library/jest-dom';
import ChoicePresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/end/EndPresentation';
import EndBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/end/EndBlockType';
import React, {useMemo} from 'react';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/administrative/End';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';

import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /End/: ', () => {
  it('AUT-FE-05011 Render component <EndPresentation/>', () => {
    render(<ChoicePresentation />);

    const text = screen.getByText(/end/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05012 Instance class EndBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new EndBlockType(flow)], [flow]);

      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/endblock/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05044 Test setEndSettings', () => {
    const objectTest: EndSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.params).toStrictEqual(null);
    const setObjectTest: EndSettings = setBlockSettings(TYPE, {
      ...objectTest,
      params: 'testParams',
    });
    expect(setObjectTest.params).toStrictEqual('testParams');
  });
});
