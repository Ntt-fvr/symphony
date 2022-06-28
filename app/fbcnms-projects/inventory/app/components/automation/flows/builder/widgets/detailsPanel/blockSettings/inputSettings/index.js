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
    enableInputTransformation: inputSettings.enableInputTransformation || false,
    inputParamDefinitions: inputSettings.inputParamDefinitions || '',
    inputTransfStrategy: inputSettings.inputTransfStrategy || '',
    enableInputStateTransformation:
      inputSettings.enableInputStateTransformation || false,
    inputStateParamDefinitions: inputSettings.inputStateParamDefinitions || '',
    inputStateTransfStrategy: inputSettings.inputStateTransfStrategy || '',
  });

  const {
    enableInputTransformation,
    inputTransfStrategy,
    inputParamDefinitions,
    enableInputStateTransformation,
    inputStateTransfStrategy,
    inputStateParamDefinitions,
  } = inputValues;

  useEffect(() => {
    block.setInputSettings(inputValues);
  }, [inputValues]);

  useEffect(() => {
    if (enableInputTransformation === false)
      handleInputChange({
        target: {name: 'inputTransfStrategy', value: ''},
      });
  }, [enableInputTransformation]);

  useEffect(() => {
    if (enableInputStateTransformation === false)
      handleInputChange({
        target: {name: 'inputStateTransfStrategy', value: ''},
      });
  }, [enableInputStateTransformation]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={enableInputTransformation}
          inputTransformName={'enableInputTransformation'}
          inputTransformLabel={'Transform Input'}
          inputStrategyValue={inputTransfStrategy}
          inputStrategyName="inputTransfStrategy"
          inputStrategyLabel="Strategy"
          inputJsonValue={inputParamDefinitions}
          inputJsonName="inputParamDefinitions"
          strategies={strategies}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Transform
          inputTransformValue={enableInputStateTransformation}
          inputTransformName={'enableInputStateTransformation'}
          inputTransformLabel={'Transform State'}
          inputStrategyValue={inputStateTransfStrategy}
          inputStrategyName="inputStateTransfStrategy"
          inputStrategyLabel="Strategy"
          inputJsonValue={inputStateParamDefinitions}
          inputJsonName="inputStateParamDefinitions"
          strategies={strategies}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}
