/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {EntityConfig} from '../../../comparison_view/ComparisonViewTypes';

import PowerSearchAutomationStatusFilter from './PowerSearchAutomationStatusFilter';
import PowerSearchAutomationAuthorFilter from './PowerSearchAutomationAuthorFilter';
import PowerSearchAutomationDateFilter from './PowerSearchAutomationDateFIlter';

const AutomationFlowsSearchConfig: Array<EntityConfig> = [
  {
    type: 'automationFlows',
    label: 'Automation Flows',
    filters: [
      {
        key: 'automationFlows_status',
        name: 'status',
        entityType: 'automationFlows',
        label: 'Status',
        component: PowerSearchAutomationStatusFilter,
        defaultOperator: 'is_one_of',
      },
      {
        key: 'automationFlows_author',
        name: 'authorId',
        entityType: 'automationFlows',
        label: 'Author',
        component: PowerSearchAutomationAuthorFilter,
        defaultOperator: 'is_one_of',
      },
      {
        key: 'automationFlows_created',
        name: 'creationDate',
        entityType: 'automationFlows',
        label: 'Created Time',
        component: PowerSearchAutomationDateFilter,
        defaultOperator: 'is_one_of',
      },
    ],
  },
];

export {AutomationFlowsSearchConfig};
