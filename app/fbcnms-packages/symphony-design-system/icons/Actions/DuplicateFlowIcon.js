/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {SvgIconStyleProps} from '../SvgIcon';

import React from 'react';
import SvgIcon from '../SvgIcon';

const EditIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M16.5263 2H5.78947C4.80526 2 4 2.81818 4 3.81818V16.5455H5.78947V3.81818H16.5263V2ZM19.2105 5.63636H9.36842C8.38421 5.63636 7.57895 6.45455 7.57895 7.45455V20.1818C7.57895 21.1818 8.38421 22 9.36842 22H19.2105C20.1947 22 21 21.1818 21 20.1818V7.45455C21 6.45455 20.1947 5.63636 19.2105 5.63636ZM19.2105 20.1818H9.36842V7.45455H19.2105V20.1818Z" />
  </SvgIcon>
);

export default EditIcon;
