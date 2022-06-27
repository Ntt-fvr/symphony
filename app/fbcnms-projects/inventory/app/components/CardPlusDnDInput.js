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
import Select from '@symphony/design-system/components/Select/Select';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {useMemo} from 'react';

const TYPES = {
  enum: 'select',
  string: 'string',
  int: 'int',
  float: 'float',
};

const CardPlusDnDInput = ({
  index,
  item,
  onChange,
  classes,
  autoFocus,
  placeholder,
}) => {
  const type = useMemo(() => {
    return TYPES[item.parameterType?.type];
  }, [item]);

  const options = useMemo(() => {
    if (type === TYPES.enum) {
      return JSON.parse(item.parameterType.stringValue).map(o => {
        return {
          value: o,
          label: o,
          key: o,
        };
      });
    }
  }, [type, item]);

  if (type === TYPES.enum) {
    return (
      <Select
        placeholder={placeholder}
        options={options}
        selectedValue={item.newValue}
        size="full"
        onChange={selected => onChange(index, item, selected)}
      />
    );
  }

  return (
    <TextInput
      autoFocus={autoFocus}
      placeholder={placeholder}
      autoComplete="off"
      value={item.newValue}
      className={classes.input}
      type={type === TYPES.int || type === TYPES.float ? 'number' : 'text'}
      step={type === TYPES.float ? '0.01' : '1'}
      onChange={e => onChange(index, item, e.target.value)}
    />
  );
};

export default CardPlusDnDInput;
