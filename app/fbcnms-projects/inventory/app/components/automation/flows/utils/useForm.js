/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import useSideEffectCallback from '../../../admin/userManagement/utils/useSideEffectCallback';
import {isEqual} from 'lodash';
import {useEffect, useState} from 'react';

export const useForm = (propValues = {}) => {
  const [fieldValues, setFieldValues] = useState<string>({});
  useEffect(() => setFieldValues(propValues), []);

  const onValueChanged = fieldValues => {
    setFieldValues(fieldValues);
  };

  const handleInputChange = ({target}) => {
    const fieldValuesNew = {
      ...fieldValues,
      [target.name]: target.value,
    };
    setFieldValues(fieldValuesNew);
    updateOnValueChange(fieldValuesNew);
  };

  const callOnValueChanged = useSideEffectCallback(
    onValueChanged ? () => onValueChanged(fieldValues) : null,
  );
  const updateOnValueChange = updatedValues => {
    const isOnGoingChange = updatedValues != null && updatedValues != {};
    const currentValue = isOnGoingChange ? updatedValues : fieldValues;
    if (!isOnGoingChange && !isEqual(currentValue, fieldValues)) {
      setFieldValues(updatedValues);
    }
    if (isEqual(currentValue, fieldValues)) {
      return;
    }
    callOnValueChanged();
  };

  return [fieldValues, handleInputChange];
};
