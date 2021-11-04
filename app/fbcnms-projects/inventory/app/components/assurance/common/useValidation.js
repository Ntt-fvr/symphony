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

export const useValidation = (
  element: any,
  name: any,
  nameExisting: string,
) => {
  return useMemo(
    () =>
      name?.some(item => item === element) && {
        error: true,
        helperText: `${nameExisting} name existing`,
      },
    [element, name, nameExisting],
  );
};
