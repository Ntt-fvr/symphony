/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import fbt from 'fbt';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import type {WorkOrderStatus as GraphQLStatusType} from '../components/work_orders/__generated__/WorkOrderDetails_workOrder.graphql.js';

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

export const closedStatus = {
  key: 'closed',
  value: 'CLOSED',
  label: `${fbt('Closed', '')}`,
};

export const plannedStatus = {
  key: 'planned',
  value: 'PLANNED',
  label: `${fbt('Planned', '')}`,
};

export const pendingStatus = {
  key: 'pending',
  value: 'PENDING',
  label: 'Pending',
};

export const inProgressStatus = {
  key: 'in_progress',
  value: 'IN_PROGRESS',
  label: `${fbt('In Progress', '')}`,
};

export const submittedStatus = {
  key: 'submitted',
  value: 'SUBMITTED',
  label: `${fbt('Submitted', '')}`,
};

export const blockedStatus = {
  key: 'blocked',
  value: 'BLOCKED',
  label: `${fbt('Blocked', '')}`,
};

const oldStatusValues: Array<{|
  key: string,
  value: GraphQLStatusType,
  label: string,
|}> = [plannedStatus, pendingStatus, doneStatus];

const newStatusValues: Array<{|
  key: string,
  value: GraphQLStatusType,
  label: string,
|}> = [
  plannedStatus,
  inProgressStatus,
  submittedStatus,
  closedStatus,
  blockedStatus,
];

export function useStatusValues() {
  const shouldUseNewWorkOrderStatus = useFeatureFlag('workorder_new_status');

  return shouldUseNewWorkOrderStatus
    ? {statusValues: newStatusValues, closedStatus}
    : {statusValues: oldStatusValues, closedStatus: doneStatus};
}
