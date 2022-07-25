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
import UpdateWorkforceIcon from './UpdateWorkforceIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function UpdateWorkforcePresentation() {
  return (
    <BasePresentation
      icon={UpdateWorkforceIcon}
      text={<Typography variant="caption">Update Workforce</Typography>}
    />
  );
}
