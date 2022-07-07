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

import type {IVertexModel} from '../BaseVertext';

import * as jointJS from 'jointjs';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {
  PORTS_GROUPS,
  VERTEX_COMMON_DISPLAY,
  getInitObject,
} from '../BaseVertext';

export const TYPE = 'ForEachLoopBlock';

const FILL_COLOR = symphony.palette.AUTOMATION.VIOLET;
const HORIZONTAL_PORT_LEFT_ALIN = -33;
const HORIZONTAL_PORT_RIGHT_ALIN = -398;

const TOTAL_SIZE = 72;
const PADDING = 5;
const BORDER = 4;
const BORDER_RADIUS = 16;
const BODY_COORDINATES_REFX2 = -31;
const BODY_COORDINATES_REFY2 = 115;
const INNER_SIZE = TOTAL_SIZE - 2 * PADDING;
const RADIUS = INNER_SIZE / 2;
const INNER_CENTER = PADDING + RADIUS;

const IMAGE_SIZE = 34;
const IMAGE_CENTER = IMAGE_SIZE / 2;
const IMAGE_PADDING = INNER_CENTER - IMAGE_CENTER;
const IMAGE_COORDINATES_REFX2 = -37;
const IMAGE_COORDINATES_REFY2 = 111;

const COUPLED_FILL = 'rgb(184 194 211 / 60%)';
const BORDER_RADIUS_COUPLED = BORDER_RADIUS - 11;
const BORDER_COUPLED = 1;
const COUPLED_SIZE_WIDTH = 450;
const COUPLED_SIZE_HEIGHT = 300;
const COUPLED_REFX2 = -10;
const COUPLED_REFY2 = 1;
const COUPLED_AREA_WIDTH = 430;
const COUPLED_AREA_HEIGHT = 290;

const LABEL_COORDINATES_REFX2 = 0;
const LABEL_COORDINATES_REFY2 = 190;
const LABEL_FONT_SIZE = 12;
const LABEL_FONT_WEIGHT = 'bold';
const LABEL_STROKE_WIDTH = 0;
const LABEL_POINTER_EVENTS = 'none';

const BACKGROUND_FILL = symphony.palette.white;
const BACKGROUND_COORDINATES_REFX2 = -60;
const BACKGROUND_COORDINATES_REFY2 = 187;
const BACKGROUND_RADIUS = 7;
const BACKGROUND_WIDTH = 120;
const BACKGROUND_HEIGHT = 18;

const defaultProperties = {
  attrs: {
    ...VERTEX_COMMON_DISPLAY.attrs,
    coupled: {
      ...VERTEX_COMMON_DISPLAY.defaultAttrProps,
      strokeWidth: BORDER_COUPLED,
      fill: COUPLED_FILL,
      rx: BORDER_RADIUS_COUPLED,
      ry: BORDER_RADIUS_COUPLED,
      width: COUPLED_SIZE_WIDTH,
      height: COUPLED_SIZE_HEIGHT,
      refX2: COUPLED_REFX2,
      refY2: COUPLED_REFY2,
    },
    body: {
      ...VERTEX_COMMON_DISPLAY.defaultAttrProps,
      strokeWidth: BORDER,
      fill: FILL_COLOR,
      rx: BORDER_RADIUS,
      ry: BORDER_RADIUS,
      width: INNER_SIZE,
      height: INNER_SIZE,
      refX2: BODY_COORDINATES_REFX2,
      refY2: BODY_COORDINATES_REFY2,
    },
    image: {
      ...VERTEX_COMMON_DISPLAY.defaultAttrProps,
      xlinkHref: '/inventory/static/svg/BlockForEachLoop.svg',
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      x: IMAGE_PADDING,
      y: IMAGE_PADDING,
      refX2: IMAGE_COORDINATES_REFX2,
      refY2: IMAGE_COORDINATES_REFY2,
    },
    label: {
      ...VERTEX_COMMON_DISPLAY.defaultAttrProps,
      text: 'manual action',
      textAnchor: 'middle',
      refX2: LABEL_COORDINATES_REFX2,
      refY2: LABEL_COORDINATES_REFY2,
      fontSize: LABEL_FONT_SIZE,
      fontWeight: LABEL_FONT_WEIGHT,
      fill: symphony.palette.secondary,
      strokeWidth: LABEL_STROKE_WIDTH,
      pointerEvents: LABEL_POINTER_EVENTS,
    },
    background: {
      ...VERTEX_COMMON_DISPLAY.defaultAttrProps,
      fill: BACKGROUND_FILL,
      refX2: BACKGROUND_COORDINATES_REFX2,
      refY2: BACKGROUND_COORDINATES_REFY2,
      ry: BACKGROUND_RADIUS,
      rx: BACKGROUND_RADIUS,
      width: BACKGROUND_WIDTH,
      height: BACKGROUND_HEIGHT,
    },
  },
};
defaultProperties.attrs.label.text = `${fbt('For each loop', '')}`;

const markup = {
  markup: [
    {
      tagName: 'rect',
      selector: 'coupled',
    },
    ...VERTEX_COMMON_DISPLAY.markup,
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
  ],
};

const ForEachLoopBaseClass = jointJS.dia.Element.define(
  TYPE,
  defaultProperties,
  markup,
);

export default class ForEachLoop
  extends ForEachLoopBaseClass
  implements IVertexModel {
  constructor(id?: string) {
    super(
      getInitObject(
        FILL_COLOR,
        {
          [PORTS_GROUPS.OUTPUT]: {count: 1},
        },
        HORIZONTAL_PORT_LEFT_ALIN,
        HORIZONTAL_PORT_RIGHT_ALIN,
        id ? id : undefined,
      ),
    );
    this.resize(COUPLED_AREA_WIDTH, COUPLED_AREA_HEIGHT);
    this.embedding = true;
  }
}

export function isForEachLoop(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
