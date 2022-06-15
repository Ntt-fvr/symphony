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
  containerBlock,
  targetBlock,
  sourceBlock,
  isInputPort: () => boolean,
  targetPortId,
  sourcePortId,
) {
  const brotherBlock = containerBlock.map(container =>
    container.attributes.embeds?.length > 1 &&
    container.attributes.embeds.find(item => item === targetBlock.id) &&
    container.attributes.embeds.find(item => item === sourceBlock.id)
      ? true
      : false,
  );

  const validationConection: boolean = brotherBlock.find(item => item === true)
    ? true
    : false;

  if (validationConection) {
    return true;
  }

  if (!validationConection) {
    const validatorContainerSource = containerBlock.filter(
      container => container.id === sourceBlock.id,
    );
    const validatorContainerTarget = containerBlock.filter(
      container => container.id === targetBlock.id,
    );

    if (
      validatorContainerSource.length === 0 &&
      validatorContainerTarget.length === 0
    ) {
      const externalBlockConnectionValidator = isChildren(
        containerBlock,
        targetBlock,
        sourceBlock,
      );

      return !externalBlockConnectionValidator;
    }

    const validatorContainer =
      validatorContainerSource.length > 0
        ? validatorContainerSource
        : validatorContainerTarget;

    const validatorBlockTarge =
      validatorContainer.length > 0 &&
      validatorContainer[0].changed.embeds?.find(
        item => item === targetBlock.id,
      ) &&
      true;

    const validatorBlockSource =
      validatorContainer.length > 0 &&
      validatorContainer[0].changed.embeds?.find(
        item => item === sourceBlock.id,
      ) &&
      true;

    const blockToContainerLinkValidator = validatorBlockTarge
      ? (validatorBlockTarge && isInputPort(targetBlock, targetPortId)) === true
        ? true
        : false
      : (validatorBlockSource && isInputPort(sourceBlock, sourcePortId)) ===
        true
      ? true
      : false;

    if (blockToContainerLinkValidator) {
      return true;
    } else {
      if (
        validatorBlockTarge === undefined &&
        validatorBlockSource === undefined
      ) {
        const containerToBlockLinkValidator = isChildren(
          containerBlock,
          targetBlock,
          sourceBlock,
        );

        return !containerToBlockLinkValidator;
      }
    }
    return false;
  }
}

function isChildren(containerBlock, targetBlock, sourceBlock) {
  const validator =
    containerBlock.filter(container =>
      container.attributes.embeds?.find(item => item === targetBlock.id),
    ).length > 0
      ? true
      : containerBlock.filter(container =>
          container.attributes.embeds?.find(item => item === sourceBlock.id),
        ).length > 0
      ? true
      : false;

  return validator;
}
