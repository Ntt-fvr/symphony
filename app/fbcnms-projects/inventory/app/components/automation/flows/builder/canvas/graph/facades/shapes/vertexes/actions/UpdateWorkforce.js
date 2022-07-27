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

import CreateActionBaseClass from './CreateActionBaseClass';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {IVertexModel, getInitObject} from '../BaseVertext';
import {getActionType} from './utils';

export const ACTION_TYPE_ID = 'update_workforce';
export const TYPE = getActionType(ACTION_TYPE_ID);
const FILL_COLOR = symphony.palette.AUTOMATION.BLUE;

const UpdateWorkforceBaseClass = CreateActionBaseClass({
  actionName: ACTION_TYPE_ID,
  fillColor: FILL_COLOR,
  svgPath: '/inventory/static/svg/BlockActionUpdateWorkforce.svg',
  defaultText: `${fbt('Update Workforce', '')}`,
});

const TOTAL_SIZE = 72;

export default class UpdateWorkforce
  extends UpdateWorkforceBaseClass
  implements IVertexModel {
  constructor(id?: string) {
    super(getInitObject(FILL_COLOR, {}, id));
    this.resize(TOTAL_SIZE, TOTAL_SIZE);
  }
}

export function isUpdateWorkforce(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
