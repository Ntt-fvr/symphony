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

const GridIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M22 7V5H19V2H17V5H13V2H11V5H7V2H5V5H2V7H5V11H2V13H5V17H2V19H5V22H7V19H11V22H13V19H17V22H19V19H22V17H19V13H22V11H19V7H22ZM7 7H11V11H7V7ZM7 17V13H11V17H7ZM17 17H13V13H17V17ZM17 11H13V7H17V11Z" />
  </SvgIcon>
);

export default GridIcon;
