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
import {useState} from 'react';

const data = [
  {
    value: 1,
    label: 'Administrative',
    key: 'Administrative',
  },
  {
    value: 2,
    label: 'Transport',
    key: 'Transport',
  },
  {
    value: 3,
    label: 'Ran',
    key: 'Ran',
  },
];
export const PropertyCategoryTypeSelect = () => {
  const [category, setCategory] = useState(1);

  const handleCategorySelect = data => {
    setCategory(data);
  };

  return (
    <Select
      options={data}
      onChange={handleCategorySelect}
      selectedValue={category}
    />
  );
};

export default PropertyCategoryTypeSelect;
