/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import fbt from 'fbt';

import TextInput from '@symphony/design-system/components/Input/TextInput';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';

import Switch from './Switch';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root1: {
    background: 'red',
  },
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 0',
  },
  textInput: {
    minHeight: '36px',
  },
  addKpi: {
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '2rem',
  },
  titleButtons: {
    padding: '1rem 1rem 0 1rem',
    alignItems: 'center',
  },
}));

const AlarmFilteringFormCreate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid item xs={10}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Create Alarm Filtering', ' ')}
            </Text>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button className={classes.addKpi} skin="brightGray">
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button className={classes.addKpi}>Save</Button>
                </FormField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item xs={1}>
                <FormField label="Enabled">
                  <Switch />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label="Network Resource"
                  className={classes.formField}>
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={''}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={''}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    <TextInput className={classes.textInput} />
                  </FormField>
                </Grid>
                <Grid item xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput className={classes.textInput} />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default AlarmFilteringFormCreate;
