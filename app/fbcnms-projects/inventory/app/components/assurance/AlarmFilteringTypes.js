/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import PowerSearchBar from '../power_search/PowerSearchBar';

import fbt from 'fbt';

import ConfigureTitle from './common/ConfigureTitle';

const useStyles = makeStyles(() => ({
  root: {
    margin: '40px',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '0 3.5rem',
  },
}));

const AlarmFilteringTypes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConfigureTitle
            title={fbt('Alarm Filtering', 'Alarm Filtering Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description ',
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <PowerSearchBar
            placeholder="Alarm Filter"
            filterConfigs={[]}
            searchConfig={[]}
            filterValues={[]}
            savedSearches={[]}
            onFiltersChanged={filters => []}
            getSelectedFilter={(filterConfig: prueba) => []}
            exportPath={'/alarm_filtering'}
            entity={'%future added value'}
          />
        </Grid>
        <Grid className={classes.addButton} item xs={2}>
          <FormField>
            <Button className={classes.button}>Add Alarm Filtering</Button>
          </FormField>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlarmFilteringTypes;
