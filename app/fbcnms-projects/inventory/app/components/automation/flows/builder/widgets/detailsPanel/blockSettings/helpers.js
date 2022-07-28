/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlock} from '../../../canvas/graph/shapes/blocks/BaseBlock';

import ErrorHandlingSettings from './errorHandlingSettings';
import InputSettings from './inputSettings';
import OutputSettings from './outputSettings';
import React from 'react';
import {TYPE as ChoiceType} from '../../../canvas/graph/facades/shapes/vertexes/logic/Choice';
import {TYPE as CreateWorkorderType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/CreateWorkorder';
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
import {TYPE as PublishToKafkaType} from '../../../../builder/canvas/graph/facades/shapes/vertexes/actions/PublishToKafka';

export const signalTypes = [
  {name: 'WOCREATED', id: 'WOCREATED'},
  {name: 'CRCREATED', id: 'CRCREATED'},
  {name: 'PR_CREATED', id: 'PR_CREATED'},
  {name: 'MOICREATED', id: 'MOICREATED'},
  {name: 'WOUPDATED', id: 'WOUPDATED'},
  {name: 'CRUPDATED', id: 'CRUPDATED'},
  {name: 'PR_UPDATED', id: 'PR_UPDATED'},
  {name: 'MOIUPDATED', id: 'MOIUPDATED'},
];

export const signalModules = [
  {name: 'Inventory', id: 'INVENTORY'},
  {name: 'Configuration Management', id: 'CM'},
  {name: 'Workforce Management', id: 'WFM'},
  {name: 'Assurance', id: 'ASSURANCE'},
];

export const messageTypes = [
  {name: 'Input', id: 'INPUT'},
  {name: 'State', id: 'STATE'},
  {name: 'Expression', id: 'EXPRESSION'},
];

export const INPUT_TYPE = 'input_tab';
export const OUTPUT_TYPE = 'output_tab';
export const ERROR_TYPE = 'error_tab';

type BlockTabs = $ReadOnly<{|
  type: string,
  allowedTabs: Array<string>,
|}>;

const blocksTabs: Array<BlockTabs> = [
  // Actions
  {type: CreateWorkorderType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: ExecuteFlowType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: ExecuteNetworkActionType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: InvokeRestApiType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE, ERROR_TYPE]},
  {type: UpdateInventoryType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: UpdateWorkforceType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
  {type: PublishToKafkaType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE]},
  // Administrative
  {type: ManualStartType, allowedTabs: []},
  {type: EndType, allowedTabs: []},
  // Logic
  {type: ChoiceType, allowedTabs: [ERROR_TYPE]},
  {type: ForEachLoopType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE, ERROR_TYPE]},
  {type: GoToType, allowedTabs: [ERROR_TYPE]},
  {type: ParallelType, allowedTabs: [INPUT_TYPE, OUTPUT_TYPE, ERROR_TYPE]},
  {type: TrueFalseType, allowedTabs: []},
  // Triggers
  {type: TimerType, allowedTabs: [ERROR_TYPE]},
  {type: TriggerStartType, allowedTabs: [ERROR_TYPE]},
  {type: TriggerWorkforceType, allowedTabs: [ERROR_TYPE]},
  {type: WaitSignalType, allowedTabs: [OUTPUT_TYPE, ERROR_TYPE]},
];

const getTabById = (id: string, index: number, block: IBlock) => {
  switch (id) {
    case INPUT_TYPE:
      return {
        label: 'Input',
        index,
        view: <InputSettings block={block} />,
      };
    case OUTPUT_TYPE:
      return {
        label: 'Output',
        index,
        view: <OutputSettings block={block} />,
      };
    case ERROR_TYPE:
      return {
        label: 'Error Handling',
        index,
        view: <ErrorHandlingSettings block={block} />,
      };
    default:
      return null;
  }
};

export const getAllowedTabs = (type: string, block: IBlock) => {
  const allowedTabs = blocksTabs.find(blockTab => blockTab.type === type)
    .allowedTabs;

  return allowedTabs.map((allowedTab, i) =>
    getTabById(allowedTab, i + 1, block),
  );
};
