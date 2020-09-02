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

export const TYPE = 'administrative.ManualStart';

const defaultProperties = {
  attrs: {
    image: {
      xlinkHref: '/inventory/static/svg/go.svg',
      refWidth: '100%',
      refHeight: '100%',
    },
  },
};

const markup = {
  markup: [
    {
      tagName: 'image',
      selector: 'image',
    },
  ],
};

const ManualStartBaseClass = jointJS.dia.Element.define(
  TYPE,
  defaultProperties,
  markup,
);

export default class ManualStart extends ManualStartBaseClass
  implements IVertexModel {
  constructor() {
    super();
    this.resize(36, 36);
  }
}

export function isManualStart(element: ?IVertexModel): boolean {
  if (element == null) {
    return false;
  }
  return element.attributes.type === TYPE;
}
