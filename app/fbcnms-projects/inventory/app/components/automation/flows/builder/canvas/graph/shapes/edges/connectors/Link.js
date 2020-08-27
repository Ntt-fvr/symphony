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

import type {GeneralEventArgs, Position} from '../../../facades/Helpers';
import type {Graph} from '../../../facades/Graph';
import type {IBaseShapeAttributes, IShape} from '../../BaseShape';
import type {IVertexModel} from '../../vertexes/BaseVertext';
import type {Paper} from '../../../facades/Paper';

import * as jointJS from 'jointjs';
import {getCellType} from '../../BaseShape';

export const TYPE = 'standard.Link';

export type LinkAttributes = $ReadOnly<{|
  id: string,
  source: IVertexModel,
  target: IVertexModel,
  type: 'standard.Link',
  z: number,
|}>;

export interface ILink {
  +id: string;
  +attributes: LinkAttributes;
  +source: IVertexModel => void;
  +target: IVertexModel => void;
  +addTo: Graph => void;
  +getTargetElement: () => ?IVertexModel;
  +snapTargetToPointer: (Paper, Position) => void;
  +tryAttachingAtPoint: (Paper, Position, IVertexModel) => void;
}

export type LinkDescriptor = $ReadOnly<{|
  id: string,
  sourceId: string,
  targetId: string,
|}>;

const LinkBaseClass = jointJS.shapes.standard.Link;

export default class Link extends LinkBaseClass implements IVertexModel {
  constructor() {
    super();
  }
  snapTargetToPointer(paper: Paper, pointerPosition: Position) {
    const pointerOnPaper = paper.clientToLocalPoint(pointerPosition);
    this.target(pointerOnPaper);
  }

  tryAttachingAtPoint(
    paper: Paper,
    position: Position,
    fallback: IVertexModel,
  ) {
    const paperPosition = paper.clientToLocalPoint(position);
    const newPossibleTargets = paper.findViewsFromPoint(paperPosition);
    if (newPossibleTargets.length < 1) {
      this.target(fallback);
      return;
    }
    this.target({id: newPossibleTargets[0].model.id});
  }
}

export function isLink(cell: ?IShape | IBaseShapeAttributes): boolean {
  return getCellType(cell) === TYPE;
}

export type LinkEventArgs = $ReadOnly<{|
  model: Link,
  paper: Paper,
|}>;

export type LinkEventCallback = (
  LinkEventArgs,
  GeneralEventArgs,
  number,
  number,
) => void;
