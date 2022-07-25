/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import type {IBlockType} from '../BaseBlockType';

import TimerPresentation from './WaitSignalPresentation';
import {BaseBlockType} from '../BaseBlockType';
import {TYPE} from '../../../../facades/shapes/vertexes/triggers/WaitSignal';

export default class WaitSignalBlockType
  extends BaseBlockType
  implements IBlockType {
  type = TYPE;
  presentationComponent = TimerPresentation;
  explanationComponent = null;
}
