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

import Link from '../../facades/shapes/edges/Link';
import type {GraphContextType} from '../../GraphContext';
import type {IBlock} from '../blocks/BaseBlock';
import type {ILink} from '../../facades/shapes/edges/Link';
import type {Paper} from '../../facades/Paper';
import type {Position} from '../../facades/Helpers';

export interface IConnector {
  +id: string;
  +model: ILink;
  +snapTargetToPointer: Position => void;
  +tryAttachingAtPoint: (Position, GraphContextType) => void;
  +source: ?IBlock;
  +target: ?IBlock;
  +setSource: (?IBlock) => void;
  +setTarget: (?IBlock) => void;
}

export default class BaseConnector implements IConnector {
  paper: Paper;
  model: ILink;
  id: string;
  source: ?IBlock;
  target: ?IBlock;

  constructor(paper: Paper, source?: ?IBlock, target?: ?IBlock) {
    this.paper = paper;
    this.model = new Link();
    this.id = this.model.id;
    this.setSource(source);
    this.setTarget(target);
    this.model.addTo(this.paper.model);
    this.model.router('manhattan', {
      padding: 16,
      maximumLoops: 200,
      maxAllowedDirectionChange: 3,
    });
  }

  setSource(source: ?IBlock) {
    this.model.source(source?.model);
    this.source = source;
  }

  setTarget(target: ?IBlock) {
    this.model.target(target?.model);
    this.target = target;
  }

  snapTargetToPointer(pointerPosition: Position) {
    const pointerOnPaper = this.paper.clientToLocalPoint(pointerPosition);
    this.model.target(pointerOnPaper);
  }

  tryAttachingAtPoint(position: Position, graphContext: GraphContextType) {
    const paperPosition = this.paper.clientToLocalPoint(position);
    const newPossibleTargets = this.paper.findViewsFromPoint(paperPosition);
    if (newPossibleTargets.length > 0) {
      const newTarget = graphContext.getBlock(newPossibleTargets[0].model.id);
      if (newTarget) {
        this.setTarget(newTarget);
        return;
      }
    }
    this.setTarget(this.target);
  }
}
