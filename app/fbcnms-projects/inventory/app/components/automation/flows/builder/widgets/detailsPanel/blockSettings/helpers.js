/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ErrorHandlingSettings from './errorHandlingSettings';
import InputSettings from './inputSettings';
import OutputSettings from './outputSettings';
import React from 'react';
import {TYPE as CreateWorkorderType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/CreateWorkorder';
import {TYPE as DecisionType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/logic/Decision';
import {TYPE as EndType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/administrative/End';
import {TYPE as ExecuteFlowType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteFlow';
import {TYPE as ExecuteNetworkActionType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/ExecuteNetworkAction';
import {TYPE as ForEachLoopType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as GoToType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/logic/GoTo';
import {TYPE as InvokeRestApiType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/InvokeRestApi';
import {TYPE as ManualStartType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/administrative/ManualStart';
import {TYPE as ParallelType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/logic/Parallel';
import {TYPE as TimerType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/triggers/Timer';
import {TYPE as TriggerStartType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerStart';
import {TYPE as TriggerWorkforceType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/triggers/TriggerWorkforce';
import {TYPE as TrueFalseType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/logic/TrueFalse';
import {TYPE as UpdateInventoryType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/UpdateInventory';
import {TYPE as UpdateWorkforceType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/UpdateWorkforce';
import {TYPE as WaitSignalType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/triggers/WaitSignal';

export const INPUT_TYPE = 'input_tab';
export const OUTPUT_TYPE = 'output_tab';
export const ERROR_TYPE = 'error_tab';

type BlockTabs = $ReadOnly<{|
  type: string,
  allowedTabs: Array<string>,
|}>;

const blocksTabs: Array<BlockTabs> = [
  // Actions
  {type: CreateWorkorderType, allowedTabs: []},
  {type: ExecuteFlowType, allowedTabs: []},
  {type: ExecuteNetworkActionType, allowedTabs: []},
  {type: InvokeRestApiType, allowedTabs: []},
  {type: UpdateInventoryType, allowedTabs: []},
  {type: UpdateWorkforceType, allowedTabs: []},
  // Administrative
  {type: ManualStartType, allowedTabs: []},
  {type: EndType, allowedTabs: [INPUT_TYPE, ERROR_TYPE]},
  // Logic
  {type: DecisionType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE]},
  {type: ForEachLoopType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE, ERROR_TYPE]},
  {type: GoToType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: ParallelType, allowedTabs: []},
  {type: TrueFalseType, allowedTabs: []},
  // Triggers
  {type: TimerType, allowedTabs: []},
  {type: TriggerStartType, allowedTabs: []},
  {type: TriggerWorkforceType, allowedTabs: []},
  {type: WaitSignalType, allowedTabs: []},
];

const getTabById = (id: string, index: number) => {
  switch (id) {
    case INPUT_TYPE:
      return {
        label: 'Input',
        index,
        view: <InputSettings />,
      };
    case OUTPUT_TYPE:
      return {
        label: 'Output',
        index,
        view: <OutputSettings />,
      };
    case ERROR_TYPE:
      return {
        label: 'Error Handling',
        index,
        view: <ErrorHandlingSettings />,
      };
    default:
      return null;
  }
};

export const getAllowedTabs = type => {
  const allowedTabs = blocksTabs.find(blockTab => blockTab.type === type)
    .allowedTabs;

  return allowedTabs.map((allowedTab, i) => getTabById(allowedTab, i + 1));
};
