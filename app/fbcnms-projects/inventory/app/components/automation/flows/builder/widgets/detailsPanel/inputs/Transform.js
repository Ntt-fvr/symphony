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

type strategies = {
  name: string,
  id: string,
};
type Props = $ReadOnly<{|
  // TODO Revisar tipado
  inputTransformValue: boolean,
  inputTransformName: string,
  inputTransformLabel: string,
  inputStrategyValue: string,
  inputStrategyName: string,
  inputStrategyLabel: string,
  inputJsonValue: string,
  strategies: Array<strategies>,
  inputJsonName: string,
  handleInputChange: () => void,
|}>;

const Transform = (props: Props) => {
  const {
    inputTransformValue,
    inputTransformName,
    inputTransformLabel,
    inputStrategyValue,
    inputStrategyName,
    inputStrategyLabel,
    inputJsonValue,
    inputJsonName,
    strategies,
    handleInputChange,
  } = props;
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
            <CodeEditor
              mode="json"
              value={inputJsonValue}
              name={inputJsonName}
              onChange={handleInputChange}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Transform;
