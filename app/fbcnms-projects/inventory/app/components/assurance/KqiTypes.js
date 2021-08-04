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
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import KqiFormCreate from './KqiFormCreate';
import KqiFormEdit from './KqiFormEdit';

import Button from '@symphony/design-system/components/Button';
import KqiTable from './KqiTable';
import fbt from 'fbt';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  addKpi: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    paddingTop: '2rem',
  },
  buttonAdd: {
    padding: '0 2rem',
  },
}));

const KqiTypes = () => {
  const classes = useStyles();
  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);

  function handleClick() {
    setShowFormCreate(true);
  }

  if (showFormCreate) {
    return <KqiFormCreate returnTableKqi={() => setShowFormCreate(false)} />;
  }

  function formEdit() {
    setShowFormEdit(true);
  }

  if (showFormEdit) {
    return <KqiFormEdit returnTableKqi={() => setShowFormEdit(false)} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <ConfigureTitle
            title={fbt('KQI (Key Quality Indicator) ', 'KQI Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description',
            )}
          />
        </Grid>
        <Grid className={classes.addKpi} item xs={1}>
          <Button onClick={handleClick} className={classes.buttonAdd}>
            Add KQI
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.titulo} container spacing={2}>
        <Grid className={classes.paper} item xs={12}>
          <KqiTable viewFormEdit={formEdit} />
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiTypes;
