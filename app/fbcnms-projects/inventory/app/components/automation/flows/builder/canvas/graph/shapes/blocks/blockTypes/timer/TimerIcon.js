/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import BaseIcon from '../BaseIcon';
import React from 'react';

type Props = $ReadOnly<{|
  className?: ?string,
|}>;

const TimerIcon = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="orange" {...props}>
      <g transform="translate(12.000000, 12.000000)">
        <path d="M22 5.6998L17.4 1.7998L16.1 3.2998L20.7 7.1998L22 5.6998ZM7.9 3.3998L6.6 1.8998L2 5.6998L3.3 7.1998L7.9 3.3998ZM12.5 7.9998H11V13.9998L15.7 16.8998L16.5 15.6998L12.5 13.2998V7.9998ZM12 3.9998C7 3.9998 3 7.9998 3 12.9998C3 17.9998 7 21.9998 12 21.9998C17 21.9998 21 17.9998 21 12.9998C21 7.9998 17 3.9998 12 3.9998ZM12 19.9998C8.1 19.9998 5 16.8998 5 12.9998C5 9.0998 8.1 5.9998 12 5.9998C15.9 5.9998 19 9.0998 19 12.9998C19 16.8998 15.9 19.9998 12 19.9998Z" />
        <path d="M22 5.6998L17.4 1.7998L16.1 3.2998L20.7 7.1998L22 5.6998ZM7.9 3.3998L6.6 1.8998L2 5.6998L3.3 7.1998L7.9 3.3998ZM12.5 7.9998H11V13.9998L15.7 16.8998L16.5 15.6998L12.5 13.2998V7.9998ZM12 3.9998C7 3.9998 3 7.9998 3 12.9998C3 17.9998 7 21.9998 12 21.9998C17 21.9998 21 17.9998 21 12.9998C21 7.9998 17 3.9998 12 3.9998ZM12 19.9998C8.1 19.9998 5 16.8998 5 12.9998C5 9.0998 8.1 5.9998 12 5.9998C15.9 5.9998 19 9.0998 19 12.9998C19 16.8998 15.9 19.9998 12 19.9998Z" />
      </g>
    </BaseIcon>
  );
};

export default TimerIcon;
