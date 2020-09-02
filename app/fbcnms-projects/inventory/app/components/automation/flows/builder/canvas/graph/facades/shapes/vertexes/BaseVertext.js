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

import type {GeneralEventArgs} from '../../Helpers';
import type {Graph} from '../../Graph';
import type {KeyValuePair, Position, Size} from '../../Helpers';
import type {Paper} from '../../Paper';

export type VertexDescriptor = $ReadOnly<{|
  id: string,
  position: Position,
  type: string,
|}>;

export type BaseVertexAttributes = $ReadOnly<{|
  id: string,
  position: Position,
  size: Size,
  type: string,
  z: number,
  attrs: KeyValuePair,
|}>;

export type VertexEventCallback = (
  IVertexView,
  GeneralEventArgs,
  number,
  number,
) => void;

export interface IVertexModel {
  +id: string;
  +position: (number, number) => void;
  +resize: (number, number) => void;
  +attr: KeyValuePair => void;
  +addTo: Graph => void;
  +attributes: BaseVertexAttributes;
  +remove: () => void;
  +getEmbeddedCells: () => $ReadOnlyArray<IVertexModel>;
  +embed: IVertexModel => void;
  +unembed: IVertexModel => void;
  +fitEmbeds: ({padding: number}) => void;
  +view: Paper => IVertexView;
}

export type IVertexView = $ReadOnly<{|
  model: IVertexModel,
  highlight: (?IVertexView, options?: KeyValuePair) => void,
  unhighlight: () => void,
  isSelected: boolean,
|}>;
