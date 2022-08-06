/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {getCellType} from '../flows/builder/canvas/graph/facades/shapes/BaseShape';

describe('Suite Test Components /Shapes/ : ', () => {
  const cellMock = {
    id: '01',
    attributes: {
      id: '01',
      type: 'testType',
    },
  };
  const cellMockTypeofNumber = {
    id: '01',
    attributes: {
      id: '01',
      type: 200,
    },
  };
  test('AUT-FE-05059 Test BaseShape', () => {
    const testGetCellType = getCellType(cellMock);
    expect(testGetCellType).toStrictEqual(cellMock.attributes.type);
  });

  test('AUT-FE-05060 Test BaseShape type null', () => {
    const testGetCellType = getCellType(null);
    expect(testGetCellType).toStrictEqual(undefined);
  });

  test('AUT-FE-05061 Test BaseShape typeof number', () => {
    const testGetCellType = getCellType(cellMockTypeofNumber);
    expect(testGetCellType).toStrictEqual(undefined);
  });
});
