/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {BasicLocation} from '../../common/Location';
import type {
  EditWorkOrderMutationResponse,
  EditWorkOrderMutationVariables,
} from '../../mutations/__generated__/EditWorkOrderMutation.graphql';
import type {MutationCallbacks} from '../../mutations/MutationCallbacks.js';
import type {ShortUser} from '../../common/EntUtils';
import type {WorkOrderProperties} from '../map/MapUtil';

import * as React from 'react';
import DateTimeFormat from '../../common/DateTimeFormat';
import EditWorkOrderMutation from '../../mutations/EditWorkOrderMutation';
import PriorityTag from './PriorityTag';
import StatusTag from './StatusTag';
import Strings from '@fbcnms/strings/Strings';
import Text from '@symphony/design-system/components/Text';
import TextInfoSection from '../TextInfoSection';
import UserTypeahead from '../typeahead/UserTypeahead';
import fbt from 'fbt';
import nullthrows from 'nullthrows';
import symphony from '@symphony/design-system/theme/symphony';
import {InventoryAPIUrls} from '../../common/InventoryAPI';
import {Link} from 'react-router-dom';
import {closedStatus} from '../../common/FilterTypes';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  fullDetails: {
    width: '100%',
    maxWidth: '480px',
  },
  quickPeek: {
    minWidth: '157px',
  },
  notUnderlinedLink: {
    textDecoration: 'none',
  },
  unassignedLabel: {
    fontStyle: 'italic',
    lineHeight: '0px',
  },
  pills: {
    marginBottom: '24px',
  },
  statusTag: {
    marginRight: '8px',
  },
  infoSection: {
    marginBottom: '10px',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: symphony.palette.separator,
    margin: '24px 0px',
  },
}));

type Props = {
  workOrder: WorkOrderProperties,
  onWorkOrderClick?: () => void,
  displayFullDetails?: boolean,
  containerClassName?: string,
  selectedView?: string,
  onWorkOrderChanged?: (
    key: 'assigneeId' | 'installDate',
    value: ?string,
    workOrderId: string,
  ) => void,
};

const WorkOrderPopover = (props: Props) => {
  const {
    workOrder,
    displayFullDetails,
    selectedView,
    onWorkOrderChanged,
    containerClassName,
  } = props;
  const classes = useStyles();
  const viewMode =
    selectedView === 'status' || workOrder.status === closedStatus.value;

  const setWorkOrderDetails = (
    key: 'assigneeId' | 'installDate',
    value: ?string,
  ) => {
    const variables: EditWorkOrderMutationVariables = {
      input: {
        id: workOrder.id,
        name: workOrder.name,
        ownerId: workOrder.owner.id,
        status: workOrder.status,
        priority: workOrder.priority,
        assigneeId: workOrder.assignedTo?.id,
        locationId: workOrder.location?.id,
        projectId: workOrder.projectId,
      },
    };
    switch (key) {
      case 'assigneeId':
        variables.input.assigneeId = value;
        break;
      case 'installDate':
        variables.input.installDate = value;
    }
    const callbacks: MutationCallbacks<EditWorkOrderMutationResponse> = {
      onCompleted: () => {
        onWorkOrderChanged && onWorkOrderChanged(key, value, workOrder.id);
      },
    };
    EditWorkOrderMutation(variables, callbacks);
  };

  const showAssignee = (assignee: ?ShortUser) => {
    return assignee?.email || Strings.common.unassignedItem;
  };

  const nameAndCoordinates = (locationInput: BasicLocation) => {
    return `${locationInput.name} (${locationInput.latitude}, ${locationInput.longitude})`;
  };

  return (
    <div className={containerClassName}>
      {displayFullDetails ? (
        <div className={classes.fullDetails}>
          <div className={classes.pills}>
            <StatusTag
              status={workOrder.status}
              className={classes.statusTag}
            />
            <PriorityTag priority={workOrder.priority} />
          </div>
          <Link
            className={classes.notUnderlinedLink}
            to={InventoryAPIUrls.workorder(workOrder.id)}>
            <Text variant="h6" color="primary">
              {workOrder.name}
            </Text>
          </Link>
          <div className={classes.divider} />
          <TextInfoSection
            className={classes.infoSection}
            title={fbt('Assignee', '')}
            content={
              viewMode ? (
                showAssignee(workOrder.assignedTo)
              ) : (
                <UserTypeahead
                  margin="dense"
                  selectedUser={workOrder.assignedTo}
                  onUserSelection={user =>
                    setWorkOrderDetails('assigneeId', user?.id)
                  }
                />
              )
            }
          />
          {workOrder.projectName != null && (
            <TextInfoSection
              className={classes.infoSection}
              title={fbt('Project', '')}
              content={nullthrows(workOrder.projectName)}
            />
          )}
          {workOrder.description != null &&
            workOrder.description !== 'null' && (
              <TextInfoSection
                className={classes.infoSection}
                title={fbt('Description', '')}
                content={workOrder.description}
              />
            )}
          {workOrder.location != null && (
            <TextInfoSection
              className={classes.infoSection}
              title={fbt('Location', '')}
              content={nameAndCoordinates(workOrder.location)}
            />
          )}
          <TextInfoSection
            title={fbt('Due Date', '')}
            content={DateTimeFormat.dateTime(
              workOrder.installDate,
              Strings.common.emptyField,
            )}
          />
        </div>
      ) : (
        <div className={classes.quickPeek}>
          <Text variant="caption" weight="bold">
            {workOrder.name}
          </Text>
          <div>
            {workOrder.assignedTo != null ? (
              <Text variant="caption">{workOrder.assignedTo.email}</Text>
            ) : (
              <Text
                variant="subtitle2"
                className={classes.unassignedLabel}
                color="gray"
                weight="regular">
                {Strings.common.unassignedItem}
              </Text>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderPopover;
