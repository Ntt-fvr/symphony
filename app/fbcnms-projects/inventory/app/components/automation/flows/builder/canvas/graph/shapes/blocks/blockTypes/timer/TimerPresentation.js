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
import TimerIcon from './TimerIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function TriggerStartIconPresentation() {
  return (
    <BasePresentation
      icon={TimerIcon}
      text={<Typography variant="caption">Timer</Typography>}
    />
  );
}
