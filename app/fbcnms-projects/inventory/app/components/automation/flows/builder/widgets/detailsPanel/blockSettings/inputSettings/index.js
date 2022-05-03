/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React, {useEffect} from 'react';
import Transform from '../../../../../../inputs/Transform';
import {Divider, Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

export default function InputSettings() {
  const strategies = [
    {name: 'Replace', id: 'replace'},
    {name: 'Merge', id: 'merge'},
  ];

  const [inputValues, handleInputChange] = useForm({
    inputTransform: false,
    inputJson: null,
    inputStrategy: '',
    stateTransform: false,
    stateJson: null,
    stateStrategy: '',
  });

  const {
    inputTransform,
    inputStrategy,
    stateTransform,
    stateStrategy,
  } = inputValues;

  useEffect(() => {
    if (inputTransform === false)
      handleInputChange({
        target: {name: 'inputStrategy', value: ''},
      });
  }, [inputTransform]);

  useEffect(() => {
    if (stateTransform === false)
      handleInputChange({
        target: {name: 'stateStrategy', value: ''},
      });
  }, [stateTransform]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={inputTransform}
          inputTransformName={'inputTransform'}
          inputTransformLabel={'Transform Input'}
          inputStrategyValue={inputStrategy}
          inputStrategyName="inputStrategy"
          inputStrategyLabel="Strategy"
          strategies={strategies}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={stateTransform}
          inputTransformName={'stateTransform'}
          inputTransformLabel={'Transform State'}
          inputStrategyValue={stateStrategy}
          inputStrategyName="stateStrategy"
          inputStrategyLabel="Strategy"
          strategies={strategies}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}
