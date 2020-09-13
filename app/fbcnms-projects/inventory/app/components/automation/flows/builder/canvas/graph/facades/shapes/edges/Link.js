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

import type {GeneralEventArgs, Position} from '../../Helpers';
import type {Graph} from '../../Graph';
import type {IBaseShapeAttributes, IShape} from '../../shapes/BaseShape';
import type {IVertexModel} from '../../shapes/vertexes/BaseVertext';
import type {KeyValuePair} from '../../Helpers';

import type {Paper} from '../../Paper';

import * as jointJS from 'jointjs';
import {getCellType} from '../BaseShape';

export const TYPE = 'standard.Link';

export type LinkAttributes = $ReadOnly<{|
  id: string,
  source: IVertexModel,
  target: IVertexModel,
  type: 'standard.Link',
  z: number,
|}>;

export interface ILink {
  +id: string;
  +attributes: LinkAttributes;
  +source: (?IVertexModel) => void;
  +target: (?IVertexModel | ?Position) => void;
  +addTo: Graph => void;
  +router: (string, KeyValuePair) => void;
  +getTargetElement: () => ?IVertexModel;
  +attr: KeyValuePair => void;
  +remove: () => void;
}

export type LinkDescriptor = $ReadOnly<{|
  id: string,
  sourceId: ?string,
  targetId: ?string,
|}>;

const Link = jointJS.shapes.standard.Link;
export default Link;

export function isLink(cell: ?IShape | IBaseShapeAttributes): boolean {
  return getCellType(cell) === TYPE;
}

export type LinkEventArgs = $ReadOnly<{|
  model: Link,
  paper: Paper,
|}>;

export type LinkEventCallback = (
  LinkEventArgs,
  GeneralEventArgs,
  number,
  number,
) => void;
