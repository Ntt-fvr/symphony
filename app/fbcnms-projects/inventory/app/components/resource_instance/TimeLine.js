/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Timeline from '@material-ui/lab/Timeline';
import {Grid} from '@material-ui/core';
import {LineTime} from './LineTime';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    // marginBottom: '30px',
    // height: '274px',
  },
  cardContainer: {
    padding: '0px',
  },
  cardTitle: {
    borderBottom: '1px solid ',
    color: 'rgba(0, 0, 0, 0.1)',
    margin: '0',
    paddingBottom: '20px',
  },
  timeline: {
    transform: 'rotate(90deg)',
    width: '0px',
    margin: '80px',
    padding: '0',
    '& .MuiTimelineItem-root': {
      minHeight: '154px',
    },
    '& .MuiTimelineItem-missingOppositeContent:before': {
      flex: '0',
      content: '""',
      padding: '0',
    },
  },
  wrapperContentTimeLine: {
    border: '1px dotted red',
    display: 'inline-block',
    minWidth: '80px',
    width: '90%',
    height: '140px',
    margin: '0 auto',
    overflow: 'hidden',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowX: 'auto',
  },
  wrapperTimeLine: {
    width: '200px',
    maxHeight: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  keypad: {
    width: '146px',
    height: '36px',
    background: '#EDF0F9',
    margin: '0 auto',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonKeypad: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'white',
  },
}));

const TimeLine = () => {
  const classes = useStyles();

  const date = '10 JUN 2022';
  const dateTime = '10 JUN 2022 14:00';

  return (
    <Grid item className={classes.root} container spacing={0}>
      <Grid item xs={12}>
        <Card className={classes.cardContainer}>
          <CardHeader className={classes.cardTitle}>Timeline</CardHeader>
          <div className={classes.wrapperContentTimeLine}>
            <div className={classes.wrapperTimeLine}>
              <Timeline className={classes.timeline} align="right">
                <LineTime date={date} dateTime={dateTime} />
                {/* <LineTime date={date} dateTime={dateTime} />
                <LineTime date={date} dateTime={dateTime} />
                <LineTime date={date} dateTime={dateTime} />
                <LineTime date={date} dateTime={dateTime} />
                <LineTime date={date} dateTime={dateTime} />
                <LineTime date={date} dateTime={dateTime} /> */}
              </Timeline>
            </div>
          </div>
          <div className={classes.keypad}>
            <IconButton
              icon={FastRewindIcon}
              className={classes.buttonKeypad}
            />
            <IconButton
              icon={SkipPreviousIcon}
              className={classes.buttonKeypad}
            />
            <IconButton icon={SkipNextIcon} className={classes.buttonKeypad} />
            <IconButton
              icon={FastForwardIcon}
              className={classes.buttonKeypad}
            />
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export {TimeLine};
