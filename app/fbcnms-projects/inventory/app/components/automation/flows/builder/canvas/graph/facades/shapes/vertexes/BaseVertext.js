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

import type {
  ExtendedMouseEvent,
  KeyValuePair,
  Position,
  Primitive,
  Size,
} from '../../Helpers';
import type {Graph} from '../../Graph';
import type {IBaseShapeAttributes, IShape} from '../../shapes/BaseShape';
import type {Paper} from '../../Paper';

import symphony from '@symphony/design-system/theme/symphony';

export const VERTEX_COMMON_DISPLAY = {
  attrs: {
    label: {
      text: 'manual action',
      textVerticalAnchor: 'middle',
      textAnchor: 'center',
      refY: '120%',
      fontSize: 14,
      fill: symphony.palette.secondary,
    },
  },
  markup: [
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
};

export type VertexDescriptor = $ReadOnly<{|
  id: string,
  position: Position,
  type: string,
|}>;

export type VertexPort = $ReadOnly<{|
  id: string,
  group: string,
|}>;

type VertexPorts = $ReadOnly<{|
  items: $ReadOnlyArray<VertexPort>,
|}>;

export interface IVertexModelAttributes extends IBaseShapeAttributes {
  +position: Position;
  +size: Size;
  +z: number;
  +attrs: {
    ...KeyValuePair,
    label: {
      text: string,
    },
  };
  +ports: VertexPorts;
}

export type VertexEventCallback = (
  IVertexView,
  ExtendedMouseEvent,
  number,
  number,
) => void;

export type VertexPortEventCallback = (
  IVertexView,
  ExtendedMouseEvent,
  HTMLElement,
  number,
  number,
) => void;

export interface IVertexModel extends IShape {
  +attributes: IVertexModelAttributes;
  +position: (number, number) => void;
  +resize: (number, number) => void;
  +attr: KeyValuePair => void;
  +addTo: Graph => void;
  +remove: () => void;
  +getEmbeddedCells: () => $ReadOnlyArray<IVertexModel>;
  +embed: IVertexModel => void;
  +unembed: IVertexModel => void;
  +fitEmbeds: ({padding: number}) => void;
  +view: Paper => IVertexView;
  +addPort: KeyValuePair => void;
  +getPorts: () => $ReadOnlyArray<Port>;
}

export type IVertexView = $ReadOnly<{|
  model: IVertexModel,
  highlight: (?IVertexView, options?: KeyValuePair) => void,
  unhighlight: () => void,
  isSelected: boolean,
  findAttribute: (
    attribute: string,
    node: HTMLElement,
  ) => KeyValuePair | Primitive,
|}>;

export type Port = $ReadOnly<{|
  id: string,
|}>;

export const DISPLAY_SETTINGS = {
  body: {
    stroke: {
      default: symphony.palette.white,
      hovered: symphony.palette.B700,
      selected: symphony.palette.primary,
    },
  },
};

type PortsGroupInitValue = $ReadOnly<{|
  count: number,
  markup?: string,
|}>;

function getDefaultPortMarkup(
  strokeColor: string,
  horizontalAlign: number = 0,
) {
  return `<circle r="7" cx="${horizontalAlign}" stroke-width="4" stroke="${strokeColor}" fill="white" magnet="true"/>`;
}

export const PORTS_GROUPS = {
  INPUT: 'input',
  OUTPUT: 'output',
};

export type PortGroupName = 'input' | 'output';

function getPortsArray(
  settings: ?PortsGroupInitValue,
  groupName: PortGroupName,
) {
  const inputPortsCount = settings?.count ?? 1;
  return Array(inputPortsCount).fill({group: groupName});
}
type InitObjectType = {
  ...KeyValuePair,
  id?: ?string,
};
export function getInitObject(
  backgroundColor: string,
  ports?: {
    input?: PortsGroupInitValue,
    output?: PortsGroupInitValue,
  },
  id?: ?string,
): InitObjectType {
  const inputPorts = getPortsArray(ports?.input, PORTS_GROUPS.INPUT);
  const outputPorts = getPortsArray(ports?.output, PORTS_GROUPS.OUTPUT);
  const portsArray = inputPorts.concat(outputPorts);

  return {
    ports: {
      groups: {
        input: {
          position: 'left',
          markup:
            ports?.input?.markup ?? getDefaultPortMarkup(backgroundColor, 9),
        },
        output: {
          position: 'right',
          markup:
            ports?.output?.markup ?? getDefaultPortMarkup(backgroundColor),
        },
      },
      items: portsArray,
    },
    id: id ?? undefined,
  };
}
