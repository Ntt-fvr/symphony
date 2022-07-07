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
    label: 'Change Request',
    filters: [
      {
        key: 'changeRequest_resource',
        name: 'type',
        entityType: 'changeRequest',
        label: 'Resources Type',
        component: PowerSearchChangeRequestResourceFilter,
        defaultOperator: 'is_one_of',
      },
      {
        key: 'changeRequest_source',
        name: 'source',
        entityType: 'changeRequest',
        label: 'Change Source',
        component: PowerSearchChangeRequestSourceFilter,
        defaultOperator: 'is_one_of',
      },
      {
        key: 'changeRequest_status',
        name: 'status',
        entityType: 'changeRequest',
        label: 'Status',
        component: PowerSearchChangeRequestStatusFilter,
        defaultOperator: 'is_one_of',
      },
    ],
  }
];

export {ChangeRequestSearchConfig};
