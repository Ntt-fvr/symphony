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
import {IVertexModel, PORTS_GROUPS, getInitObject} from '../BaseVertext';

export const ACTION_TYPE_ID = 'invoke_rest_api';
export const TYPE = 'InvokeRestAPIBlock';
const FILL_COLOR = symphony.palette.AUTOMATION.BLUE;

const ExecuteFlowBaseClass = CreateActionBaseClass({
  actionName: ACTION_TYPE_ID,
  fillColor: FILL_COLOR,
  svgPath: '/inventory/static/svg/BlockInvokeRestApi.svg',
  defaultText: `${fbt('Invoke REST API', '')}`,
  type: TYPE,
});

const TOTAL_SIZE = 72;

export default class ExecuteFlow
  extends ExecuteFlowBaseClass
  implements IVertexModel {
  constructor(id?: string) {
    super(
      getInitObject(
        FILL_COLOR,
        {
          [PORTS_GROUPS.OUTPUT]: {count: 1},
        },
        id,
      ),
    );
    this.resize(TOTAL_SIZE, TOTAL_SIZE);
  }
}

export function isExecuteFlow(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
