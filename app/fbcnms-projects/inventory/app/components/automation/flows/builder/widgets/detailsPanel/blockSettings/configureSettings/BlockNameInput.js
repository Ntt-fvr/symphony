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
import TextField from '../../inputs/TextField';
import {useForm} from '../../../../../utils/useForm';

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const BlockNameInput = ({block}: Props) => {
  const [inputValues, handleInputChange] = useForm({
    name: block.name,
  });
  const {name} = inputValues;

  return (
    <TextField
      label={'Name'}
      type={'text'}
      name={'name'}
      value={name}
      handleInputChange={event => {
        block.setName(event.target.value);
        handleInputChange(event);
      }}
    />
  );
};

export default BlockNameInput;
