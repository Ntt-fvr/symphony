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
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  cardContainer: {
    padding: '0px',
  },
  cardTitle: {
    borderBottom: '1px solid red',
    margin: '0',
    paddingBottom: '20px',
  },
  timeline: {
    transform: 'rotate(90deg)',
    width: '0px',
    margin: '0',
    padding: '0',
    '& .MuiTimelineItem-root': {
      minHeight: '125px',
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
    minWidth: 50,
  },
  timelineIcon: {
    transform: 'rotate(-90deg)',
  },
  lineConector: {
    border: '1px solid red',
  },
  wrapperTimeLine: {
    border: '1px solid blue',
    display: 'flex',
    alignItems: 'end',
    width: '300px',
    height: '200px',
    margin: '0 auto',
  },
}));

const TimeLine = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid item xs={12}>
        <Card className={classes.cardContainer}>
          <CardHeader className={classes.cardTitle}>
            Configuration parameters
          </CardHeader>
          <div className={classes.wrapperTimeLine}>
            <Timeline className={classes.timeline} align="right">
              {/**inicio */}
              <TimelineItem>
                <TimelineSeparator>
                  <CheckCircleOutlineIcon
                    color="primary"
                    className={classes.timelineIcon}
                  />
                  <TimelineConnector className={classes.lineConector} />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}>
                  <Paper className={classes.timelineContent}>
                    <Typography>Eat</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              {/**fin */}
              {/**inicio */}
              <TimelineItem>
                <TimelineSeparator>
                  <CheckCircleOutlineIcon
                    color="primary"
                    className={classes.timelineIcon}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}>
                  <Typography className={classes.timelineContent}>
                    Code
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              {/**fin */}
              {/**iicio */}
              <TimelineItem>
                <TimelineSeparator>
                  <CheckCircleOutlineIcon
                    color="primary"
                    className={classes.timelineIcon}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}>
                  <Typography className={classes.timelineContent}>
                    Code
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              {/**fin */}
              {/**iicio */}
              <TimelineItem>
                <TimelineSeparator>
                  <CheckCircleOutlineIcon
                    color="primary"
                    className={classes.timelineIcon}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}>
                  <Typography className={classes.timelineContent}>
                    Code
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              {/**fin */}
            </Timeline>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export {TimeLine};

/**
 * <TimelineItem>
              <TimelineSeparator>
                <PauseCircleFilledIcon
                  color="primary"
                  className={classes.timelineIcon}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent}>
                  <Typography>Code</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <CachedIcon color="primary" className={classes.timelineIcon} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent}>
                  <Typography>Sleep</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <CachedIcon color="primary" className={classes.timelineIcon} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent}>
                  <Typography>Repeat</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <ErrorIcon color="primary" className={classes.timelineIcon} />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent}>
                  <Typography>Sleep</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
 * 
 */
