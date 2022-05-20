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
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

const ConfigurationForEachLoop = () => {

  const typeValues = [
    { name: 'Sequential', id: 'sequential'},
    { name: 'Parallel', id: 'parallel'}
  ] 

  const [configurationsValues, handleInputChange] = useForm({
    types: '',
  });

  const { 
    types,
  } = configurationsValues;

  return (
    <>
      <Grid item xs={12}>
        <Select
          label={'Type'}
          name={'types'}
          value={types}
          onChange={handleInputChange}
          items={typeValues}
        />
      </Grid>
    </>
  );
};

export default ConfigurationForEachLoop;
