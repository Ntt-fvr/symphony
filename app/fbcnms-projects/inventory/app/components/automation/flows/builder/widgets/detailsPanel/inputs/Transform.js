/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import CodeEditor from './CodeEditor';
import React from 'react';
import Select from './Select';
import Switch from '@symphony/design-system/components/switch/Switch';
import {FormControlLabel, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '16.41px',
      color: '#000000',
    },
  },
}));

const Transform = ({
  inputTransformValue,
  inputTransformName,
  inputTransformLabel,
  inputStrategyValue,
  inputStrategyName,
  inputStrategyLabel,
  strategies,
  handleInputChange,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} className={classes.formLabel}>
        <FormControlLabel
          value={inputTransformValue}
          control={
            <Switch
              title=""
              checked={inputTransformValue}
              onChange={value => {
                handleInputChange({
                  target: {name: inputTransformName, value},
                });
              }}
            />
          }
          label={
            <Typography variant={'subtitle3'}>
              {' '}
              {inputTransformLabel}
            </Typography>
          }
          labelPlacement="start"
        />
      </Grid>
      {inputTransformValue && (
        <>
          <Grid item xs={12}>
            <Select
              label={inputStrategyLabel}
              name={inputStrategyName}
              value={inputStrategyValue || ''}
              onChange={handleInputChange}
              items={strategies}
            />
          </Grid>

          <Grid item xs={12}>
            <CodeEditor mode="json" />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Transform;
