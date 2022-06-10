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
import Transform from '../../inputs/Transform';
import {Divider, Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

export default function InputSettings({block}: Props) {
  const strategies = [
    {name: 'Replace', id: 'replace'},
    {name: 'Merge', id: 'merge'},
  ];

  const {inputSettings} = block;

  const [inputValues, handleInputChange] = useForm({
    inputTransform: inputSettings?.inputTransform || false,
    inputJson: inputSettings?.inputJson || null,
    inputStrategy: inputSettings?.inputStrategy || '',
    stateTransform: inputSettings?.stateTransform || false,
    stateJson: inputSettings?.stateJson || null,
    stateStrategy: inputSettings?.stateStrategy || '',
  });

  const {
    inputTransform,
    inputStrategy,
    inputJson,
    stateTransform,
    stateStrategy,
    stateJson,
  } = inputValues;

  useEffect(() => {
    block.setInputSettings(inputValues);
  }, [inputValues]);

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
          inputJsonValue={inputJson}
          inputJsonName="inputJson"
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
          inputJsonValue={stateJson}
          inputJsonName="stateJson"
          strategies={strategies}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}
