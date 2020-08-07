/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

export type StatusType = 'PENDING' | 'PLANNED' | 'DONE';
export type PriorityType = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export const priorityValues = [
  {
    key: 'urgent',
    value: 'URGENT',
    label: 'Urgent',
  },
  {
    key: 'high',
    value: 'HIGH',
    label: 'High',
  },
  {
    key: 'medium',
    value: 'MEDIUM',
    label: 'Medium',
  },
  {
    key: 'low',
    value: 'LOW',
    label: 'Low',
  },
  {
    key: 'none',
    value: 'NONE',
    label: 'None',
  },
];

export const prioritySortingValues = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
  NONE: 4,
};

export const doneStatus = {
  key: 'done',
  value: 'DONE',
  label: 'Done',
};

export const statusValues = [
  {
    key: 'planned',
    value: 'PLANNED',
    label: 'Planned',
  },
  {
    key: 'pending',
    value: 'PENDING',
    label: 'Pending',
  },
  doneStatus,
];
