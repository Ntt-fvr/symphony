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

import type {IVertexModel} from '../../BaseVertext';
import type {Paper} from '../../../../facades/Paper';

import * as jointJS from 'jointjs';
import symphony from '@fbcnms/ui/theme/symphony';

export const TYPE = 'administrative.ManualStart';

const RADIUS = 20;

const ManualStartBaseClass = jointJS.dia.Element.define(
  TYPE,
  {
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 2,
        stroke: '#000000',
        fill: symphony.palette.primary,
        r: RADIUS,
        cx: RADIUS,
        cy: RADIUS,
      },
    },
  },
  {
    markup: [
      {
        tagName: 'circle',
        selector: 'body',
      },
    ],
  },
);

export default class ManualStart extends ManualStartBaseClass
  implements IVertexModel {
  constructor() {
    super();
  }

  view(p: Paper) {
    return p.findViewByModel(this);
  }
}

export function isManualStart(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
