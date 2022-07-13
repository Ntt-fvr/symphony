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
import type {IBaseShapeAttributes, IShape, IShapeView} from '../BaseShape';
import type {Paper} from '../../Paper';

import symphony from '@symphony/design-system/theme/symphony';

const defaultAttrProps = {
  cursor: 'move',
};

export const VERTEX_COMMON_DISPLAY = {
  attrs: {
    label: {
      ...defaultAttrProps,
      text: 'manual action',
      textAnchor: 'middle',
      refX2: 41,
      refY2: 74,
      fontSize: 12,
      fontWeight: 'bold',
      fill: symphony.palette.secondary,
      strokeWidth: 0,
      pointerEvents: 'none',
    },
    background: {
      ...defaultAttrProps,
      fill: 'white',
      refX2: 2,
      refY2: 71,
      ry: 7,
      rx: 7,
      width: 77,
      height: 18,
    },
  },
  defaultAttrProps,
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
};

export const BIG_VERTEX_COMMON_DISPLAY = {
  attrs: {
    label: {
      ...defaultAttrProps,
      text: 'manual action',
      textAnchor: 'middle',
      refX2: 41,
      refY2: 74,
      fontSize: 12,
      fontWeight: 'bold',
      fill: symphony.palette.secondary,
      strokeWidth: 0,
      pointerEvents: 'none',
    },
    background: {
      ...defaultAttrProps,
      fill: 'white',
      refX2: -20,
      refY2: 71,
      ry: 7,
      rx: 7,
      width: 120,
      height: 18,
    },
  },
  defaultAttrProps,
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
  +attr: (KeyValuePair | string, ?Primitive) => ?Primitive;
  +addTo: Graph => void;
  +remove: () => void;
  +getEmbeddedCells: () => $ReadOnlyArray<IVertexModel>;
  +embed: IVertexModel => void;
  +unembed: IVertexModel => void;
  +fitEmbeds: ({padding: number}) => void;
  +view: Paper => IVertexView;
  +addPort: KeyValuePair => void;
  +getPorts: () => $ReadOnlyArray<Port>;
  +clone: (options?: ?KeyValuePair) => IVertexModel;
  +embedding: ?boolean;
}

export type IVertexView = $ReadOnly<{|
  ...IShapeView<IVertexModel>,
  portContainerMarkup: string,
|}>;

export type Port = $ReadOnly<{|
  id: string,
|}>;

type PortsGroupInitValue = $ReadOnly<{|
  count: number,
  markup?: string,
|}>;

function getDefaultPortMarkup(
  strokeColor: string,
  horizontalAlign?: number,
  defaultCoordinatesX?: number,
) {
  return `<circle r="7" cx="${
    horizontalAlign || defaultCoordinatesX || 0
  }" cy="0" stroke-width="4" stroke="${strokeColor}" fill="white" magnet="true"/>`;
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
  horizontalPortLeftAlign?: number,
  horizontalPortRightAlign?: number,
  id?: ?string,
  position?: string,
): InitObjectType {
  const inputPorts = getPortsArray(ports?.input, PORTS_GROUPS.INPUT);
  const outputPorts = getPortsArray(ports?.output, PORTS_GROUPS.OUTPUT);
  const portsArray = inputPorts.concat(outputPorts);
  const defaultCoordinatesX = 9;

  return {
    ports: {
      groups: {
        input: {
          position: `${position || 'left'}`,
          markup:
            ports?.input?.markup ??
            getDefaultPortMarkup(
              backgroundColor,
              horizontalPortLeftAlign,
              defaultCoordinatesX,
            ),
        },
        output: {
          position: `${position || 'right'}`,
          markup:
            ports?.output?.markup ??
            getDefaultPortMarkup(backgroundColor, horizontalPortRightAlign),
        },
      },
      items: portsArray,
    },
    id: id ?? undefined,
  };
}

export const originSize = {
  width: 437,
  height: 298,
  bodyY2: 86,
  backgroundY2: 157,
  labelY2: 160,
  imageY2: 81,
  resizeWidth: 394,
  resizeHeigth: 234,
};

export const mediumSize = {
  width: 437,
  height: 420,
  bodyY2: 141,
  backgroundY2: 210,
  labelY2: 213,
  imageY2: 137,
  resizeWidth: 394,
  resizeHeigth: 344,
};
