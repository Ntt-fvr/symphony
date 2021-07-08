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
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme =>({
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
  Enable: {
    paddingRight: '1rem',
  },
  id: {
    justifyContent: 'flex-start',
    paddingLeft: '2.5rem',
  },
  associatedKPI: {
    justifyContent: 'flex-start',
    paddingLeft: '5rem',
  },
  edit: {
    justifyContent: 'flex-end',
  },
  delete: {
    paddingLeft: '1rem',
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
export default TitleTextCardsThresholds;
