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

import symphony from '@fbcnms/ui/theme/symphony';

export type VertexDescriptor = $ReadOnly<{|
  id: string,
  position: Position,
  type: string,
|}>;

export interface IVertexModelAttributes extends IBaseShapeAttributes {
  +position: Position;
  +size: Size;
  +z: number;
  +attrs: KeyValuePair;
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
  // return `<circle cx="10" r="7" stroke-width="4" stroke="${strokeColor}" fill="white"/>`;
  return `<circle r="7" cx="${horizontalAlign}" stroke-width="4" stroke="${strokeColor}" fill="white" magnet="true"/>`;
}

function getPortsArray(
  settings: ?PortsGroupInitValue,
  groupName: 'input' | 'output',
) {
  const inputPortsCount = settings?.count ?? 1;
  return Array(inputPortsCount).fill({group: groupName});
}

export function getInitObject(
  backgroundColor: string,
  ports?: {
    input?: PortsGroupInitValue,
    output?: PortsGroupInitValue,
  },
): KeyValuePair {
  const inputPorts = getPortsArray(ports?.input, 'input');
  const outputPorts = getPortsArray(ports?.output, 'output');
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
  };
}
