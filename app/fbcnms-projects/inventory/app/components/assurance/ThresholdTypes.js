/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddThresholdItemForm from './AddThresholdItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ThresholdTypeItem from './ThresholdTypeItem';
import TitleTextCardsThresholds from './TitleTextCardsThresholds';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const ThresholdTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
            title={fbt('Thresholds', 'Threshold Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Threshold description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <TitleTextCardsThresholds />
          <ThresholdTypeItem />
          <ThresholdTypeItem />
          <ThresholdTypeItem />
          <ThresholdTypeItem />
          <ThresholdTypeItem />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddThresholdItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ThresholdTypes;
