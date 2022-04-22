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
import fbt from 'fbt';
import {BasePresentation} from '../BasePresentation';

export default function TriggerStartIconPresentation() {
  return (
    <BasePresentation icon={TriggerStartIcon} text={fbt('Trigger Start', '')} />
  );
}
