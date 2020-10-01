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
import type {IBlock} from '../blocks/BaseBlock';
import type {ILink} from '../../facades/shapes/edges/Link';
import type {Paper} from '../../facades/Paper';
import type {Position} from '../../facades/Helpers';

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

  constructor(paper: Paper, args: CtorWithSourceTarget, model?: ?ILink) {
    this.paper = paper;

    if (model) {
      this.model = model;
      this.source = args.source;
      this.sourcePortId = args.sourcePort;
      // this.sourcePortId =
      //   model.attributes.source.port != null
      //     ? model.attributes.source.port
      //     : '';
      this.target = args.target;
      this.targetPortId = args.targetPort;
    } else {
      this.model = new Link();
      this.setSource(args.source, args.sourcePort);
      this.setTarget(args.target, args.targetPort);
      this.model.addTo(this.paper.model);
    }

    this.id = this.model.id;
  }

  setSource(source: IBlock, port: string) {
    const sourceAttrs =
      source != null
        ? {
            id: source.id,
            port,
            // port: nullthrows(source.getOutputPorts()[0]?.id),
          }
        : null;
    this.model.source(sourceAttrs);
    this.source = source;
    this.sourcePortId = port;
  }

  setTarget(target: IBlock, port: string) {
    const targetAttrs =
      target != null
        ? {
            id: target.id,
            port,
            // port: nullthrows(target.getInputPort()?.id),
          }
        : null;
    this.model.target(targetAttrs);
    this.target = target;
    this.targetPortId = port;
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
}
