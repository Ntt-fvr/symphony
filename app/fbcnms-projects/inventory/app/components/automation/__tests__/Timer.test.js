/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {TimerSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/timer/TimerSettings';

import '@testing-library/jest-dom';
import React, {useMemo} from 'react';
import TimerBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/timer/TimerBlockType';
import TriggerStartIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/timer/TimerPresentation';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/Timer';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {render, screen} from '@testing-library/react';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /Timer/: ', () => {
  it('AUT-FE-05027 Render component <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/timer/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05028 Instance class TimerBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TimerBlockType(flow)], [flow]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/timer/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05049 Test setTimerSettings', () => {
    const objectTest: TimerSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.enableExpressionL).toStrictEqual(null);
    expect(objectTest.behavior).toStrictEqual(null);

    const setObjectTest: TimerSettings = setBlockSettings(TYPE, {
      ...objectTest,
      enableExpressionL: true,
    });
    expect(setObjectTest.enableExpressionL).toStrictEqual(true);
    expect(setObjectTest.behavior).toStrictEqual(null);
  });
});
