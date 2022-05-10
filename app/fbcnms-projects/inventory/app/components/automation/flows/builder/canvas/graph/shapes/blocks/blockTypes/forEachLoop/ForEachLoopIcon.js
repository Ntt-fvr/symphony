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

const ForEachPresentation = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="violet" {...props}>
      <g transform="translate(11.000000, 11.000000)">
        <path d="M9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12Z" />
        <path d="M9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12Z" />
        <path d="M8 10V8H5.09C6.47 5.61 9.05 4 12 4C15.72 4 18.85 6.56 19.74 10H21.8C20.87 5.44 16.84 2 12 2C8.73 2 5.82 3.58 4 6.01V4H2V10H8Z" />
        <path d="M8 10V8H5.09C6.47 5.61 9.05 4 12 4C15.72 4 18.85 6.56 19.74 10H21.8C20.87 5.44 16.84 2 12 2C8.73 2 5.82 3.58 4 6.01V4H2V10H8Z" />
        <path d="M16 14V16H18.91C17.53 18.39 14.95 20 12 20C8.28001 20 5.15001 17.44 4.26001 14H2.20001C3.13001 18.56 7.16001 22 12 22C15.27 22 18.18 20.42 20 17.99V20H22V14H16Z" />
        <path d="M16 14V16H18.91C17.53 18.39 14.95 20 12 20C8.28001 20 5.15001 17.44 4.26001 14H2.20001C3.13001 18.56 7.16001 22 12 22C15.27 22 18.18 20.42 20 17.99V20H22V14H16Z" />
      </g>
    </BaseIcon>
  );
};

export default ForEachPresentation;
