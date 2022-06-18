/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {EntityConfig} from '../comparison_view/ComparisonViewTypes';


import PowerSearchChangeRequestResourceFilter from './PowerSearchChangeRequestResourceFilter';
import PowerSearchChangeRequestSourceFilter from './PowerSearchChangeRequestSourceFilter';
import PowerSearchChangeRequestStatusFilter from './PowerSearchChangeRequestStatusFilter';
const ChangeRequestSearchConfig: Array<EntityConfig> = [
  {
    type: 'changeRequest',
    label: 'ChangeRequest',
    filters: [
      {
        key: 'changeRequest_resource',
        name: 'changeRequest_resource',
        entityType: 'changeRequest',
        label: 'Resources Type',
        component: PowerSearchChangeRequestResourceFilter,
        defaultOperator: 'contains',
      },
      {
        key: 'changeRequest_source',
        name: 'changeRequest_source',
        entityType: 'changeRequest',
        label: 'Change source',
        component: PowerSearchChangeRequestSourceFilter,
        defaultOperator: 'is_one_of',
      },
      {
        key: 'changeRequest_status',
        name: 'changeRequest_status',
        entityType: 'changeRequest',
        label: 'Status',
        component: PowerSearchChangeRequestStatusFilter,
        defaultOperator: 'is_one_of',
      },
    ],
  },
  {
    type: 'locations',
    label: 'Location',
    filters: [],
  },
  {
    type: 'properties',
    label: 'Properties',
    filters: [],
  },
];

export {ChangeRequestSearchConfig};
