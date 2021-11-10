/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0  4rem 0.5rem 1rem',
  },
  globalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  titleGeneral: {
    justifyContent: 'flex-start',
  },
  accionDelete: {
    marginRight: '1rem',
  },
  action: {
    flexWrap: 'nowrap',
  },
}));

function TitleTextCardsCounter() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Counter name
        </Text>
      </Grid>
      <Grid item xs={3}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Network Manager System
        </Text>
      </Grid>
      <Grid item xs={2}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Vendor name
        </Text>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        className={classes.action}
        xs={1}>
        <Text
          className={classes.accionDelete}
          useEllipsis={true}
          color="primary"
          variant="subtitle2">
          Delete
        </Text>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Edit
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsCounter;
