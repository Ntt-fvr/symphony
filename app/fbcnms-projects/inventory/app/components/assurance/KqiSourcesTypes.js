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
import React, {useState} from 'react';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import fbt from 'fbt';
import {TitleTextCardsKqiSource} from './TitleTextCardsKqiSource';

import {KqiAddItemForm} from './KqiAddItemForm';

import KqiSourceFormEdit from './KqiSourceFormEdit';

import KqiSourcesTypeItem from './KqiSourcesTypeItem ';

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
  const [showEditCard, setShowEditCard] = useState(false);

  const showEditKqiSourceForm = () => {
    setShowEditCard(true);
  };

  if (showEditCard) {
    return (
      <KqiSourceFormEdit returnKqiSources={() => setShowEditCard(false)} />
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.titulo} item xs={12}>
          <ConfigureTitle
            title={fbt('KQI Sources', 'Counters Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={9}>
          <TitleTextCardsKqiSource />
          <List>
            <KqiSourcesTypeItem edit={() => showEditKqiSourceForm()} />
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
