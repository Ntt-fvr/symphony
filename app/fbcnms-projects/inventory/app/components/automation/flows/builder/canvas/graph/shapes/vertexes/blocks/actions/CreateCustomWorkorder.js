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

export const TYPE = 'actions.CreateCustomWorkorder';
const defaultProperties = {
  attrs: {
    root: {
      title: 'Custom Work Order',
    },
    body: {
      refWidth: '100%',
      refHeight: '100%',
      fill: 'transparent',
    },
    icon: {
      refWidth: '100%',
      refHeight: '100%',
      fill: symphony.palette.primary,
      refD:
        'm6 0c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 14.2c-2.5 0-4.7-1.3-6-3.2 0-2 4-3.1 6-3.1s6 1.1 6 3.1c-1.3 1.9-3.5 3.2-6 3.2z',
    },
    label: {
      textWrap: {
        width: '200%',
        height: 200,
        ellipsis: true,
      },
      refX: '50%',
      refY: '110%',
      fontSize: 14,
      fill: '#333333',
      textAnchor: 'middle',
      textVerticalAnchor: 'top',
    },
  },
};
const markup = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'path',
      selector: 'icon',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
};

const CreateCustomWorkorderBaseClass = jointJS.dia.Element.define(
  TYPE,
  defaultProperties,
  markup,
);

export default class CreateCustomWorkorder
  extends CreateCustomWorkorderBaseClass
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
