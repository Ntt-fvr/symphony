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
    padding: '0  25px 10px 15px',
  },
}));

function TitleTextCardsRelationships() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={11}>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Resources Name
        </Text>
      </Grid>
      <Grid container alignItems="center" justify="center" xs={1} item>
        <Text useEllipsis={true} color="primary" variant="subtitle2">
          Delete
        </Text>
      </Grid>
    </Grid>
  );
}
export {TitleTextCardsRelationships};
