/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Switch from '../../inputs/Switch';
import Select from '../../inputs/Select';
import TextField from '../../inputs/TextField';
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

const ConfigurationWaitForSignal = () => {
  const [configurationsValues, handleInputChange] = useForm({
    signalModule: '',
    blockUntilReception: false,
    signalType: '',
  });

  const {signalModule, blockUntilReception, signalType} = configurationsValues;

  const signalTypes = [
    {name: 'WOCreation', id: 'wo_creation'},
    {name: 'InvUpdate', id: 'in_update'},
  ];

  return (
    <>
      <Grid item xs={12}>
        <TextField
          label={'Signal Module'}
          type={'text'}
          name={'signalModule'}
          value={signalModule}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Switch
          label={'Block flow until reception'}
          name={'blockUntilReception'}
          value={blockUntilReception}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          label={'Signal Type'}
          name={'signalType'}
          value={signalType}
          onChange={handleInputChange}
          items={signalTypes}
        />
      </Grid>
    </>
  );
};

export default ConfigurationWaitForSignal;
