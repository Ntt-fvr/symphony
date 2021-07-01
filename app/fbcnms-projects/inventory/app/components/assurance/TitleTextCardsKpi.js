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
  status: {
    paddingRight: '2rem',
  },
  kpiName: {
    justifyContent: 'flex-start',
    paddingRight: '5rem',
  },
  domain: {
    justifyContent: 'center',
    paddingRight: '16rem',
  },
  edit: {
    justifyContent: 'flex-end',
  },
  delete: {
    paddingLeft: '1rem',
  },
});

function TitleTextCardsKpi() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid xs={4} className={classes.rooti}>
        <Text
          className={classNames(classes.title, classes.status)}
          variant="subtitle2">
          Status
        </Text>

        <Text
          className={classNames(classes.title, classes.kpiName)}
          variant="subtitle2">
          KPI name
        </Text>
      </Grid>
      <Grid xs={6} className={classes.rooti}>
        <Text
          className={classNames(
            classes.title,
            classes.globalCenter,
            classes.domain,
          )}
          variant="subtitle2">
          Domain
        </Text>
      </Grid>
      <Grid xs={1} className={classes.rooti}>
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
      <Grid xs={1} className={classes.rooti}>
        <Text
          className={classNames(classes.title, classes.delete)}
          variant="subtitle2">
          Delete
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsKpi;
