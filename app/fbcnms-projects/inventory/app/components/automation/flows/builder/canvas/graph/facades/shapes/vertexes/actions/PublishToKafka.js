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

export const TYPE = 'PublishToKafkaBlocks';
const FILL_COLOR = symphony.palette.AUTOMATION.BLUE;

const ExecuteFlowBaseClass = CreateActionBaseClass({
  actionName: '',
  fillColor: FILL_COLOR,
  svgPath: '/inventory/static/svg/BlockPublishToKafka.svg',
  defaultText: `${fbt('Publish To Kafka', '')}`,
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
