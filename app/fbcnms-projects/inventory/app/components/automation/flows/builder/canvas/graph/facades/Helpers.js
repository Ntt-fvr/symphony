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

export type Primitive = string | number | Boolean;
export type KeyValuePair = {
  [key: string]: Primitive | Array<Primitive> | KeyValuePair,
};

export type Position = {|
  x: number,
  y: number,
|};

export type Size = {|
  height: number,
  width: number,
|};

export type Rect = {|
  ...Position,
  ...Size,
|};

export const Events = {
  Connector: {
    MouseHover: 'link:mouseover',
    MouseDown: 'link:pointerdown',
    MouseUp: 'link:pointerup',
  },
  Graph: {
    BlockAdded: 'add',
  },
  Block: {
    MouseUp: 'element:pointerup',
    MouseDown: 'element:pointerdown',
  },
  Paper: {
    BackdropClick: 'blank:pointerclick',
    BackdropMouseDown: 'blank:pointerdown',
    BackdropMouseDrag: 'blank:pointermove',
    BackdropMouseUp: 'blank:pointerup',
  },
};

export type GeneralEventArgs = $ReadOnly<{|
  clientX: number,
  clientY: number,
|}>;
