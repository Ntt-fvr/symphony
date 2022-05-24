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
import Tooltip from '../../inputs/Tooltip';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

export const FLOW_STATUSES = {
  UNPUBLISHED: {
    key: 'UNPUBLISHED',
    label: fbt('Unpublished', ''),
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.secondary,
  },
  PUBLISHED: {
    key: 'PUBLISHED',
    label: fbt('Published', ''),
    backgroundColor: symphony.palette.G600,
    color: symphony.palette.white,
  },
  ARCHIVED: {
    key: 'ARCHIVED',
    label: fbt('Archived', ''),
    backgroundColor: symphony.palette.D700,
    color: symphony.palette.white,
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
  },
  failingInstancesCount: {
    borderBottom: `1px solid ${symphony.palette.R600}`,
    height: 'fit-content',
    color: symphony.palette.R600,
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
  const {id, name, description, status, newInstancesPolicy, draft} = props.flow;
  const hasDraft = draft ? !draft.sameAsFlow : false;

  // TODO: when available get these from the AutomationFlowCard_flow
  const runningInstances = 1;
  const failingInstances = 1;
  const createdBy = 'Julian Huerta';
  const lastEditor = 'Adriana Lorenzano';
  const creationDate = '14/03/2022 - 09:35:20';

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
              <StatusTag status={status} />
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
              <CustomizedMenus icon={MoreVertIcon} />
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
        {failingInstances === 0 ? (
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
          Author: {createdBy}
        </Text>
        <Text variant="body1" color="gray" className={classes.smallText}>
          Last editor: {lastEditor}
        </Text>
      </div>
      <div className={classes.runningInstancesContainer}>
        <Text variant="body1" color="gray" className={classes.smallText}>
          Creation date: {creationDate}
        </Text>
        <Text variant="body1" color="gray" className={classes.smallText}>
          Edit date: {creationDate}
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
    }
  `,
});
