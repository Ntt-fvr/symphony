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

import PowerSearchExternalIDFilter from '../comparison_view/PowerSearchExternalIDFilter';
import PowerSearchParameterSelectorNameFilter from './power_search_bar/parameter_selector/PowerSearchParameterSelectorNameFilter';
import PowerSearchResourceIdFilter from './power_search_bar/resource/PowerSearchResourceIdFilter';
import PowerSearchResourceNameFilter from './power_search_bar/resource/PowerSearchResourceNameFilter';

const ResourcesSearchConfig: Array<EntityConfig> = [
  {
    type: 'resource',
    label: 'Resource',
    filters: [
      {
        key: 'resource_name',
        name: 'resource_name',
        entityType: 'resource',
        label: 'Name',
        component: PowerSearchResourceNameFilter,
        defaultOperator: 'contains',
      },
      {
        key: 'resource_id',
        name: 'resource_id',
        entityType: 'resource',
        label: 'ID',
        component: PowerSearchResourceIdFilter,
        defaultOperator: 'contains',
      },
    ],
  },
  {
    type: 'locations',
    label: 'Location',
    filters: [
      {
        key: 'location_inst_external_id',
        name: 'location_inst_external_id',
        entityType: 'locations',
        label: 'Location External ID',
        component: PowerSearchExternalIDFilter,
        defaultOperator: 'contains',
      },
    ],
  },
  {
    type: 'parameter_selector',
    label: 'Parameter Selector',
    filters: [
      {
        key: 'parameter_selector_name',
        name: 'parameter_selector_name',
        entityType: 'parameter_selector',
        label: 'Name',
        component: PowerSearchParameterSelectorNameFilter,
        defaultOperator: 'contains',
      },
    ],
  },
];

const RESOURCES_FILTERS = Object.freeze({
  NAME: 'resource_name',
  ID: 'resource_name',
});

const PARAMETER_SELECTOR_FILTERS = Object.freeze({
  NAME: 'parameter_selector_name',
  TAGS: 'parameter_selector_tags',
  PRIORITY: 'parameter_selector_priority',
});

export {ResourcesSearchConfig, RESOURCES_FILTERS, PARAMETER_SELECTOR_FILTERS};
