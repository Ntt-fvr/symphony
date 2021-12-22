/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
export type ParametersCatalogType = {
  id: string,
  name: string,
  index: number,
  propertyCategories: Array<PropertyCategoryType>,
};

export type PropertyCategoryType = {|
  id: string,
  name: string,
  index?: ?number,
  numberOfProperties: number,
  parameterCatalogId?: number
  // isDeleted?: ?boolean,
|};
