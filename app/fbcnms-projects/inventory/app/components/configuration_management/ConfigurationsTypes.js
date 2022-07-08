/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {PropertyType} from '../../common/PropertyType';

export const OperatorMap = Object.freeze({
  is: 'is',
  contains: 'contains',
  is_one_of: 'is_one_of',
  is_not_one_of: 'is_not_one_of',
  date_greater_than: 'date_greater_than',
  date_less_than: 'date_less_than',
});

export type Operator = $Values<typeof OperatorMap>;

export type FilterConfig = {
  key: string,
  name: string,
  entityType: EntityType,
  label: string,
  component: Object,
  defaultOperator: Operator,
  extraData?: ?Object,
};

export type FilterValue = {
  id: string,
  key: string,
  name: string,
  operator: Operator,
  stringValue?: ?string,
  idSet?: ?Array<string>,
  stringSet?: ?Array<string>,
  boolValue?: ?boolean,
  propertyValue?: ?PropertyType,
};

export type FilterProps = {|
  config: FilterConfig,
  onInputBlurred: () => void,
  onNewInputBlurred: (newValue: FilterValue) => void,
  value: FilterValue,
  editMode: boolean,
  onValueChanged: (newValue: FilterValue) => void,
  onRemoveFilter: () => void,
  title?: string,
|};

export type FiltersQuery = Array<FilterValue>;
