/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ManualStartIcon from './ManualStartIcon';
import React, {useState} from 'react';
import fbt from 'fbt';

type Props = $ReadOnly<{|
  className?: ?string,
|}>;

export default function ManualStartPresentation(props: Props) {
  const {className} = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}>
      <ManualStartIcon hovered={isHovered} />
      <fbt desc="">Start</fbt>
    </div>
  );
}
