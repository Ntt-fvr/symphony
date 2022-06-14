/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import {TYPE as ForEachLoopType} from '../facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as ParallelType} from '../facades/shapes/vertexes/logic/Parallel';

import type {FlowWrapperReference} from '../graphAPIContext/GraphContext';

import type {IBlock} from '../shapes/blocks/BaseBlock';

const RESIZE: number = 100;

export function validatorContainerConection(
  targetBlockValid: boolean,
  sourceBlockValid: boolean,
  targetBlock,
  sourceBlock,
  isInputPort: () => boolean,
  targetPortId,
  sourcePortId,
) {
  if (!targetBlockValid && !sourceBlockValid) {
    return true;
  }

  if (targetBlockValid && sourceBlockValid) {
    if (
      ((targetBlock.model.attributes.type === ParallelType ||
        targetBlock.model.attributes.type === ForEachLoopType) &&
        isInputPort(targetBlock, targetPortId)) ||
      ((sourceBlock.model.attributes.type === ParallelType ||
        sourceBlock.model.attributes.type === ForEachLoopType) &&
        isInputPort(sourceBlock, sourcePortId))
    ) {
      return false;
    }

    if (
      sourceBlock.model.attributes.type !== ParallelType ||
      sourceBlock.model.attributes.type !== ForEachLoopType
    ) {
      return true;
    } else {
      return sourceBlock.model.attributes.type === ParallelType ||
        sourceBlock.model.attributes.type === ForEachLoopType
        ? true
        : false;
    }
  }

  if (targetBlockValid || sourceBlockValid) {
    return ((targetBlock.model.attributes.type === ParallelType ||
      targetBlock.model.attributes.type === ForEachLoopType) &&
      isInputPort(targetBlock, targetPortId)) ||
      ((sourceBlock.model.attributes.type === ParallelType ||
        sourceBlock.model.attributes.type === ForEachLoopType) &&
        isInputPort(sourceBlock, sourcePortId))
      ? true
      : false;
  }
}

export function findAreaContainer(
  flowWrapper: FlowWrapperReference,
  sourceBlock: IBlock,
  targetBlock: IBlock,
) {
  const containerBlock: IBlock = flowWrapper.current?.paper.model.attributes.cells.models.find(
    block =>
      block.attributes.type === ForEachLoopType ||
      block.attributes.type === ParallelType,
  );

  const containerBlockPosition: {
    x: number,
    y: number,
    endX: number,
    endY: number,
  } = {
    x: containerBlock?.attributes.position.x - RESIZE,
    y: containerBlock?.attributes.position.y - RESIZE,
    endX:
      containerBlock?.attributes.position.x +
      containerBlock?.attributes.size.width,
    endY:
      containerBlock?.attributes.position.y +
      containerBlock?.attributes.size.height,
  };

  const sourceBlockValid: boolean =
    containerBlockPosition &&
    sourceBlock.model.attributes.position.x >= containerBlockPosition.x &&
    sourceBlock.model.attributes.position.x <= containerBlockPosition.endX &&
    sourceBlock.model.attributes.position.y >= containerBlockPosition.y &&
    sourceBlock.model.attributes.position.y <= containerBlockPosition.endY;

  const targetBlockValid: boolean =
    containerBlockPosition &&
    targetBlock.model.attributes.position.x >= containerBlockPosition.x &&
    targetBlock.model.attributes.position.x <= containerBlockPosition.endX &&
    targetBlock.model.attributes.position.y >= containerBlockPosition.y &&
    targetBlock.model.attributes.position.y <= containerBlockPosition.endY;

  return {
    containerBlock,
    targetBlockValid,
    sourceBlockValid,
  };
}
