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

import ManualStepPresentation from './ManualStepPresentation';
import {BaseBlockType} from '../BaseBlockType';
import {TYPE} from '../../../../facades/shapes/vertexes/actions/GeneralStep';

export default class ManualStepBlockType extends BaseBlockType
  implements IBlockType {
  type = TYPE;
  presentationComponent = ManualStepPresentation;
  explanationComponent = null;
}
