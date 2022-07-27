/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ExecuteNetworkActionIcon from './ExecuteNetworkActionIcon';
import React from 'react';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function ExecuteNetworkActionPresentation() {
  return (
    <BasePresentation
      icon={ExecuteNetworkActionIcon}
      text={<Typography variant="caption">Execute Network Action</Typography>}
    />
  );
}
