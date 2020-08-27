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

export type KeyValuePair = {
  [key: string]: string | number | KeyValuePair,
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
  LinkMouseHover: 'link:mouseover',
  LinkMouseDown: 'link:pointerdown',
  LinkMouseUp: 'link:pointerup',
  VertexAdded: 'add',
  VertexMouseUp: 'element:pointerup',
  VertexMouseDown: 'element:pointerdown',
  BackdropClick: 'blank:pointerclick',
  BackdropMouseDown: 'blank:pointerdown',
  BackdropMouseDrag: 'blank:pointermove',
  BackdropMouseUp: 'blank:pointerup',
};

export type GeneralEventArgs = $ReadOnly<{|
  clientX: number,
  clientY: number,
|}>;
