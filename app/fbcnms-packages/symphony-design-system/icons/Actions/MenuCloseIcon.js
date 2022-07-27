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

const MenuCloseIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M21 6L8 6L8 8L21 8L21 6ZM21 11L11 11L11 13L21 13L21 11ZM21 18L21 16L8 16L8 18L21 18ZM3 8.41L6.58 12L3 15.59L4.41 17L9.41 12L4.41 7L3 8.41Z" />
  </SvgIcon>
);

export default MenuCloseIcon;
