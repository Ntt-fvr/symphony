/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {IBlock} from '../../../../canvas/graph/shapes/blocks/BaseBlock';

import React, {useEffect} from 'react';
import Select from '../../inputs/Select';
import Switch from '@symphony/design-system/components/switch/Switch';
import TextField from '../../inputs/TextField';
import {Divider, FormControlLabel, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
    },
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

export default function ErrorHandlingSettings({block}: Props) {
  const {errorSettings} = block;
  const classes = useStyles();
  const unitsPolicy = [
    {name: 'Seconds', id: 'seconds'},
    {name: 'Minutes', id: 'minutes'},
    {name: 'Hours', id: 'hours'},
  ];
  const [inputValues, handleInputChange] = useForm({
    enableRetryPolicy: errorSettings?.enableRetryPolicy || false,
    retryInterval: errorSettings?.retryInterval || '',
    units: errorSettings?.units || '',
    maxAttemps: errorSettings?.maxAttemps || '',
    backoffRate: errorSettings?.backoffRate || '',
    errorCatching: errorSettings?.errorCatching || false,
  });

  useEffect(() => {
    block.setErrorSettings(inputValues);
  }, [inputValues]);

  const {
    enableRetryPolicy,
    retryInterval,
    units,
    maxAttemps,
    backoffRate,
    errorCatching,
  } = inputValues;

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} className={classes.formLabel}>
            <FormControlLabel
              value={enableRetryPolicy}
              control={
                <Switch
                  title=""
                  checked={enableRetryPolicy}
                  onChange={value => {
                    handleInputChange({
                      target: {name: 'enableRetryPolicy', value},
                    });
                  }}
                />
              }
              label={
                <Typography variant={'body2'}> {'Retry Policy'}</Typography>
              }
              labelPlacement="start"
            />
          </Grid>
          {enableRetryPolicy && (
            <>
              <Grid item xs={6}>
                <TextField
                  label={'Retry Interval'}
                  type={'number'}
                  name={'retryInterval'}
                  value={retryInterval}
                  handleInputChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  label={'Units'}
                  name={'units'}
                  value={units || ''}
                  onChange={handleInputChange}
                  items={unitsPolicy}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={'Max Attemps'}
                  type={'number'}
                  name={'maxAttemps'}
                  value={maxAttemps}
                  handleInputChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={'Backoff rate'}
                  type={'number'}
                  name={'backoffRate'}
                  value={backoffRate}
                  handleInputChange={handleInputChange}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} className={classes.formLabel}>
        <FormControlLabel
          value={errorCatching}
          control={
            <Switch
              title=""
              checked={errorCatching}
              onChange={value => {
                handleInputChange({
                  target: {name: 'errorCatching', value},
                });
              }}
            />
          }
          label={<Typography variant={'body2'}>{'Error Catching'}</Typography>}
          labelPlacement="start"
        />
      </Grid>
    </Grid>
  );
}
