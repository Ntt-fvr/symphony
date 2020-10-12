/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import EndIcon from './EndIcon';
import React, {useState} from 'react';
import fbt from 'fbt';

type Props = $ReadOnly<{|
  className?: ?string,
|}>;

export default function EndPresentation(props: Props) {
  const {className} = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}>
      <EndIcon hovered={isHovered} />
      <fbt desc="">End</fbt>
    </div>
  );
}
