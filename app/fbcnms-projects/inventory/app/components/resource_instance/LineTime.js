/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import LensIcon from '@material-ui/icons/Lens';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  timelineContentContainer: {
    textAlign: 'center',
    flex: '0',
    padding: '0',
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
    width: 120,
    position: 'absolute',
    top: '0px',
    right: '-30px',
    color: '#73839E',
  },

  timelineIcon: {
    fontSize: '14px',
  },
  lineConector: {
    border: '1px solid',
    color: '#3984FF',
  },
}));
const TooltipTime = withStyles(() => ({
  tooltip: {
    backgroundColor: 'blue',
    color: 'white',
    maxWidth: 220,
    fontSize: '12px',
    width: '125px',
    position: 'absolute',
    top: '-45px',
    left: '-55px',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '20px',
      left: '45px',
      borderTop: '10px solid blue',
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderBottom: '10px solid transparent',
    },
  },
}))(Tooltip);

type Props = $ReadOnly<{|
  date: string,
  dateTime: string,
|}>;

const LineTime = (props: Props) => {
  const classes = useStyles();
  const {date, dateTime} = props;
  return (
    <div>
      <TimelineItem>
        <TimelineSeparator>
          <TooltipTime arrow={false} placement="top" title={dateTime}>
            <LensIcon color="primary" className={classes.timelineIcon} />
          </TooltipTime>
          <TimelineConnector className={classes.lineConector} />
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContentContainer}>
          <Text variant={'body2'} className={classes.timelineContent}>
            {date}
          </Text>
        </TimelineContent>
      </TimelineItem>
    </div>
  );
};

export {LineTime};
