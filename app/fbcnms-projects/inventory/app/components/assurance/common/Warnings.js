/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import Alert from '@material-ui/lab/Alert';

import React from 'react';
import {makeStyles} from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    background: '#FEF0D8',
  },
}));

export const Warning = () => {
  const classes = useStyles();
  return (
    <Alert className={classes.root} variant="outlined" severity="warning">
      <Typography>Warning</Typography>
      <Typography>
        Are you sure the alarm filtering attributes correct?
      </Typography>
    </Alert>
  );
};

export const WarningKpi = () => {
  const classes = useStyles();
  return (
    <Alert className={classes.root} variant="outlined" severity="warning">
      <Typography>Warning</Typography>
      <Typography>
        You are deleting a KPI with Formulas attached. Are you sure you want to
        proceed?
      </Typography>
    </Alert>
  );
};
export const WarningThreshold = () => {
  const classes = useStyles();
  return (
    <Alert className={classes.root} variant="outlined" severity="warning">
      <Typography>Warning</Typography>
      <Typography>
        You are deleting a Threshold with Rules attached. Are you sure you want
        to proceed?
      </Typography>
    </Alert>
  );
};
export const WarningKqi = () => {
  const classes = useStyles();
  return (
    <Alert className={classes.root} variant="outlined" severity="warning">
      <Typography>Warning</Typography>
      <Typography>
        You are deleting a KQI with Targets attached. Are you sure you want to
        proceed?
      </Typography>
    </Alert>
  );
};
