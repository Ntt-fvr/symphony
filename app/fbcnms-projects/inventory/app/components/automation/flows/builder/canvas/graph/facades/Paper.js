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

import type {GeneralEventArgs, Position, Rect} from './Helpers';
import type {Graph} from './Graph';
import type {
  IVertexModel,
  IVertexView,
  VertexEventCallback,
} from './shapes/vertexes/BaseVertext';
import type {LinkEventCallback} from './shapes/edges/Link';

export type Paper = $ReadOnly<{|
  model: Graph,
  getContentArea: () => Rect,
  getContentBBox: () => Rect,
  scale: (
    sx?: number,
    sy?: number,
    ox?: number,
    oy?: number,
  ) => void | {sx: number, sy: number},
  scaleContentToFit: (options?: {
    padding?:
      | number
      | {
          top?: number,
          right?: number,
          bottom?: number,
          left?: number,
        },
  }) => void,
  translate: (tx?: number, ty?: number) => void | {tx: number, ty: number},
  on: (
    string,
    PaperEventCallback | VertexEventCallback | LinkEventCallback,
  ) => void,
  options: {
    origin: Position,
  },
  clientToLocalPoint: Position => Position,
  findViewsFromPoint: Position => Array<{model: IVertexModel}>,
  findViewByModel: IVertexModel => IVertexView,
|}>;

export type PaperEventCallback = (GeneralEventArgs, number, number) => void;

export type PaperCtorType = ({
  el: HTMLElement,
  model: Graph,
  width: number | string,
  height: number | string,
  gridSize: number,
}) => Paper;
