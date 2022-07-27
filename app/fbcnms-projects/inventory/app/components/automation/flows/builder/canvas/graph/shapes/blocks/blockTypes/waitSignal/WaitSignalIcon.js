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

const WaitSignalIcon = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="orange" {...props}>
      <g transform="translate(12.000000, 12.000000)">
        <path d="M6 3L6.0095 8.7L9.8 12.5L6.0095 16.3095L6 22H17.4V16.3L13.6 12.5L17.4 8.7095V3H6ZM15.5 16.775V20.1H7.9V16.775L11.7 12.975L15.5 16.775Z" />
        <path d="M6 3L6.0095 8.7L9.8 12.5L6.0095 16.3095L6 22H17.4V16.3L13.6 12.5L17.4 8.7095V3H6ZM15.5 16.775V20.1H7.9V16.775L11.7 12.975L15.5 16.775Z" />
      </g>
    </BaseIcon>
  );
};

export default WaitSignalIcon;
