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

const ParallelPresentation = (props: Props) => {
  return (
    <BaseIcon shape="circle" color="violet" {...props}>
      <g transform="translate(11.000000, 11.000000)">
        <path d="M4 22H2V2H4V22ZM22 2H20V22H22V2ZM13.5 7H10.5V17H13.5V7Z" />
        <path d="M4 22H2V2H4V22ZM22 2H20V22H22V2ZM13.5 7H10.5V17H13.5V7Z" />
      </g>
    </BaseIcon>
  );
};

export default ParallelPresentation;
