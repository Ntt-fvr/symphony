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

const UndoIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M10.0353 3.99994L11.4495 5.41415L8.41421 8.44948H13.011C16.3263 8.44948 19.0139 11.1371 19.0139 14.4524C19.0139 17.7677 16.3263 20.4553 13.011 20.4553H5.98503V18.4553H13.011C15.2218 18.4553 17.0139 16.6632 17.0139 14.4524C17.0139 12.2416 15.2218 10.4495 13.011 10.4495H8.41421L11.4495 13.4848L10.0353 14.899L5.29289 10.1566C4.90237 9.76606 4.90237 9.13289 5.29289 8.74237L10.0353 3.99994Z" />
  </SvgIcon>
);

export default UndoIcon;
