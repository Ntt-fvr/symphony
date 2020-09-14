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
import type {IShape} from '../../facades/shapes/BaseShape';
import type {Paper} from '../../facades/Paper';
import type {Position} from '../../facades/Helpers';

import symphony from '@fbcnms/ui/theme/symphony';

export const STROKE = {
  COLOR: {
    DEFAULT: symphony.palette.secondary,
    SELECTED: symphony.palette.primary,
  },
  WIDTH: '2px',
};

export const DEFAULT_LINK_SETTINGS = {
  linkPinning: false,
  snapLinks: true,
  defaultLink: new window.joint.shapes.standard.Link({
    z: 2,
    attrs: {
      line: {
        stroke: STROKE.COLOR.DEFAULT,
        strokeWidth: STROKE.WIDTH,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        targetMarker: {
          type: 'path',
          d: '',
        },
      },
    },
  }),
  defaultConnector: {name: 'jumpover'},
  defaultRouter: {name: 'manhattan'},
  defaultConnectionPoint: {
    name: 'anchor',
  },
  magnetThreshold: 'onleave',
  validateConnection: (
    _cellViewS: IShape,
    magnetS: IShape,
    _cellViewT: IShape,
    magnetT: IShape,
  ) => {
    return magnetT != null && magnetT != magnetS;
  },
  markAvailable: true,
  interactive: true,
};

export interface IConnector {
  +id: string;
  +model: ILink;
  +snapTargetToPointer: Position => void;
  +tryAttachingAtPoint: (Position, GraphContextType) => void;
  +source: ?IBlock;
  +target: ?IBlock;
  +setSource: (?IBlock) => void;
  +setTarget: (?IBlock) => void;
  +select: () => void;
  +deselect: () => void;
  +isSelected: boolean;
}

export default class BaseConnector implements IConnector {
  paper: Paper;
  model: ILink;
  id: string;
  source: ?IBlock;
  target: ?IBlock;
  isSelected: boolean;

  constructor(
    paper: Paper,
    source?: ?IBlock,
    target?: ?IBlock,
    model?: ?ILink,
  ) {
    this.paper = paper;

    if (model) {
      this.model = model;
    } else {
      this.model = new Link();
      this.setSource(source);
      this.setTarget(target);
      this.model.addTo(this.paper.model);
      this.model.router('jumpover', {
        padding: 16,
        maximumLoops: 200,
        maxAllowedDirectionChange: 3,
      });
    }

    this.id = this.model.id;
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

  select() {
    this.isSelected = true;
    this.model.attr({
      line: {
        stroke: STROKE.COLOR.SELECTED,
      },
    });
  }

  deselect() {
    this.isSelected = false;
    this.model.attr({
      line: {
        stroke: STROKE.COLOR.DEFAULT,
      },
    });
  }
}
