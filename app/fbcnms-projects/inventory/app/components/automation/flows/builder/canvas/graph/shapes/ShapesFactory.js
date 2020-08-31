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

import type {IBaseShapeAttributes, IShape} from './BaseShape';
import type {IVertexModel} from './vertexes/BaseVertext';

import CreateCustomWorkorder, {
  TYPE as CreateCustomWorkorderType,
} from './vertexes/blocks/actions/CreateCustomWorkorder';
import CreateWorkorder, {
  TYPE as CreateWorkorderType,
} from './vertexes/blocks/actions/CreateWorkorder';
import Lasso, {TYPE as LassoType} from './vertexes/helpers/Lasso';
import Link from './edges/connectors/Link';
import ManualStart, {
  TYPE as ManualStartType,
} from './vertexes/blocks/administrative/ManualStart';
import nullthrows from '@fbcnms/util/nullthrows';
import {getCellType} from './BaseShape';

const VERTEXES = {
  [ManualStartType]: ManualStart,
  [CreateWorkorderType]: CreateWorkorder,
  [CreateCustomWorkorderType]: CreateCustomWorkorder,
  [LassoType]: Lasso,
};
const VERTEX_TYPES = Object.keys(VERTEXES);

export type ShapesFactory = $ReadOnly<{|
  createVertex: string => IVertexModel,
  createEdge: () => Link,
|}>;

export function isVertex(cell: ?IShape | IBaseShapeAttributes) {
  return VERTEX_TYPES.includes(getCellType(cell));
}

const shapesFactory: ShapesFactory = {
  createVertex: function (vertexType: string) {
    const VertexCtor = nullthrows(VERTEXES[vertexType]);
    return new VertexCtor();
  },
  createEdge: function () {
    return new Link();
  },
};

export default shapesFactory;
