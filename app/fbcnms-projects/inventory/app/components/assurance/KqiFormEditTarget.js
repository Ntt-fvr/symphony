/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

import IconButton from '@symphony/design-system/components/IconButton';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {StatusActive} from './AlarmFilteringStatus';

import Switch from './common/Switch';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 0',
  },
  formFieldStatus: {
    marginTop: '1rem',
  },
  textInput: {
    minHeight: '36px',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  reason: {
    minHeight: '100px',
  },
  status: {
    paddingTop: '40px',
  },
  time: {
    marginBottom: '20px',
  },
}));
const handleRemove = () => {
  console.log('remove');
};

const KqiFormEditTarget = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid item xs={9}>
            <Text className={classes.textTitle} variant="h6">
              {fbt(
                'KQI Catalog / TINE Retainability /SLO TTLI Customer 1',
                ' ',
              )}
            </Text>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              className={classes.delete}
              skin={'gray'}
              icon={DeleteOutlinedIcon}
              onClick={handleRemove}
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="outlined"
                    color="primary"
                    onClick={props.returnFormEdit}>
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    onClick={props.returnFormEdit}
                    className={classes.option}
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
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
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={4}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid className={classes.time} item xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
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
              <Grid container item xs={6} className={classes.status}>
                <Grid item xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    <StatusActive className={classes.formFieldStatus} />
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
export default KqiFormEditTarget;
