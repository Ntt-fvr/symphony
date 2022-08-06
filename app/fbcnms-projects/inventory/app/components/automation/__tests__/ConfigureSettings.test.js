/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import {render, screen} from '@testing-library/react';

import ConfigurationExecuteFlow from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationExecuteFlow';
import ConfigurationGoTo from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationGoTo';
import ConfigurationInvokeApi from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationInvokeApi';
import ConfigurationNetworkAction from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationNetworkAction';
import ConfigurationTimer from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationTimer';
import ConfigurationWaitForSignal from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/ConfigurationWaitForSignal';
import ConfigureSettings from '../flows/builder/widgets/detailsPanel/blockSettings/configureSettings/index';

import {TYPE as ChoiceType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/Choice';
import {TYPE as ExecuteFlowType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteFlow';
import {TYPE as ExecuteNetworkActionType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteNetworkAction';
import {TYPE as ForEachLoopType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as GoToType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/GoTo';
import {TYPE as InvokeRestApiType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/InvokeRestApi';
import {TYPE as Parallel} from '../flows/builder/canvas/graph/facades/shapes/vertexes/logic/Parallel';
import {TYPE as TimerType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/Timer';
import {TYPE as TriggerStartType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as WaitSignalType} from '../flows/builder/canvas/graph/facades/shapes/vertexes/triggers/WaitSignal';

describe('Suite Test Components /configureSettings/: ', () => {
  const propsMock = {
    block: {
      setSettings: function (value) {
        return value;
      },
      settings: {
        customFilter: 'testValue',
      },
      setPorts: () => {},
    },
  };

  test('AUT-FE-05062 Render component <ConfigurationGoTo/>', () => {
    render(<ConfigurationGoTo {...propsMock} />);
    const text = screen.getAllByText(/type/i);
    expect(text[0]).toBeInTheDocument();
  });

  test('AUT-FE-05063 Render component <ConfigurationWaitForSignal/>', () => {
    render(<ConfigurationWaitForSignal {...propsMock} />);
    const text = screen.getByText(/block flow/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05064 Render component <ConfigurationTimer/>', () => {
    render(<ConfigurationTimer {...propsMock} />);
    const text = screen.getByText(/expression language/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05065 Render component <ConfigurationInvokeApi/>', () => {
    render(<ConfigurationInvokeApi {...propsMock} />);
    const text = screen.getAllByText(/url/i);
    expect(text[0]).toBeInTheDocument();
  });

  test('AUT-FE-05066 Render component <ConfigurationExecuteFlow/>', () => {
    render(<ConfigurationExecuteFlow {...propsMock} />);
    const text = screen.getAllByText(/flow/i);
    expect(text[0]).toBeInTheDocument();
  });

  test('AUT-FE-05067 Render component <ConfigurationNetworkAction/>', () => {
    render(<ConfigurationNetworkAction {...propsMock} />);
    const text = screen.getAllByText(/url/i);
    expect(text[0]).toBeInTheDocument();
  });

  test('AUT-FE-05068 Render component <ConfigureSettings/>', () => {
    const TestComponent = () => {
      const blockTypes = [
        {value: ChoiceType},
        {value: ExecuteFlowType},
        {value: ExecuteNetworkActionType},
        {value: ForEachLoopType},
        {value: GoToType},
        {value: InvokeRestApiType},
        {value: Parallel},
        {value: TimerType},
        {value: TriggerStartType},
        {value: WaitSignalType},
        {value: ''},
      ];

      const block = {
        id: '0001',
        type: '',
        name: '',
        settings: {},
        setSettings: function (value) {
          return value;
        },
        setPorts: () => {},
      };
      return (
        <div>
          {blockTypes.map((blockType, index) => (
            <ConfigureSettings
              key={index}
              block={{...block, type: blockType.value}}
            />
          ))}
        </div>
      );
    };
    render(<TestComponent />);
    const text = screen.getAllByText(/type/i);
    expect(text[0]).toBeInTheDocument();
  });
});
