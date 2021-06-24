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
import {DARK} from '@symphony/design-system/theme/symphony';
import {Grid} from '@material-ui/core/';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    border: 'solid 1px black',
    padding: '9px 16px',
  },
  rooti: {
    border: 'solid 1px red',
  },
  title: {
    color: DARK.D300,
  },
});

function TitleTextCards() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs="3" className={classes.rooti}>
        <Text className={classes.title}>Counter name</Text>
      </Grid>
      <Grid item xs="4" className={classes.rooti}>
        <Text className={classes.title}>Network Manager System</Text>
      </Grid>
      <Grid
        item
        xs="3"
        justify="center"
        alignItems="center"
        className={classes.rooti}>
        <Text className={classes.title}>Vendor name</Text>
      </Grid>
      <Grid item xs="1" className={classes.rooti}>
        <Text className={classes.title}>Edit</Text>
      </Grid>
      <Grid item xs="1" className={classes.rooti}>
        <Text className={classes.title}>Delete</Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCards;
