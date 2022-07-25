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

const PanToolsIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M23 5.5V20C23 22.2 21.2 24 19 24H11.7C10.62 24 9.6 23.57 8.85 22.81L1 14.83C1 14.83 2.26 13.6 2.3 13.58C2.52 13.39 2.79 13.29 3.09 13.29C3.31 13.29 3.51 13.35 3.69 13.45C3.73 13.46 8 15.91 8 15.91V4C8 3.17 8.67 2.5 9.5 2.5C10.33 2.5 11 3.17 11 4V11H12V1.5C12 0.67 12.67 0 13.5 0C14.33 0 15 0.67 15 1.5V11H16V2.5C16 1.67 16.67 1 17.5 1C18.33 1 19 1.67 19 2.5V11H20V5.5C20 4.67 20.67 4 21.5 4C22.33 4 23 4.67 23 5.5Z" />
  </SvgIcon>
);

export default PanToolsIcon;
