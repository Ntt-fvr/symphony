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
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    padding: '0 3rem 0.5rem 1rem',
  },
  title: {
    color: '#3984FF',
  },
  name: {
    paddingLeft: '0.7rem',
    color: '#3984FF',
  },
  globalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },

  vendor: {
    paddingRight: '3rem',
  },

  edit: {
    paddingLeft: '0.5rem',
  },
  status: {
    flexWrap: 'nowrap',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function TitleTextCardsKpi() {
  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      className={classes.root}>
      <Grid container className={classes.status} xs={2}>
        <Text className={classes.title} variant="subtitle2">
          Status
        </Text>
        <Text useEllipsis={true} className={classes.name} variant="subtitle2">
          Kpi name
        </Text>
      </Grid>
      <Grid xs={2} md={3}>
        <Text className={classes.title} variant="subtitle2">
          Domain
        </Text>
      </Grid>
      <Grid xs={6} md={5} xl={6}>
        <Text className={classes.title} variant="subtitle2">
          Category
        </Text>
      </Grid>
      <Grid className={classes.actions} xs={2} md={2} xl={1}>
        <Text useEllipsis={true} className={classes.title} variant="subtitle2">
          Delete
        </Text>
        <Text
          useEllipsis={true}
          className={classNames(classes.title, classes.edit)}
          variant="subtitle2">
          Edit
        </Text>
      </Grid>
    </Grid>
  );
}
export default TitleTextCardsKpi;
