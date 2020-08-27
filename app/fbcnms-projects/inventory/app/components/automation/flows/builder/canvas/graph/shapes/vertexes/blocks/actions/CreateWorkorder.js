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

export const TYPE = 'actions.CreateWorkorder';

const CreateWorkorderBaseClass = jointJS.dia.Element.define(
  TYPE,
  {
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        strokeWidth: 2,
        stroke: '#000000',
        fill: symphony.palette.primary,
      },
      label: {
        textVerticalAnchor: 'middle',
        textAnchor: 'middle',
        refX: '50%',
        refY: '50%',
        fontSize: 14,
        fill: symphony.palette.white,
      },
    },
  },
  {
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
  },
);

export default class CreateWorkorder extends CreateWorkorderBaseClass
  implements IVertexModel {
  constructor() {
    super();
  }

  view(p: Paper) {
    return p.findViewByModel(this);
  }
}

export function isCreateWorkorder(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
