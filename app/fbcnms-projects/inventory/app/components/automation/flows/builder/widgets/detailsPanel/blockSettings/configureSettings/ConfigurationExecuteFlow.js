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

import * as React from 'react';
import Select from '../../inputs/Select';
import {Grid} from '@material-ui/core';
import {useEffect} from 'react';
import {useForm} from '../../../../../utils/useForm';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationExecuteFlow = ({block}: Props) => {
  const {settings} = block;
  const flows = [
    {name: 'Flow 1', id: 'flow1'},
    {name: 'Flow 1', id: 'flow2'},
  ];

  const [executeFlowSettingsValues, handleInputChange] = useForm({
    flow: settings?.flow || '',
  });

  const {flow} = executeFlowSettingsValues;

  useEffect(() => {
    block.setSettings(executeFlowSettingsValues);
  }, [executeFlowSettingsValues]);

  return (
    <Grid item xs={12}>
      <Select
        label={'Flow'}
        name={'flow'}
        value={flow}
        onChange={handleInputChange}
        items={flows}
      />
    </Grid>
  );
};

export default ConfigurationExecuteFlow;
