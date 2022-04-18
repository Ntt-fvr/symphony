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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import IconButton from '@symphony/design-system/components/IconButton';
import LensIcon from '@material-ui/icons/Lens';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Text from '@symphony/design-system/components/Text';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
// import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye'; ARO

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    marginBottom: '30px',
    width: '961px',
    height: '274px',
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
  timelineContentContainer: {
    textAlign: 'center',
    // '& .MuiTimelineContent-root': {
    flex: '0',
    padding: '0',
    // },
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
    width: 120,
    // border: '1px solid red',
    position: 'absolute',
    top: '0px',
    right: '-30px',
    color: '#73839E',
  },
  timelineIcon: {
    fontSize: '14px',
    // transform: 'rotate(-90deg)',
  },
  lineConector: {
    border: '1px solid',
    color: '#3984FF',
  },
  wrapperContentTimeLine: {
    // border: '1px solid blue',
    display: 'inline-block',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '780px',
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
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

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid item xs={12}>
        <Card className={classes.cardContainer}>
          <CardHeader className={classes.cardTitle}>Timeline</CardHeader>
          <div className={classes.wrapperContentTimeLine}>
            <div className={classes.wrapperTimeLine}>
              <Timeline className={classes.timeline} align="right">
                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      0 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      1 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      2 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      3 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      4 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <LensIcon
                      color="primary"
                      className={classes.timelineIcon}
                    />
                    <TimelineConnector className={classes.lineConector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Text variant={'body2'} className={classes.timelineContent}>
                      5 Nov 2022
                    </Text>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
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
              <IconButton
                icon={SkipNextIcon}
                className={classes.buttonKeypad}
              />
              <IconButton
                icon={FastForwardIcon}
                className={classes.buttonKeypad}
              />
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export {TimeLine};
