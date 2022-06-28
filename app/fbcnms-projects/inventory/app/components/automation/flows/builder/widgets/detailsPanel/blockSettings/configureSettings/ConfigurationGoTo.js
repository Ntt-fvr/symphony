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

const ConfigurationGoTo = ({block}: Props) => {
  const {settings} = block;
  const types = [
    {name: 'Origin', id: 'origin'},
    {name: 'Destination', id: 'destination'},
  ];

  const [goToSettingsValues, handleInputChange] = useForm({
    goToType: settings?.goToType || '',
    targetBlockCid: settings?.targetBlockCid || '',
  });

  const {goToType} = goToSettingsValues;

  useEffect(() => {
    block.setSettings(goToSettingsValues);
  }, [goToSettingsValues]);

  return (
    <Grid item xs={12}>
      <Select
        label={'Type'}
        name={'goToType'}
        value={goToType}
        onChange={handleInputChange}
        items={types}
      />
    </Grid>
  );
};

export default ConfigurationGoTo;
