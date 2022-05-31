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

const ConfigurationGoTo = () => {
  const types = [
    {name: 'Origin', id: 'origin'},
    {name: 'Destination', id: 'destination'},
  ];

  const [configurationsValues, handleInputChange] = useForm({
    type: '',
  });

  const {type} = configurationsValues;

  return (
    <Grid item xs={12}>
      <Select
        label={'Type'}
        name={'type'}
        value={type}
        onChange={handleInputChange}
        items={types}
      />
    </Grid>
  );
};

export default ConfigurationGoTo;
