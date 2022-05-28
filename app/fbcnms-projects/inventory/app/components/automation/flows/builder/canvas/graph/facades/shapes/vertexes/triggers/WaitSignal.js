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

import * as jointJS from 'jointjs';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {BIG_VERTEX_COMMON_DISPLAY, getInitObject} from '../BaseVertext';
import {IVertexModel, PORTS_GROUPS} from '../BaseVertext';
import {getTriggerType} from '../actions/utils';

export const TRIGGER_TYPE_ID = 'wait-signal';
export const TYPE = getTriggerType(TRIGGER_TYPE_ID);

const FILL_COLOR = symphony.palette.AUTOMATION.ORANGE;
const TOTAL_SIZE = 72;
const PADDING = 5;
const BORDER = 4;
const INNER_SIZE = TOTAL_SIZE - 2 * PADDING;
const RADIUS = INNER_SIZE / 2;
const INNER_CENTER = PADDING + RADIUS;
const IMAGE_SIZE = 34;
const IMAGE_CENTER = IMAGE_SIZE / 2;
const IMAGE_PADDING = INNER_CENTER - IMAGE_CENTER;

const defaultProperties = {
  attrs: {
    ...BIG_VERTEX_COMMON_DISPLAY.attrs,
    body: {
      ...BIG_VERTEX_COMMON_DISPLAY.defaultAttrProps,
      strokeWidth: BORDER,
      fill: FILL_COLOR,
      r: RADIUS,
      cx: INNER_CENTER,
      cy: INNER_CENTER,
      refX2: PADDING,
    },
    image: {
      ...BIG_VERTEX_COMMON_DISPLAY.defaultAttrProps,
      xlinkHref: '/inventory/static/svg/BlockWaitSignal.svg',
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      x: IMAGE_PADDING,
      y: IMAGE_PADDING,
      refX2: PADDING,
    },
  },
};
defaultProperties.attrs.label.text = `${fbt('Wait for signal', '')}`;

const markup = {
  markup: [
    ...BIG_VERTEX_COMMON_DISPLAY.markup,
    {
      tagName: 'circle',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
  ],
};

const WaitSignalBaseClass = jointJS.dia.Element.define(
  TYPE,
  defaultProperties,
  markup,
);

export default class WaitSignal
  extends WaitSignalBaseClass
  implements IVertexModel {
  constructor(id?: string) {
    super(
      getInitObject(
        FILL_COLOR,
        {
          [PORTS_GROUPS.INPUT]: {count: 1},
        },
        id,
      ),
    );
    this.resize(TOTAL_SIZE, TOTAL_SIZE);
  }
}
