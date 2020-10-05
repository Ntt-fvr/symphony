/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import * as React from 'react';
import Text from '@symphony/design-system/components/Text';
import {FLOW_STATUSES} from './AutomationFlowCard';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  statusTag: {
    borderRadius: '4px',
    display: 'inline-block',
    padding: '2px 8px',
  },
}));

// TODO: remove this when status becomes available through api i type AutomationFlowCard_flowDraft
type StatusType = 'DISABLED' | 'ENABLED' | 'ARCHIVED';

type StatusTagProps = $ReadOnly<{|
  status: StatusType,
|}>;

const StatusTag = (props: StatusTagProps) => {
  const {status} = props;
  const classes = useStyles();
  return (
    <Text
      variant="body2"
      className={classes.statusTag}
      style={{
        backgroundColor: FLOW_STATUSES[status].backgroundColor,
        color: FLOW_STATUSES[status].color,
      }}>
      {FLOW_STATUSES[status].label}
    </Text>
  );
};

export default StatusTag;
