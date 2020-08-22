/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {ChecklistCategoriesStateType} from '../checklist/ChecklistCategoriesMutateState';
import type {
  WorkOrderStatus as GraphQLWorkOrderStatus,
  WorkOrderDetails_workOrder,
} from './__generated__/WorkOrderDetails_workOrder.graphql.js';
import type {Property} from '../../common/Property';

import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import Button from '@fbcnms/ui/components/design-system/Button';
import React from 'react';
import Select from '@fbcnms/ui/components/design-system/Select/Select';
import WorkOrderDeleteButton from './WorkOrderDeleteButton';
import WorkOrderSaveButton from './WorkOrderSaveButton';
import fbt from 'fbt';
import nullthrows from '@fbcnms/util/nullthrows';
import {InventoryAPIUrls} from '../../common/InventoryAPI';
import {makeStyles} from '@material-ui/styles';
import {priorityValues, statusValues} from '../../common/FilterTypes.js';
import {useRouter} from '@fbcnms/ui/hooks';

const useStyles = makeStyles(_theme => ({
  nameHeader: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '24px',
    overflow: 'hidden',
    flexBasis: 'auto',
  },
  breadcrumbs: {
    paddingBottom: '16px',
    flexGrow: 1,
  },
  topBar: {
    width: '100%',
    display: 'flex',
  },
  editFields: {
    display: 'flex',
    flexGrow: 1,
  },
  field: {
    marginRight: '8px',
    border: '0',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteButton: {
    marginRight: '8px',
  },
  cancelButton: {
    marginRight: '8px',
  },
}));

type Props = {
  workOrderName: string,
  workOrder: WorkOrderDetails_workOrder,
  properties: Array<Property>,
  checkListCategories: ChecklistCategoriesStateType,
  locationId: ?string,
  onWorkOrderRemoved: () => void,
  onCancelClicked: () => void,
  onPriorityChanged: (value: string) => void,
  onStatusChanged: (value: GraphQLWorkOrderStatus) => void,
};

const WorkOrderHeader = (props: Props) => {
  const classes = useStyles();
  const {history} = useRouter();
  const {
    workOrderName,
    workOrder,
    properties,
    checkListCategories,
    locationId,
    onWorkOrderRemoved,
    onCancelClicked,
    onPriorityChanged,
    onStatusChanged,
  } = props;

  const skin = getSkinFromStatus(workOrder.status);

  return (
    <div className={classes.nameHeader}>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs
          breadcrumbs={[
            {
              id: 'work_orders',
              name: 'Work Orders',
              onClick: onCancelClicked,
            },
            {
              id: workOrder.project?.id ?? '',
              name: workOrder.project?.name ?? '',
              subtext: workOrder.project?.type?.name,
              onClick: () =>
                history.push(
                  InventoryAPIUrls.project(nullthrows(workOrder.project?.id)),
                ),
            },
            {
              id: workOrder.id,
              name: workOrderName,
              subtext: workOrder.workOrderType.name,
            },
          ].filter(x => !!x.id)}
          size="large"
        />
      </div>
      <div className={classes.topBar}>
        <div className={classes.editFields}>
          <Select
            className={classes.field}
            label={fbt('Priority', '')}
            options={priorityValues}
            selectedValue={workOrder.priority}
            onChange={value => onPriorityChanged(value)}
          />
          <Select
            className={classes.field}
            label={fbt('Status', '')}
            options={statusValues}
            selectedValue={workOrder.status}
            onChange={value => onStatusChanged(value)}
            skin={skin}
          />
        </div>
        <div className={classes.actionButtons}>
          <WorkOrderDeleteButton
            className={classes.deleteButton}
            workOrderId={workOrder.id}
            workOrderTypeId={workOrder.workOrderType.id}
            onWorkOrderRemoved={onWorkOrderRemoved}
          />
          <Button
            className={classes.cancelButton}
            skin="regular"
            onClick={onCancelClicked}>
            Cancel
          </Button>
          <WorkOrderSaveButton
            workOrder={workOrder}
            properties={properties}
            checkListCategories={checkListCategories}
            locationId={locationId}
          />
        </div>
      </div>
    </div>
  );
};

const getSkinFromStatus = status => {
  switch (status) {
    case 'DONE':
      return 'green';
    case 'PENDING':
      return 'orange';
    default:
      return 'regular';
  }
};

export default WorkOrderHeader;
