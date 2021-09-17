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
import {BLUE} from '@symphony/design-system/theme/symphony';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 20px',
  },
  title: {
    color: BLUE.B600,
  },
  globalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  iD: {
    paddingRight: '20rem',
  },
  edit: {
    justifyContent: 'flex-end',
  },
  delete: {
    alignItems: 'center',
  },
}));

export const TitleTextCardsKqiSource = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid xs={3}>
        <Text className={classes.title} variant="subtitle2">
          KQI Source Name
        </Text>
      </Grid>
      <Grid xs={7}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.iD,
          )}
          variant="subtitle2">
          ID
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
          Delete
        </Text>
      </Grid>
      <Grid xs={1}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.delete,
          )}
          variant="subtitle2">
          Edit
        </Text>
      </Grid>
    </Grid>
  );
};
