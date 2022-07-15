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

export default function OutputSettings({block}: Props) {
  const {outputSettings} = block;
  const strategies = [
    {name: 'Replace', id: 'REPLACE'},
    {name: 'Merge', id: 'MERGE'},
  ];

  const additionMethods = [
    {name: 'Combine', id: 'combine'},
    {name: 'Descard result', id: 'descardResult'},
  ];

  const [outputValues, handleInputChange] = useForm({
    enableOutputTransformation:
      outputSettings.enableOutputTransformation || false,
    outputParamDefinitions: outputSettings.outputParamDefinitions || '',
    outputTransfStrategy: outputSettings.outputTransfStrategy || '',
    enableOutputStateTransformation:
      outputSettings.enableOutputStateTransformation || false,
    outputStateParamDefinitions:
      outputSettings.outputStateParamDefinitions || '',
    outputStateTransfStrategy: outputSettings.outputStateTransfStrategy || '',
    addOriginal: outputSettings.addOriginal || '',
    addOriginalJson: outputSettings.addOriginalJson || '',
    additionMethod: outputSettings.additionMethod || '',
  });

  const {
    enableOutputTransformation,
    outputTransfStrategy,
    outputParamDefinitions,
    enableOutputStateTransformation,
    outputStateTransfStrategy,
    outputStateParamDefinitions,
    addOriginal,
    addOriginalJson,
    additionMethod,
  } = outputValues;

  useEffect(() => {
    block.setOutputSettings(outputValues);
  }, [outputValues]);

  useEffect(() => {
    if (enableOutputTransformation === false)
      handleInputChange({
        target: {name: 'outputTransfStrategy', value: ''},
      });
  }, [enableOutputTransformation]);

  useEffect(() => {
    if (enableOutputStateTransformation === false)
      handleInputChange({
        target: {name: 'outputStateTransfStrategy', value: ''},
      });
  }, [enableOutputStateTransformation]);

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
          inputTransformValue={enableOutputTransformation}
          inputTransformName={'enableOutputTransformation'}
          inputTransformLabel={'Transform Output'}
          inputStrategyValue={outputTransfStrategy}
          inputStrategyName={'outputTransfStrategy'}
          inputJsonValue={outputParamDefinitions}
          inputJsonName={'outputParamDefinitions'}
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
          inputTransformValue={enableOutputStateTransformation}
          inputTransformName={'enableOutputStateTransformation'}
          inputTransformLabel={'Transform State'}
          inputStrategyValue={outputStateTransfStrategy}
          inputStrategyName="outputStateTransfStrategy"
          inputStrategyLabel="Strategy"
          inputJsonValue={outputStateParamDefinitions}
          inputJsonName="outputStateParamDefinitions"
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
          inputJsonValue={addOriginalJson}
          inputJsonName="addOriginalJson"
          strategies={additionMethods}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
}
