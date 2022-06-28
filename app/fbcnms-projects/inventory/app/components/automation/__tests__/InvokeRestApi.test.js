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

import type {InvokeRestApiSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiSettings';

import InvokeRestApiBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiBlockType';
import InvokeRestApiPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/invokeRestApi/InvokeRestApiPresentation';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/InvokeRestApi';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /InvokeRestApi/: ', () => {
  it('AUT-FE-05021 Render component <InvokeRestApiPresentation/>', () => {
    render(<InvokeRestApiPresentation />);
    const text = screen.getByText(/invoke/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05022 Instance class InvokeRestApiBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new InvokeRestApiBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/actionBlock.invoke/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05047 Test setInvokeRestApiSettings', () => {
    const objectTest: InvokeRestApiSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.body).toStrictEqual(null);
    expect(objectTest.headers).toStrictEqual(null);

    const setObjectTest: InvokeRestApiSettings = setBlockSettings(TYPE, {
      ...objectTest,
      body: 'testParams',
    });
    expect(setObjectTest.body).toStrictEqual('testParams');
    expect(setObjectTest.headers).toStrictEqual(null);
  });
});
