/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import TrueFalseIcon from './TrueFalseIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function TrueFalsePresentation() {
  return (
    <BasePresentation
      icon={TrueFalseIcon}
      text={<Typography variant="caption">True / False</Typography>}
    />
  );
}
