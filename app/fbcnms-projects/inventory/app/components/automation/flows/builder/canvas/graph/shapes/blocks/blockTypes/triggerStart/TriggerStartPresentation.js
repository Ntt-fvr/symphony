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
import TriggerStartIcon from './TriggerStartIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function TriggerStartIconPresentation() {
  return (
    <BasePresentation
      icon={TriggerStartIcon}
      text={<Typography variant="caption">Triggered</Typography>}
    />
  );
}
