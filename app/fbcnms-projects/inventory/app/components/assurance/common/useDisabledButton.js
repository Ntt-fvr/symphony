/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import {useMemo} from 'react';

export const useDisabledButton = (
  element: any,
  nombre: any,
  number: number,
) => {
  const handleDisable = useMemo(
    () =>
      !(
        Object.values(element).length === number &&
        !Object.values(element).some(item => item === '') &&
        !nombre?.some(item => item === element.name)
      ),
    [element, nombre],
  );
  return handleDisable;
};

export const useDisabledButtonEdit = (
  dataInputsObject: any,
  number: number,
) => {
  const handleDisable = useMemo(
    () =>
      !(
        dataInputsObject.length === number &&
        !dataInputsObject.some(item => item === '')
      ),
    [dataInputsObject],
  );
  return handleDisable;
};
