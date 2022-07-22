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
import type {ILinkModel} from '../../facades/shapes/edges/Link';

import symphony from '@symphony/design-system/theme/symphony';
import {TYPE as ChoiceType} from '../../facades/shapes/vertexes/logic/Choice';

type Port = {|
  group: string,
  id: string,
|};

export function IsOutputPortChoise(model: ?ILinkModel, outputPort: string) {
  const ChoiceBlockList: Array<string> = model.collection.models.filter(
    block => block.attributes.type === ChoiceType,
  );

  const choicePortsList: Array<Port> = ChoiceBlockList.map(block =>
    block
      .getPorts()
      .filter(port => port.group === 'output')
      .flat(),
  ).flat();

  const isOutputPortChoise = choicePortsList.find(
    port => port.id === outputPort,
  );

  return isOutputPortChoise;
}

export const RULE_NAME = 'Default';

export const defaultAttrProps = {
  markup: [
    {
      tagName: 'rect',
      selector: 'background',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    label: {
      text: RULE_NAME,
      refX2: 0,
      refY2: -5,
      fontSize: 12,
      strokeWidth: 0,
      fontWeight: 'bold',
    },
    background: {
      fill: '#FFF5DC',
      refX2: -5,
      refY2: -10,
      width: 53,
      height: 20,
      ry: 3,
      rx: 3,
      strokeWidth: 0,
    },
  },
};
