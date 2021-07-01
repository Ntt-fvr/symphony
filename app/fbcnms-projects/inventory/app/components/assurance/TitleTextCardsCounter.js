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
import classNames from 'classnames';
import {DARK} from '@symphony/design-system/theme/symphony';
import {Grid} from '@material-ui/core/';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: '0 9px 16px',
  },
  title: {
    color: DARK.D300,
  },
  globalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  network: {
    paddingRight: '4rem',
  },
  vendor: {
    paddingRight: '3rem',
  },
  edit: {
    justifyContent: 'flex-end',
  },
  delete: {
    paddingLeft: '1rem',
  },
});

function TitleTextCardsCounter() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid xs={3}>
        <Text className={classes.title} variant="subtitle2">
          Counter name
        </Text>
      </Grid>
      <Grid xs={4}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.network,
          )}
          variant="subtitle2">
          Network Manager System
        </Text>
      </Grid>
      <Grid xs={3}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.vendor,
          )}
          variant="subtitle2">
          Vendor name
        </Text>
      </Grid>
      <Grid xs={1}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.edit,
          )}
          variant="subtitle2">
          Edit
        </Text>
      </Grid>
      <Grid xs={1}>
        <Text
          className={classNames(classes.title, classes.delete)}
          variant="subtitle2">
          Delete
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsCounter;
