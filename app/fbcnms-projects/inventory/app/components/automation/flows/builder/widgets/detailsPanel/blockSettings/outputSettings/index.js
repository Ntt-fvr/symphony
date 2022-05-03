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

export default function OutputSettings() {
  const strategies = [
    {name: 'Replace', id: 'replace'},
    {name: 'Merge', id: 'merge'},
  ];

  const additionMethods = [
    {name: 'Combine', id: 'combine'},
    {name: 'Descard result', id: 'descardResult'},
  ];

  const [outputValues, handleInputChange] = useForm({
    outputTransform: false,
    outputJson: null,
    outputStrategy: '',
    stateTransform: false,
    stateJson: null,
    stateStrategy: '',
    addOriginal: false,
    additionMethod: '',
  });

  const {
    outputTransform,
    outputStrategy,
    stateTransform,
    stateStrategy,
    addOriginal,
    additionMethod,
  } = outputValues;

  useEffect(() => {
    if (outputTransform === false)
      handleInputChange({
        target: {name: 'outputStrategy', value: ''},
      });
  }, [outputTransform]);

  useEffect(() => {
    if (stateTransform === false)
      handleInputChange({
        target: {name: 'stateStrategy', value: ''},
      });
  }, [stateTransform]);

  useEffect(() => {
    if (addOriginal === false)
      handleInputChange({
        target: {name: 'additionMethod', value: ''},
      });
  }, [addOriginal]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={outputTransform}
          inputTransformName={'outputTransform'}
          inputTransformLabel={'Transform Output'}
          inputStrategyValue={outputStrategy}
          inputStrategyName="outputStrategy"
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
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={addOriginal}
          inputTransformName={'addOriginal'}
          inputTransformLabel={'Add origina input to output'}
          inputStrategyValue={additionMethod}
          inputStrategyName="additionMethod"
          inputStrategyLabel="Addition Method"
          strategies={additionMethods}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}
