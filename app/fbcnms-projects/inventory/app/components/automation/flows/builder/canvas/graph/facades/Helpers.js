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

import type {Graph} from '../facades/Graph';
import type {IShape} from './shapes/BaseShape';

export type Primitive = string | number | boolean;
export type KeyValuePair = {
  [key: string]:
    | Primitive
    | Array<Primitive>
    | KeyValuePair
    | Array<KeyValuePair>,
};

export type Position = $ReadOnly<{|
  x: number,
  y: number,
|}>;

export type PortPosition = $ReadOnly<{|
  cx?: number,
  cy?: number,
|}>;

export type Size = $ReadOnly<{|
  height: number,
  width: number,
|}>;

export type Rect = $ReadOnly<{|
  ...Position,
  ...Size,
|}>;

export type ExtendedMouseEvent = $ReadOnly<{|
  target: HTMLElement,
  originalEvent: MouseEvent,
|}> &
  MouseEvent;

export const Events = {
  Graph: {
    OnAdd: 'add',
    OnRemove: 'remove',
    OnChange: 'change',
  },
  Paper: {
    BackdropClick: 'blank:pointerclick',
    BackdropMouseDown: 'blank:pointerdown',
    BackdropMouseDrag: 'blank:pointermove',
    BackdropMouseUp: 'blank:pointerup',
  },
  Block: {
    MouseOver: 'element:mouseover',
    MouseOut: 'element:mouseout',
    MouseUp: 'element:pointerup',
    MouseDown: 'element:pointerdown',
  },
  Port: {
    MouseClick: 'element:magnet:pointerclick',
  },
  Connector: {
    MouseHover: 'link:mouseover',
    MouseDown: 'link:pointerdown',
    MouseUp: 'link:pointerup',
  },
};

export function restrictPosition(block: ?IShape, graph: Graph) {
  let parentId: string = '';

  if (block.idParent) {
    parentId = block.idParent;
  }

  if (!parentId) return;

  const parent = graph.getCell(parentId);
  const parentBlockBox = parent.getBBox();
  const blockBox = block.getBBox();

  if (parentId) {
    if (
      parentBlockBox.containsPoint(blockBox.origin()) &&
      parentBlockBox.containsPoint(blockBox.topRight()) &&
      parentBlockBox.containsPoint(blockBox.corner()) &&
      parentBlockBox.containsPoint(blockBox.bottomLeft())
    ) {
      return;
    }

    block.set('position', block.previous('position'));
  } else {
    return;
  }
}
