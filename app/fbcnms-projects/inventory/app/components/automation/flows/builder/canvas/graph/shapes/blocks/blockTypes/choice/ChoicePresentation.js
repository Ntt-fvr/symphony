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
import ChoiceIcon from './ChoiceIcon';
import {BasePresentation} from '../BasePresentation';
import {Typography} from '@material-ui/core';

export default function ChoicePresentation() {
  return (
    <BasePresentation
      icon={ChoiceIcon}
      text={<Typography variant="caption">Choice</Typography>}
    />
  );
}
