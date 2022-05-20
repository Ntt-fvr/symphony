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

const ConfigurationNetworkAction = () => {
  const urlMethods = [
    {name: 'GET', id: 'get'},
    {name: 'POST', id: 'post'},
    {name: 'PUT', id: 'put'},
    {name: 'DELETE', id: 'delete'},
  ];

  const [configurationsValues, handleInputChange] = useForm({
    urlMethod: '',
    connectionTimeout: 0,
  });

  const {urlMethod, connectionTimeout} = configurationsValues;

  return (
    <>
      <Grid item xs={12}>
        <Select
          label={'URL Method'}
          name={'urlMethod'}
          value={urlMethod}
          onChange={handleInputChange}
          items={urlMethods}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={'Connection Timeout'}
          type={'number'}
          name={'connectionTimeout'}
          value={connectionTimeout}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationNetworkAction;
