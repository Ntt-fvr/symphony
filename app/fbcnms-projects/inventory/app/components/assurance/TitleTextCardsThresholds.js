/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    padding: '0 3rem 0.5rem 1rem',
  },
  status: {
    flexWrap: 'nowrap',
  },
  nameThreshold: {
    paddingLeft: '0.7rem',
  },
  editButton: {
    paddingLeft: '1rem',
  },
  actions: {
    flexWrap: 'nowrap',
  },
}));

function TitleTextCardsThresholds() {
  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      className={classes.root}>
      <Grid container className={classes.status} xs={2} md={3}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Enable
        </Text>

        <Text
          className={classes.nameThreshold}
          useEllipsis={true}
          color="primary"
          variant="subtitle2">
          Threshold name
        </Text>
      </Grid>
      <Grid xs={2} md={3}>
        <Text color="primary" variant="subtitle2">
          ID
        </Text>
      </Grid>
      <Grid xs={6} md={5}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Associated KPI
        </Text>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        className={classes.actions}
        xs={2}
        md={1}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Delete
        </Text>
        <Text
          useEllipsis={true}
          className={classes.editButton}
          color="primary"
          variant="subtitle2">
          Edit
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsThresholds;
