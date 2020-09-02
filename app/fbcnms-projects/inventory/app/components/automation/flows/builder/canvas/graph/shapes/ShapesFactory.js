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
import type {IBlock} from './blocks/BaseBlock';
import type {IConnector} from './connectors/BaseConnector';
import type {Paper} from '../facades/Paper';

import BaseConnector from './connectors/BaseConnector';
import Block from './blocks/BaseBlock';
import CreateWorkorder, {
  TYPE as CreateWorkorderType,
} from '../facades/shapes/vertexes/actions/CreateWorkorder';
import GeneralStep, {
  TYPE as GeneralStepType,
} from '../facades/shapes/vertexes/actions/GeneralStep';
import ManualStart, {
  TYPE as ManualStartType,
} from '../facades/shapes/vertexes/administrative/ManualStart';
import nullthrows from '@fbcnms/util/nullthrows';
import {getCellType} from '../facades/shapes/BaseShape';

const VERTEXES = {
  [ManualStartType]: ManualStart,
  [GeneralStepType]: GeneralStep,
  [CreateWorkorderType]: CreateWorkorder,
};
const VERTEX_TYPES = Object.keys(VERTEXES);

export function isVertex(cell: ?IShape | IBaseShapeAttributes) {
  return VERTEX_TYPES.includes(getCellType(cell));
}

export interface IShapesFactory {
  +createBlock: string => Block;
  +createConnector: (source?: ?IBlock, target?: ?IBlock) => IConnector;
}

export default class ShapesFactory {
  paper: Paper;

  constructor(paper: Paper) {
    this.paper = paper;
  }

  createBlock(type: string) {
    const VertexCtor = nullthrows(VERTEXES[type]);
    const vertexModel = new VertexCtor();

    return new Block(vertexModel, this.paper);
  }
  createConnector(source?: ?IBlock, target?: ?IBlock) {
    return new BaseConnector(this.paper, source, target);
  }
}
