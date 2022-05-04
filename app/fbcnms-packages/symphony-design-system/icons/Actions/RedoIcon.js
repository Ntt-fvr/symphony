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

const RedoIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M13.9661 4L12.5523 5.41421L15.5867 8.44946H10.9913C7.67685 8.44946 4.98999 11.1371 4.98999 14.4524C4.98999 17.7677 7.67685 20.4553 10.9913 20.4553H18.0153V18.4553H10.9913C8.78111 18.4553 6.98944 16.6631 6.98944 14.4524C6.98944 12.2416 8.78111 10.4495 10.9913 10.4495H15.5868L12.5523 13.4849L13.9661 14.8991L18.7072 10.1566C19.0976 9.76612 19.0976 9.13296 18.7072 8.74243L13.9661 4Z" />
  </SvgIcon>
);

export default RedoIcon;
