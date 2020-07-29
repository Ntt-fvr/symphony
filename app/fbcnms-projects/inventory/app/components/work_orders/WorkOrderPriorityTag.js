/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {WorkOrderPriority} from '../../common/WorkOrder';

import React from 'react';
import symphony from '@fbcnms/ui/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {priorityValues} from '../../common/WorkOrder';

type Props = $ReadOnly<{|
  priority: WorkOrderPriority,
|}>;

const useStyles = makeStyles(() => ({
  root: {
    border: `solid 1px ${symphony.palette.D200}`,
    borderRadius: '4px',
    padding: '1px 8px',
    display: 'inline-block',
    background: symphony.palette.white,
  },
}));

const WorkOrderPriorityTag = (props: Props) => {
  const {priority} = props;
  const label = priorityValues.find(woPriority => woPriority.value === priority)
    ?.label;
  const classes = useStyles();

  return priority !== 'NONE' ? (
    <div className={classes.root}>{label}</div>
  ) : null;
};

export default WorkOrderPriorityTag;
