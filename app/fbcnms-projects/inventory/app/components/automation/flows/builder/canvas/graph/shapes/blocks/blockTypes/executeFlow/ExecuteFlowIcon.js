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

const ExecuteFlowIcon = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="blue" {...props}>
      <g transform="translate(12.000000, 12.000000)">
        <path d="M6.2 3.01C4.44 2.89 3 4.42 3 6.19V16C3 18.76 5.24 21 8 21C10.76 21 13 18.76 13 16V8C13 6.34 14.34 5 16 5C17.66 5 19 6.34 19 8V15H18.17C16.56 15 15.11 16.18 15 17.79C14.88 19.48 16.16 20.89 17.8 21C19.56 21.12 21 19.58 21 17.82V8C21 5.24 18.76 3 16 3C13.24 3 11 5.24 11 8V16C11 17.66 9.66 19 8 19C6.34 19 5 17.66 5 16V9H5.83C7.44 9 8.89 7.82 9 6.21C9.11 4.53 7.83 3.11 6.2 3.01Z" />
        <path d="M6.2 3.01C4.44 2.89 3 4.42 3 6.19V16C3 18.76 5.24 21 8 21C10.76 21 13 18.76 13 16V8C13 6.34 14.34 5 16 5C17.66 5 19 6.34 19 8V15H18.17C16.56 15 15.11 16.18 15 17.79C14.88 19.48 16.16 20.89 17.8 21C19.56 21.12 21 19.58 21 17.82V8C21 5.24 18.76 3 16 3C13.24 3 11 5.24 11 8V16C11 17.66 9.66 19 8 19C6.34 19 5 17.66 5 16V9H5.83C7.44 9 8.89 7.82 9 6.21C9.11 4.53 7.83 3.11 6.2 3.01Z" />
      </g>
    </BaseIcon>
  );
};

export default ExecuteFlowIcon;
