/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ConfigureTitle from './common/ConfigureTitle';
import React from 'react';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import fbt from 'fbt';
import {TitleTextCardsKqiSource} from './TitleTextCardsKqiSource';

import {KqiAddItemForm} from './KqiAddItemForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarCounter: {
    listStyle: 'none',
  },
  powerSearchContainer: {
    margin: '10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  titulo: {},
}));

const KqiSourcesTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.titulo} item xs={12}>
          <ConfigureTitle
            title={fbt('KQI Sources', 'Counters Title')}
            subtitle={fbt(
              'Data sources for quality indicators',
              'KQI sources description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={9}>
          <TitleTextCardsKqiSource />
          <List>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
            <h1>lista de cards</h1>
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={3}>
          <KqiAddItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default KqiSourcesTypes;
