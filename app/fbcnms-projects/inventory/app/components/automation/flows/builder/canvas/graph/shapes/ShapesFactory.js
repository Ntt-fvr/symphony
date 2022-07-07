/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import type {IBaseShapeAttributes, IShape} from '../facades/shapes/BaseShape';
import type {Paper} from '../facades/Paper';

import BaseBlock from './blocks/BaseBlock';
import Choice, {
  TYPE as ChoiceType,
} from '../facades/shapes/vertexes/logic/Choice';
import CreateWorkorder, {
  TYPE as CreateWorkorderType,
} from '../facades/shapes/vertexes/actions/CreateWorkorder';
import End, {
  TYPE as EndType,
} from '../facades/shapes/vertexes/administrative/End';
import ExecuteFlow, {
  TYPE as ExecuteFlowType,
} from '../facades/shapes/vertexes/actions/ExecuteFlow';
import ExecuteNetworkAction, {
  TYPE as ExecuteNetworkActionType,
} from '../facades/shapes/vertexes/actions/ExecuteNetworkAction';
import ForEachLoop, {
  TYPE as ForEachLoopType,
} from '../facades/shapes/vertexes/logic/ForEachLoop';
import GoTo, {TYPE as GoToType} from '../facades/shapes/vertexes/logic/GoTo';
import InvokeRestApi, {
  TYPE as InvokeRestApiType,
} from '../facades/shapes/vertexes/actions/InvokeRestApi';
import ManualStart, {
  TYPE as ManualStartType,
} from '../facades/shapes/vertexes/administrative/ManualStart';
import Parallel, {
  TYPE as ParallelType,
} from '../facades/shapes/vertexes/logic/Parallel';
import Timer, {
  TYPE as TimerType,
} from '../facades/shapes/vertexes/triggers/Timer';
import TriggerStart, {
  TYPE as TriggerStartType,
} from '../facades/shapes/vertexes/triggers/TriggerStart';
import TriggerWorkforce, {
  TYPE as TriggerWorkforceType,
} from '../facades/shapes/vertexes/triggers/TriggerWorkforce';
import TrueFalse, {
  TYPE as TrueFalseType,
} from '../facades/shapes/vertexes/logic/TrueFalse';
import UpdateInventory, {
  TYPE as UpdateInventoryType,
} from '../facades/shapes/vertexes/actions/UpdateInventory';
import UpdateWorkforce, {
  TYPE as UpdateWorkforceType,
} from '../facades/shapes/vertexes/actions/UpdateWorkforce';
import WaitSignal, {
  TYPE as WaitSignalType,
} from '../facades/shapes/vertexes/triggers/WaitSignal';
import Worker, {
  TYPE as WorkerType,
} from '../facades/shapes/vertexes/actions/Worker';
import nullthrows from '@fbcnms/util/nullthrows';
import {getCellType} from '../facades/shapes/BaseShape';

const VERTEXES = {
  // Administrative
  [ManualStartType]: ManualStart,
  [EndType]: End,
  // Actions
  [CreateWorkorderType]: CreateWorkorder,
  [WorkerType]: Worker,
  [UpdateInventoryType]: UpdateInventory,
  [UpdateWorkforceType]: UpdateWorkforce,
  [ExecuteFlowType]: ExecuteFlow,
  [InvokeRestApiType]: InvokeRestApi,
  [ExecuteNetworkActionType]: ExecuteNetworkAction,
  // Triggers
  [TimerType]: Timer,
  [TriggerWorkforceType]: TriggerWorkforce,
  [TriggerStartType]: TriggerStart,
  [WaitSignalType]: WaitSignal,
  // Logic
  [ChoiceType]: Choice,
  [GoToType]: GoTo,
  [TrueFalseType]: TrueFalse,
  [ForEachLoopType]: ForEachLoop,
  [ParallelType]: Parallel,
};
const VERTEX_TYPES = Object.keys(VERTEXES);

export function isVertex(cell: ?IShape | IBaseShapeAttributes) {
  return VERTEX_TYPES.includes(getCellType(cell));
}

export interface IShapesFactory {
  +createBlock: (type: string, id?: ?string) => BaseBlock;
}

export default class ShapesFactory {
  paper: Paper;

  constructor(paper: Paper) {
    this.paper = paper;
  }

  createBlock(type: string, id?: ?string) {
    const VertexCtor = nullthrows(VERTEXES[type]);
    const vertexModel = new VertexCtor(id);

    return new BaseBlock(vertexModel, this.paper);
  }
}
