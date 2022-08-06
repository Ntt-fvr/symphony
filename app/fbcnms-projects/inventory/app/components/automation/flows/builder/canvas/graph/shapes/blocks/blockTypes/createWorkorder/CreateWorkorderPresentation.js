/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import CreateWorkorderIcon from './CreateWorkorderIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function CreateWorkorderPresentation() {
  return (
    <BasePresentation
      icon={CreateWorkorderIcon}
      text={<Typography variant="caption">Create Work Order</Typography>}
    />
  );
}
