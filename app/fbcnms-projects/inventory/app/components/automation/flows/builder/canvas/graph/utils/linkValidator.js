/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
export function validatorConectionBlock(
  coupledsBlocksList,
  targetBlock,
  sourceBlock,
  isInputPort: () => boolean,
  targetPortId,
  sourcePortId,
) {
  const isBrothersBlocks = coupledsBlocksList.find(
    coupled =>
      coupled.attributes.embeds?.length > 1 &&
      coupled.attributes.embeds.find(item => item === targetBlock.id) &&
      coupled.attributes.embeds.find(item => item === sourceBlock.id),
  );

  if (isBrothersBlocks) {
    return true;
  }

  if (!isBrothersBlocks) {
    const validatorCoupledSource = coupledsBlocksList.filter(
      coupled => coupled.id === sourceBlock.id,
    );
    const validatorCoupledTarget = coupledsBlocksList.filter(
      coupled => coupled.id === targetBlock.id,
    );

    const validatorCoupled =
      validatorCoupledSource.length > 0
        ? validatorCoupledSource
        : validatorCoupledTarget;

    const validatorCoupledBlockTarget =
      validatorCoupled.length > 0 &&
      validatorCoupled[0].changed.embeds?.find(item => item === targetBlock.id);

    const validatorCoupledBlockSource =
      validatorCoupled.length > 0 &&
      validatorCoupled[0].changed.embeds?.find(item => item === sourceBlock.id);

    //allow to connect block children and coupled
    const blockToCoupledLinkValidator =
      (validatorCoupledBlockTarget && isInputPort(targetBlock, targetPortId)) ||
      (validatorCoupledBlockSource && isInputPort(sourceBlock, sourcePortId));

    if (blockToCoupledLinkValidator) {
      return true;
    } else {
      //allows to connect external blocks and external blocks to coupleds
      const conectionNotToHaveChildren = coupledsBlocksList.find(
        coupled =>
          coupled.attributes.embeds?.find(item => item === targetBlock.id) ||
          coupled.attributes.embeds?.find(item => item === sourceBlock.id),
      );

      if (!validatorCoupledBlockTarget && !validatorCoupledBlockSource) {
        return !conectionNotToHaveChildren;
      }
    }
    return false;
  }
}
