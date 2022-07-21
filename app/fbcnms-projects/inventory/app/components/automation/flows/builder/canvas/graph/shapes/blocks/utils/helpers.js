/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of block source tree.
 *
 * @flow
 * @format
 */
'use strict';

import {IBlock} from '../BaseBlock';

import {TYPE as ForEachLoopType} from '../../../facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as ParallelType} from '../../../facades/shapes/vertexes/logic/Parallel';

import {
  bigSize,
  mediumSize,
  originSize,
  portsBigPosition,
  portsMediumPosition,
  portsOriginPosition,
} from '../../../facades/shapes/vertexes/BaseVertext';

const INPUT = 'input';
const OUTPUT = 'output';
const IMAGE_INTPUTX = 19;
const IMAGE_OUTPUTX = -60;
const TRANSFORM_IMAGE_OUTPUT = 'transform: scaleX(-1)';

export function resizeBlock(typeSizeCoupled: string, block: IBlock) {
  if (
    block.model.attributes.type == ForEachLoopType ||
    block.model.attributes.type == ParallelType
  ) {
    switch (typeSizeCoupled) {
      case 'bigSizeCoupled':
        block.model.resize(bigSize.resizeWidth, bigSize.resizeHeigth);
        block.model.attr('coupled/width', bigSize.width);
        block.model.portProp(block.model.getPorts()[2].id, 'attrs/circle', {
          cx: portsBigPosition.cxRight,
        });
        break;

      case 'mediumSizeCoupled':
        console.log(block.model);
        block.model.resize(mediumSize.resizeWidth, mediumSize.resizeHeigth);
        block.model.attr('coupled/width', mediumSize.width);
        block.model.attr('coupled/height', mediumSize.height);
        block.model.attr('body/refY2', mediumSize.bodyY2);
        block.model.attr('background/refY2', mediumSize.backgroundY2);
        block.model.attr('label/refY2', mediumSize.labelY2);
        block.model.attr('image/refY2', mediumSize.imageY2);
        block.model.portProp(block.model.getPorts()[1].id, 'attrs/circle', {
          cy: portsMediumPosition.cyLeft,
        });
        block.model.portProp(block.model.getPorts()[2].id, 'attrs/circle', {
          cx: portsMediumPosition.cxRight,
          cy: portsMediumPosition.cyRight,
        });
        break;

      case 'originSizeCoupled':
        block.model.resize(originSize.resizeWidth, originSize.resizeHeigth);
        block.model.attr('coupled/width', originSize.width);
        block.model.attr('coupled/height', originSize.height);
        block.model.attr('body/refY2', originSize.bodyY2);
        block.model.attr('background/refY2', originSize.backgroundY2);
        block.model.attr('label/refY2', originSize.labelY2);
        block.model.attr('image/refY2', originSize.imageY2);
        block.model.portProp(block.model.getPorts()[1].id, 'attrs/circle', {
          cy: portsOriginPosition.cyLeft,
        });
        block.model.portProp(block.model.getPorts()[2].id, 'attrs/circle', {
          cx: portsOriginPosition.cxRight,
          cy: portsOriginPosition.cyRight,
        });
        break;

      default:
        return;
    }
  }
}

export function setOutput(block: IBlock) {
  const newPort = getPort(OUTPUT);
  if (
    block.model?.getPorts().length < 2 &&
    block.model?.getPorts().find(port => port.group === INPUT)
  ) {
    const port = block.model?.getPorts().filter(port => port.group === INPUT);
    block.model?.removePort(port[0].id);
    block.model?.addPort(newPort);
    block.model.attr('image/style', TRANSFORM_IMAGE_OUTPUT);
    block.model.attr('image/x', IMAGE_OUTPUTX);
  }
}

export function setIntput(block: IBlock) {
  const newPort = getPort(INPUT);
  if (
    block.model?.getPorts().length < 2 &&
    block.model?.getPorts().find(port => port.group === OUTPUT)
  ) {
    const port = block.model?.getPorts().filter(port => port.group === OUTPUT);
    block.model?.removePort(port[0]?.id);
    block.model?.addPort(newPort);
    block.model.attr('image/style', '');
    block.model.attr('image/x', IMAGE_INTPUTX);
  }
}

function getPort(typePort) {
  if (typePort === OUTPUT) {
    return {
      group: typePort,
      markup: `<circle r="7" cx="0" cy="0" stroke-width="4" stroke="#9360F7" fill="white" magnet="true"/>`,
    };
  } else {
    return {
      group: typePort,
      markup: `<circle r="7" cx="9" cy="0" stroke-width="4" stroke="#9360F7" fill="white" magnet="true"/>`,
    };
  }
}
