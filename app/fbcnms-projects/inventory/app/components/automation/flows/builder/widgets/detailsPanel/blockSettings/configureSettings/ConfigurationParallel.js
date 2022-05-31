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
import {Grid} from '@material-ui/core';
import {useForm} from '../../../../../utils/useForm';

const ConfigurationParallel = () => {
  const [configurationsValues, handleInputChange] = useForm({
    conditioned: false,
  });

  const {conditioned} = configurationsValues;

  return (
    <>
      <Grid item xs={12}>
        <Switch
          label={'Conditioned'}
          name={'conditioned'}
          value={conditioned}
          handleInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default ConfigurationParallel;
