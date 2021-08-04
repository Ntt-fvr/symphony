/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ConfigureTitle from './common/ConfigureTitle';
import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import fbt from 'fbt';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarCounter: {
    listStyle: 'none',
  },
  powerSearchContainer: {
    margin: '10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  titulo: {},
}));

const KqiTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.titulo} item xs={9}>
          <ConfigureTitle
            title={fbt('KQI (Key Quality Indicator) ', 'Counters Title')}
            subtitle={fbt(
              'Quality indicators and targets to be defined by users and used by service quality management processes',
              'KQI description',
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid className={classes.paper} item xs={3}>
          <h1>TABLA</h1>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiTypes;
