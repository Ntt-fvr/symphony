/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {GraphContextType} from '../../canvas/graph/graphAPIContext/GraphContext';

export function resizeValidator(flow: GraphContextType, idParent: string) {
  const ORIGIN_SIZE_COUPLED = 'originSizeCoupled';
  const MEDIUM_SIZE_COUPLED = 'mediumSizeCoupled';
  const MARGIN_LEFT = 40;
  const MARGIN_TOP = 20;
  const MARGIN_POSITION_X = 120;
  const MARGIN_POSITION_Y = 120;

  const blockList = flow.getBlocks();
  const blockParent = blockList.filter(block => block.model.id === idParent);
  const childrenBlocksList = blockList.filter(block =>
    blockParent[0].model.attributes.embeds.find(el => el === block.id),
  );

  if (childrenBlocksList.length <= 4) {
    childrenBlocksList.map((children, index) => {
      if (index < 3) {
        const positionX =
          MARGIN_POSITION_X * index +
          blockParent[0].model.attributes.position.x +
          MARGIN_LEFT;
        const positionY =
          blockParent[0].model.attributes.position.y + MARGIN_TOP;
        children.setPosition(positionX, positionY);
      }

      if (index >= 3 && index < 6) {
        const newIndex = index - 3;
        const positionX =
          MARGIN_POSITION_X * newIndex +
          blockParent[0].model.attributes.position.x +
          MARGIN_LEFT;
        const positionY =
          MARGIN_POSITION_Y +
          blockParent[0].model.attributes.position.y +
          MARGIN_TOP;
        children.setPosition(positionX, positionY);
      }
    });

    blockParent[0].setSize(ORIGIN_SIZE_COUPLED);
  }

  if (childrenBlocksList.length > 4 && childrenBlocksList.length < 7) {
    const MARGIN_LEFT = 40;
    const MARGIN_TOP = 20;
    const MARGIN_POSITION_X = 170;
    const MARGIN_POSITION_Y = 120;

    childrenBlocksList.map((children, index) => {
      if (index < 2) {
        const positionX =
          MARGIN_POSITION_X * index +
          blockParent[0].model.attributes.position.x +
          MARGIN_LEFT;
        const positionY =
          blockParent[0].model.attributes.position.y + MARGIN_TOP;
        children.setPosition(positionX, positionY);
      }

      if (index >= 2 && index < 4) {
        const newIndex = index - 2;
        const positionX =
          MARGIN_POSITION_X * newIndex +
          blockParent[0].model.attributes.position.x +
          MARGIN_LEFT;
        const positionY =
          MARGIN_POSITION_Y +
          blockParent[0].model.attributes.position.y +
          MARGIN_TOP;
        children.setPosition(positionX, positionY);
      } else {
        const newIndex = index - 4;
        const positionX =
          MARGIN_POSITION_X * newIndex +
          blockParent[0].model.attributes.position.x +
          MARGIN_LEFT;
        const positionY =
          MARGIN_POSITION_Y * 2 +
          blockParent[0].model.attributes.position.y +
          MARGIN_TOP;
        children.setPosition(positionX, positionY);
      }
    });

    blockParent[0].setSize(MEDIUM_SIZE_COUPLED);
  }
}
