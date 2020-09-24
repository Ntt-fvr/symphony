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
  IVertexModel,
  IVertexView,
  PortGroupName,
  VertexPort,
} from '../../facades/shapes/vertexes/BaseVertext';
import type {Paper} from '../../facades/Paper';

import {DISPLAY_SETTINGS} from '../../facades/shapes/vertexes/BaseVertext';

export interface IBlock {
  +id: string;
  +select: () => void;
  +deselect: () => void;
  +model: IVertexModel;
  +view: IVertexView;
  +type: string;
  +name: string;
  +isSelected: boolean;
  +getPorts: () => $ReadOnlyArray<VertexPort>;
  +getPortByGroup: (portsGroup: PortGroupName) => ?VertexPort;
  +getPortByID: (portID: string) => ?VertexPort;
  +setName: string => void;
}

export default class BaseBlock implements IBlock {
  paper: Paper;
  model: IVertexModel;
  view: IVertexView;
  type: string;
  name: string;
  isSelected: boolean;
  id: string;

  constructor(model: IVertexModel, paper: Paper) {
    this.paper = paper;
    this.model = model;

    this.name = model.attributes.attrs.label.text;

    const graph = this.paper.model;
    this.model.addTo(graph);

    this.view = paper.findViewByModel(model);

    this.type = model.attributes.type;
    this.id = model.id;
  }

  setName(newName: string) {
    this.name = newName;
    this.model.attributes.attrs.label.text = newName;
  }

  select() {
    this.isSelected = true;
    this.model.attr({
      body: {
        stroke: DISPLAY_SETTINGS.body.stroke.selected,
      },
    });
  }

  deselect() {
    this.isSelected = false;
    this.model.attr({
      body: {
        stroke: DISPLAY_SETTINGS.body.stroke.default,
      },
    });
  }

  getPorts(): $ReadOnlyArray<VertexPort> {
    return this.model.attributes.ports.items;
  }

  getPortByGroup(portsGroup: PortGroupName): ?VertexPort {
    return this.getPorts().find(p => p.group === portsGroup);
  }

  getPortByID(portID: string): ?VertexPort {
    return this.getPorts().find(p => p.id === portID);
  }
}
