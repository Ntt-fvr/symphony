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

import type {IConnector} from '../connectors/BaseConnector';
import type {
  IVertexModel,
  IVertexView,
  VertexPort,
} from '../../facades/shapes/vertexes/BaseVertext';
import type {Paper} from '../../facades/Paper';

import BaseConnector from '../connectors/BaseConnector';
import {
  DISPLAY_SETTINGS,
  PORTS_GROUPS,
} from '../../facades/shapes/vertexes/BaseVertext';

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
  +getInputPort: () => ?VertexPort;
  +getOutputPorts: () => $ReadOnlyArray<VertexPort>;
  +getPortByID: (portID: string) => ?VertexPort;
  +setName: string => void;
  +outConnectors: Array<IConnector>;
  +addConnector: (sourcePort: ?string, target: IBlock) => ?IConnector;
  +removeConnector: IConnector => void;
}

export default class BaseBlock implements IBlock {
  paper: Paper;
  model: IVertexModel;
  view: IVertexView;
  type: string;
  name: string;
  isSelected: boolean;
  id: string;
  outConnectors: Array<IConnector>;

  constructor(model: IVertexModel, paper: Paper) {
    this.paper = paper;
    this.model = model;

    this.outConnectors = [];

    this.name = model.attributes.attrs.label.text;

    const graph = this.paper.model;
    this.model.addTo(graph);

    this.view = paper.findViewByModel(model);

    this.type = model.attributes.type;
    this.id = model.id;
  }

  setName(newName: string) {
    this.name = newName;
    this.model.attr('label/text', newName);
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

  getInputPort(): ?VertexPort {
    return this.getPorts().find(p => p.group === PORTS_GROUPS.INPUT);
  }

  getOutputPorts(): $ReadOnlyArray<VertexPort> {
    return this.getPorts().filter(p => p.group === PORTS_GROUPS.OUTPUT);
  }

  getPortByID(portID: string): ?VertexPort {
    return this.getPorts().find(p => p.id === portID);
  }

  removeConnector(connector: IConnector) {
    const index = this.outConnectors.findIndex(con => con.id === connector.id);
    if (index < 0) {
      return;
    }

    connector.model.remove();
    delete this.outConnectors[index];
  }

  addConnector(sourcePort: ?string, target: IBlock) {
    const targetPort = target.getInputPort();
    if (targetPort == null) {
      return;
    }

    const outputPorts = this.getOutputPorts();
    const index =
      sourcePort != null
        ? outputPorts.findIndex(p => p.id === sourcePort)
        : outputPorts.findIndex(
            (_p, pIndex) => this.outConnectors[pIndex] == null,
          );
    if (index < 0) {
      return;
    }

    const connector = new BaseConnector(this.paper, {
      source: this,
      sourcePort: outputPorts[index].id,
      target,
      targetPort: targetPort.id,
    });

    this.outConnectors[index] = connector;

    return connector;
  }
}
