/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {WaitSignalSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalSettings';

import React, {useMemo} from 'react';
import TriggerStartIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalPresentation';
import WaitSignalBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/waitSignal/WaitSignalBlockType';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/WaitSignal';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /waitSignal/: ', () => {
  it('AUT-FE-05039 Render component <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/wait for signal/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05040 Instance class WaitSignalBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new WaitSignalBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/wait/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05051 Test setWaitSignalSettings', () => {
    const objectTest: WaitSignalSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.signalType).toStrictEqual(undefined);
    expect(objectTest.blocked).toStrictEqual(undefined);
    const setObjectTest: WaitSignalSettings = setBlockSettings(TYPE, {
      ...objectTest,
      blocked: true,
    });
    expect(setObjectTest.signalType).toStrictEqual(undefined);
    expect(setObjectTest.blocked).toStrictEqual(true);
  });
});
