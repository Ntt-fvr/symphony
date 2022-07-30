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

export const TYPE_LIST = [
  {name: 'Destination', id: 'DESTINATION'},
  {name: 'Origin', id: 'ORIGIN'},
];

const ConfigurationGoTo = ({block}: Props) => {
  const {settings} = block;
  const types = TYPE_LIST;
  const [goToSettingsValues, handleInputChange] = useForm(
    {
      type: settings?.type || 'ORIGIN',
    },
    block.id,
  );

  const {type} = goToSettingsValues;

  useEffect(() => {
    block.setSettings(goToSettingsValues);

    types.find(item => item.id === type)
      ? block.setPorts(block.settings?.type)
      : null;
  }, [goToSettingsValues]);

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
