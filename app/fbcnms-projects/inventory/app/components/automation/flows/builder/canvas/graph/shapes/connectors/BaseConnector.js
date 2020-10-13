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

import type {IBlock} from '../blocks/BaseBlock';
import type {ILink} from '../../facades/shapes/edges/Link';
import type {Paper} from '../../facades/Paper';
import type {Position} from '../../facades/Helpers';

import Link from '../../facades/shapes/edges/Link';
import symphony from '@symphony/design-system/theme/symphony';

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
  markAvailable: true,
  interactive: true,
};

type CtorWithSourceTarget = $ReadOnly<{|
  source: IBlock,
  sourcePort: string,
  target: IBlock,
  targetPort: string,
|}>;

export interface IConnector {
  +id: string;
  +model: ILink;
  +snapTargetToPointer: Position => void;
  +source: IBlock;
  +sourcePortId: string;
  +target: IBlock;
  +targetPortId: string;
  +setSource: (IBlock, string) => void;
  +setTarget: (IBlock, string) => void;
  +select: () => void;
  +deselect: () => void;
  +isSelected: boolean;
  +addToGraph: () => void;
}

export default class BaseConnector implements IConnector {
  paper: Paper;
  model: ILink;
  id: string;
  source: IBlock;
  sourcePortId: string;
  target: IBlock;
  targetPortId: string;
  isSelected: boolean;
  isInGraph: boolean;

  constructor(
    paper: Paper,
    args: CtorWithSourceTarget,
    model?: ?ILink,
    addToGraph?: boolean = true,
  ) {
    this.paper = paper;

    if (model) {
      this.model = model;
      this.source = args.source;
      this.sourcePortId = args.sourcePort;
      this.target = args.target;
      this.targetPortId = args.targetPort;
    } else {
      this.model = new Link();
      this.setSource(args.source, args.sourcePort, addToGraph);
      this.setTarget(args.target, args.targetPort, addToGraph);

      if (addToGraph) {
        this.addToGraph();
      }
    }

    this.id = this.model.id;
  }

  setSource(source: IBlock, port: string, addToGraph?: boolean = true) {
    this.source = source;
    this.sourcePortId = port;

    if (addToGraph) {
      this.setSourceInModel();
    }
  }

  setSourceInModel() {
    this.model.source(
      buildConnectionEndpointAttrs(this.source, this.sourcePortId),
    );
  }

  setTarget(target: IBlock, port: string, addToGraph?: boolean = true) {
    this.target = target;
    this.targetPortId = port;

    if (addToGraph) {
      this.setTargetInModel();
    }
  }

  setTargetInModel() {
    this.model.target(
      buildConnectionEndpointAttrs(this.target, this.targetPortId),
    );
  }

  snapTargetToPointer(pointerPosition: Position) {
    const pointerOnPaper = this.paper.clientToLocalPoint(pointerPosition);
    this.model.target(pointerOnPaper);
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

  addToGraph() {
    if (this.isInGraph) {
      return;
    }

    this.model.addTo(this.paper.model);
    this.setSourceInModel();
    this.setTargetInModel();
  }
}

function buildConnectionEndpointAttrs(
  block: IBlock,
  port: string,
): ?{id: string, port: string} {
  return block != null
    ? {
        id: block.id,
        port,
      }
    : null;
}
