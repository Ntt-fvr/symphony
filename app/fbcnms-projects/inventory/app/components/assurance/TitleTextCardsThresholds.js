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
import classNames from 'classnames';
import {DARK} from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 9px 16px',
  },
  title: {
    color: '#3984FF',
  },
  globalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  Enable: {
    paddingRight: '1rem',
  },
  id: {
    justifyContent: 'flex-start',
    paddingLeft: '70px',
  },
  associatedKPI: {
    justifyContent: 'flex-start',
    paddingLeft: '34px',
  },
  delete: {
    justifyContent: 'flex-end',
  },
  edit: {
    paddingLeft: '25px',
  },
}));

function TitleTextCardsThresholds() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid xs={2}>
        <Text
          className={classNames(classes.title, classes.Enable)}
          variant="subtitle2">
          Enable
        </Text>

        <Text className={classNames(classes.title)} variant="subtitle2">
          Threshold name
        </Text>
      </Grid>
      <Grid xs={3}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.id,
          )}
          variant="subtitle2">
          ID
        </Text>
      </Grid>
      <Grid xs={5}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.associatedKPI,
          )}
          variant="subtitle2">
          Associated KPI
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
          Delete
        </Text>
      </Grid>
      <Grid xs={1}>
        <Text
          className={classNames(classes.title, classes.edit)}
          variant="subtitle2">
          Edit
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsThresholds;
