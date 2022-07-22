/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import InvokeRestApiIcon from './InvokeRestApiIcon';
import React from 'react';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function InvokeRestApiPresentation() {
  return (
    <BasePresentation
      icon={InvokeRestApiIcon}
      text={<Typography variant="caption">Invoke REST API</Typography>}
    />
  );
}
