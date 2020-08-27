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

import type {BaseVertexAttributes} from '../shapes/vertexes/BaseVertext';
import type {IShape} from '../shapes/BaseShape';
import type {IVertexModel} from '../shapes/vertexes/BaseVertext';
import type {LinkAttributes} from '../shapes/edges/connectors/Link';
import type {Rect} from './Helpers';

export type GraphExporter = $ReadOnly<{|
  cells: $ReadOnlyArray<BaseVertexAttributes | LinkAttributes>,
|}>;

export type Graph = $ReadOnly<{|
  toJSON: () => GraphExporter,
  findModelsInArea: Rect => Array<IVertexModel>,
  on: (string, GraphEventCallback) => void,
|}>;

export type GraphEventCallback = IShape => void;

export type GraphCtorType = () => Graph;
