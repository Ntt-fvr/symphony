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
import Select from '../../inputs/Select';
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

const ConfigurationExecuteFlow = () => {
  const flows = [
    {name: 'Flow 1', id: 'flow1'},
    {name: 'Flow 1', id: 'flow2'},
  ];

  const [configurationsValues, handleInputChange] = useForm({
    flow: '',
  });

  const {flow} = configurationsValues;

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
