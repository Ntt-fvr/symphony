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

import type {TriggerStartSettings} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartSettings';

import TriggerStartBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartBlockType';
import TriggerStartIconPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/triggerStart/TriggerStartPresentation';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';
describe('Suite Test Components /TriggerStart/: ', () => {
  it('AUT-FE-05029 Render components <TriggerStartIconPresentation/>', () => {
    render(<TriggerStartIconPresentation />);
    const text = screen.getByText(/triggered/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05030 Instance class TriggerStartBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new TriggerStartBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);

    const text = screen.getByText(/triggerBlock.trigger_start/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05048 Test setTriggerStartSettings', () => {
    const objectTest: TriggerStartSettings = getInitialBlockSettings(TYPE);

    expect(objectTest.triggerStartSettings).toStrictEqual(null);
    const setObjectTest: TriggerStartSettings = setBlockSettings(TYPE, {
      ...objectTest,
      triggerStartSettings: 'testParams',
    });
    expect(setObjectTest.triggerStartSettings).toStrictEqual('testParams');
  });
});
