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
import Select from '../../../../../../inputs/Select';
import TextField from '../../../../../../inputs/TextField';
import Switch from '../../../../../../inputs/Switch';
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

const ConfigurationTriggeredStart = () => {

  const [configurationsValues, handleInputChange] = useForm({
    signalModule: '',
    blockUntilReception: false,
    signalType: ''
  });

  const { 
    signalModule,
    signalType
  } = configurationsValues;

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
        <TextField
          label={'Signal Type'}
          type={'text'}
          name={'signalType'}
          value={signalType}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationTriggeredStart;
