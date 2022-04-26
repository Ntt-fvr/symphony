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

const InvokeRestApiIcon = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="blue" {...props}>
      <g transform="translate(12.000000, 12.000000)">
        <path d="M13.8182 12L12 13.8182L10.1818 12L12 10.1818L13.8182 12ZM12 6.54545L13.9273 8.47273L16.2 6.2L12 2L7.8 6.2L10.0727 8.47273L12 6.54545ZM6.54545 12L8.47273 10.0727L6.2 7.8L2 12L6.2 16.2L8.47273 13.9273L6.54545 12ZM17.4545 12L15.5273 13.9273L17.8 16.2L22 12L17.8 7.8L15.5273 10.0727L17.4545 12ZM12 17.4545L10.0727 15.5273L7.8 17.8L12 22L16.2 17.8L13.9273 15.5273L12 17.4545Z" />
        <path d="M13.8182 12L12 13.8182L10.1818 12L12 10.1818L13.8182 12ZM12 6.54545L13.9273 8.47273L16.2 6.2L12 2L7.8 6.2L10.0727 8.47273L12 6.54545ZM6.54545 12L8.47273 10.0727L6.2 7.8L2 12L6.2 16.2L8.47273 13.9273L6.54545 12ZM17.4545 12L15.5273 13.9273L17.8 16.2L22 12L17.8 7.8L15.5273 10.0727L17.4545 12ZM12 17.4545L10.0727 15.5273L7.8 17.8L12 22L16.2 17.8L13.9273 15.5273L12 17.4545Z" />
      </g>
    </BaseIcon>
  );
};

export default InvokeRestApiIcon;
