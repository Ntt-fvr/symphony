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
import {Grid} from '@material-ui/core';
import {StepperTimeLine} from './StepperTimeLine';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
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
  wrapperContentTimeLine: {
    height: '130px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowX: 'auto',
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
    <Grid item className={classes.root} container spacing={0}>
      <Grid item xs={12}>
        <Card className={classes.cardContainer}>
          <CardHeader className={classes.cardTitle}>Timeline</CardHeader>
          <div className={classes.wrapperContentTimeLine}>
            <StepperTimeLine />
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
