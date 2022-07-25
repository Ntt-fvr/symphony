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

const EditIcon = (props: SvgIconStyleProps) => (
  <SvgIcon {...props}>
    <path d="M19.5355 6.53553L16.7071 3.70711C16.3166 3.31658 15.6834 3.31658 15.2929 3.70711L13.1716 5.82843L11.7574 7.24264L5.56497 13.435L5.04643 17.0648C5.03303 17.1586 5.03303 17.2539 5.04643 17.3477C5.12453 17.8944 5.63106 18.2743 6.1778 18.1962L9.80761 17.6777L16 11.4853L17.4142 10.0711L19.5355 7.94975C19.9261 7.55922 19.9261 6.92606 19.5355 6.53553ZM7.45059 14.3778L13.1716 8.65685L14.5858 10.0711L8.8648 15.7921L7.21489 16.0278L7.45059 14.3778ZM14.5858 7.24264L16 8.65685L17.4142 7.24264L16 5.82843L14.5858 7.24264ZM20.0366 19.4143L4.03662 19.4143L4.03662 21.4143H20.0366L20.0366 19.4143Z" />
  </SvgIcon>
);

export default EditIcon;
