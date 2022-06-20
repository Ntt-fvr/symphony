/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import ResourcePowerSearchFilter from './ResourcePowerSearchFilter';

const ResourceCriteriaConfig: Array<EntityConfig> = [
  {
    type: 'resource',
    label: 'Resource',
    filters: [
      {
        key: 'id',
        name: 'id',
        entityType: 'resource',
        label: 'Id',
        component: ResourcePowerSearchFilter,
        defaultOperator: 'is',
      },
      {
        key: 'name',
        name: 'name',
        entityType: 'resource',
        label: 'Name',
        component: ResourcePowerSearchFilter,
        defaultOperator: 'is',
      },
    ],
  },
  {
    type: 'locations',
    label: 'Location',
    filters: [],
  },
  {
    type: 'parameters',
    label: 'Parameter Selector',
    filters: [],
  },
  {
    type: 'parameterValues',
    label: 'Parameter Values',
    filters: [],
  },
];

export {ResourceCriteriaConfig};
