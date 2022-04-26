/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ForEachLoopIcon from './ForEachLoopIcon';
import React from 'react';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function ForEachLoopPresentation() {
  return (
    <BasePresentation
      icon={ForEachLoopIcon}
      text={<Typography variant="caption">For each loop</Typography>}
    />
  );
}
