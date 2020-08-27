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

export interface IBaseShapeAttributes {
  +id: string;
  +type: string;
}

export interface IShape {
  +id: string;
  +attributes: IBaseShapeAttributes;
}

export function getCellType(cell: ?IShape | IBaseShapeAttributes): ?string {
  if (cell == null) {
    return;
  }
  const type =
    cell.type != null
      ? cell.type
      : cell.attributes != null && cell.attributes.type != null
      ? cell.attributes.type
      : null;

  if (typeof type !== 'string') {
    return;
  }

  return type;
}
