/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowCard_flow} from './__generated__/AutomationFlowCard_flow.graphql';

import * as React from 'react';
import CustomizedMenus from '../builder/tools/MenuTopBar';
import InfoIcon from '@material-ui/icons/Info';
import Link from '@symphony/design-system/components/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StatusTag from './StatusTag';
import Text from '@symphony/design-system/components/Text';
import Tooltip from '../builder/widgets/detailsPanel/inputs/Tooltip';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {PauseCircleOutline} from '@material-ui/icons';
import CheckCircleOutlineOutlined from '@material-ui/icons/CheckCircleOutlineOutlined';
import {AllInbox} from '@material-ui/icons';
import {DriveFileRenameOutline} from '@material-ui/icons';
import moment from 'moment';

export const FLOW_STATUSES = {
  UNPUBLISHED: {
    key: 'UNPUBLISHED',
    label: fbt('Unpublished', ''),
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.secondary,
    icon: <PauseCircleOutline />,
  },
  PUBLISHED: {
    key: 'PUBLISHED',
    label: fbt('Published', ''),
    backgroundColor: symphony.palette.G600,
    color: symphony.palette.white,
    icon: <CheckCircleOutlineOutlined />,
  },
  ARCHIVED: {
    key: 'ARCHIVED',
    label: fbt('Archived', ''),
    backgroundColor: symphony.palette.gray,
    color: symphony.palette.white,
    icon: <AllInbox />,
  },
  ON_HOLD: {
    key: 'ON_HOLD',
    label: fbt('On Hold', ''),
    backgroundColor: symphony.palette.Y600,
    color: symphony.palette.secondary,
    icon: <PauseCircleOutline />,
  },
  DRAFT: {
    key: 'DRAFT',
    label: fbt('Draft', ''),
    backgroundColor: symphony.palette.B50,
    color: symphony.palette.secondary,
    icon: <DriveFileRenameOutline />,
  },
  // eslint-disable-next-line relay/no-future-added-value
  '%future added value': {
    key: '',
    label: '',
    backgroundColor: symphony.palette.white,
    color: symphony.palette.secondary,
  },
};

const useStyles = makeStyles(() => ({
  flowCard: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxWidth: '560px',
    height: '280px',
    border: `1px solid ${symphony.palette.D100}`,
    borderRadius: '4px',
    padding: '20px',
    backgroundColor: symphony.palette.white,
  },
  topPanel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  runningInstancesText: {
    fontSize: '12px',
    fontWeight: '600',
    color: symphony.palette.D800,
  },
  runningInstancesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flowName: {
    height: '48px',
    display: 'block',
    marginRight: '24px',
    color: symphony.palette.primary,
    fontWeight: '500',
  },
  statusContainer: {
    display: 'flex',
    gap: '5px',
  },
  insideContainer: {
    marginTop: '-5px',
  },
  statuses: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  draftTag: {
    marginTop: '5px',
  },
  description: {
    maxHeight: '69px',
    minHeight: '69px',
    paddingTop: '16px',
    paddingBottom: '8px',
    display: 'block',
    fontSize: '14px',
  },
  detailsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    color: symphony.palette.secondary,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${symphony.palette.D50}`,
      paddingBottom: '16px',
    },
  },
  smallText: {
    fontSize: '10px',
  },
  runningInstancesCount: {
    borderBottom: `1px solid ${symphony.palette.primary}`,
    height: 'fit-content',
    color: symphony.palette.primary,
    cursor: 'pointer',
  },
  failingInstancesCount: {
    borderBottom: `1px solid ${symphony.palette.R600}`,
    height: 'fit-content',
    color: symphony.palette.R600,
    cursor: 'pointer',
  },
  noneInstance: {
    fontSize: '12px',
  },
  instanceTextIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '& svg': {
      fontSize: '18px',
      color: '#303846',
    },
    '& svg:hover': {
      cursor: 'pointer',
    },
  },
}));

type Props = $ReadOnly<{|
  flow: AutomationFlowCard_flow,
|}>;

function AutomationFlowCard(props: Props) {
  const {
    id,
    name,
    description,
    status,
    draft,
    author,
    creationDate,
    updateTime,
    runningInstances,
    failedInstances,
  } = props.flow;
  const hasDraft = draft ? !draft.sameAsFlow : false;

  const classes = useStyles();
  const editFlowUrl = draft
    ? InventoryAPIUrls.flow(draft.id)
    : InventoryAPIUrls.flow(id);
  return (
    <div className={classes.flowCard}>
      <div>
        <div className={classes.topPanel}>
          <Link
            href={editFlowUrl}
            inNewTab={true}
            variant="h6"
            textClassName={classes.flowName}>
            {name}
          </Link>
          <div className={classes.statusContainer}>
            <div className={classes.statuses}>
              <StatusTag status={status} hasDraft={hasDraft} />
              {hasDraft && status !== FLOW_STATUSES.UNPUBLISHED.key ? (
                <Text
                  variant="caption"
                  color="gray"
                  className={classes.draftTag}>
                  <fbt desc="">Draft changes</fbt>
                </Text>
              ) : null}
            </div>
            <div className={classes.insideContainer}>
              <CustomizedMenus
                idFlow={id}
                icon={MoreVertIcon}
                name={name}
                description={description}
                editText="Here you can change the name and description of your workflow"
                duplicateText="Duplicating this workflow saves the same settings as the current workflow and will be available in the general list of workflows as a draft. Please assign a new name and description."
              />
            </div>
          </div>
        </div>
        <Text variant="body1" color="gray" className={classes.description}>
          {description}
        </Text>
      </div>
      <div className={classes.runningInstancesContainer}>
        <div className={classes.instanceTextIcon}>
          <Text variant="body1" className={classes.runningInstancesText}>
            <fbt desc="">Running instances</fbt>
          </Text>
          <Tooltip tooltip={'Triggered Flow Instances in Running state'}>
            <InfoIcon />
          </Tooltip>
        </div>
        {runningInstances === 0 ? (
          <Text variant="body1" color="gray" className={classes.noneInstance}>
            <fbt desc="">None</fbt>
          </Text>
        ) : (
          <Text
            variant="body2"
            color="light"
            className={classes.runningInstancesCount}>
            {runningInstances}
          </Text>
        )}
      </div>
      <div className={classes.runningInstancesContainer}>
        <div className={classes.instanceTextIcon}>
          <Text variant="body1" className={classes.runningInstancesText}>
            <fbt desc="">Failing instances</fbt>
          </Text>
          <Tooltip tooltip={'Triggered Flow Instances with execution errors'}>
            <InfoIcon />
          </Tooltip>
        </div>
        {failedInstances === 0 ? (
          <Text variant="body1" color="gray" className={classes.noneInstance}>
            <fbt desc="">None</fbt>
          </Text>
        ) : (
          <Text
            variant="body2"
            color="light"
            className={classes.failingInstancesCount}>
            {runningInstances}
          </Text>
        )}
      </div>
      <div className={classes.runningInstancesContainer}>
        <Text variant="body1" color="gray" className={classes.smallText}>
          {`Author: ${author.firstName} ${author.lastName}`}
        </Text>
        <Text variant="body1" color="gray" className={classes.smallText}>
          {`Last editor: ${author.firstName} ${author.lastName}`}
        </Text>
      </div>
      <div className={classes.runningInstancesContainer}>
        <Text variant="body1" color="gray" className={classes.smallText}>
          {`Creation date: ${moment(creationDate).format('YYYY-MM-DD')}`}
        </Text>
        <Text variant="body1" color="gray" className={classes.smallText}>
          {` Edit date: ${moment(updateTime).format('YYYY-MM-DD')}`}
        </Text>
      </div>
    </div>
  );
}

export default createFragmentContainer(AutomationFlowCard, {
  flow: graphql`
    fragment AutomationFlowCard_flow on Flow {
      id
      name
      description
      status
      newInstancesPolicy
      draft {
        id
        sameAsFlow
      }
      creationDate
      updateTime
      author {
        id
        firstName
        email
      }
      runningInstances
      failedInstances
    }
  `,
});
