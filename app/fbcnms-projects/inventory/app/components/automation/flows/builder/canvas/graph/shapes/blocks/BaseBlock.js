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
import type {ILinkModel} from '../../facades/shapes/edges/Link';
import type {
  IVertexModel,
  IVertexView,
  VertexPort,
} from '../../facades/shapes/vertexes/BaseVertext';
import type {Paper} from '../../facades/Paper';

import type {ChoiceSettingsType} from './blockTypes/choice/ChoiceSettingsType';
import type {EndSettings} from './blockTypes/end/EndSettings';
import type {ErrorHandlingType} from './blockTypes/ErrorSettings';
import type {ExecuteFlowSettingsType} from './blockTypes/executeFlow/ExecuteFlowSettingsType';
import type {GoToSettingsType} from './blockTypes/goTo/GoToSettingsType';
import type {InputSettingsType} from './blockTypes/InputSettingsType';
import type {InvokeRestApiSettingsType} from './blockTypes/invokeRestApi/InvokeRestApiSettingsType';
import type {ManualStartSettingsType} from './blockTypes/manualStart/ManualStartSettingsType';
import type {OutputSettingsType} from './blockTypes/OutputSettingsType';
import type {TimerSettingsType} from './blockTypes/timer/TimerSettingsType';
import type {WaitSignalSettingsType} from './blockTypes/waitSignal/WaitSignalSettingsType';
import type {PublishToKafkaSettingsType} from './blockTypes/publishToKafka/PublishToKafkaSettings';

import BaseConnector from '../connectors/BaseConnector';
import {DISPLAY_SETTINGS} from '../../utils/helpers';
import {IsOutputPortChoise, defaultAttrProps} from '../connectors/helper';
import {PORTS_GROUPS} from '../../facades/shapes/vertexes/BaseVertext';
import {V} from 'jointjs';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from './blockTypes/BaseSettings';
import {
  initialErrorSettings,
  setErrorSettings,
} from './blockTypes/ErrorSettings';
import {
  initialInputSettings,
  setInputSettings,
} from './blockTypes/InputSettingsType';
import {
  initialOutputSettings,
  setOutputSettings,
} from './blockTypes/OutputSettingsType';
import {
  initialPositionPort,
  resizeBlock,
  setOutput,
  setIntput,
} from './utils/helpers';
import {TYPE_LIST} from '../../../../widgets/detailsPanel/blockSettings/configureSettings/ConfigurationGoTo.js';

import {TYPE as ForEachLoopType} from '../../facades/shapes/vertexes/logic/ForEachLoop';
import {TYPE as ParallelType} from '../../facades/shapes/vertexes/logic/Parallel';

const DUPLICATION_SHIFT = {
  x: 84,
  y: 84,
};

const selectionHighlighting = {
  highlighter: {
    name: 'addClass',
    options: {
      className: DISPLAY_SETTINGS.classes.isSelected,
    },
  },
};

type settingsTypes =
  | WaitSignalSettingsType
  | TimerSettingsType
  | GoToSettingsType
  | ChoiceSettingsType
  | ManualStartSettingsType
  | EndSettings
  | InvokeRestApiSettingsType
  | ExecuteFlowSettingsType
  | PublishToKafkaSettingsType;

export interface IBlock {
  +id: string;
  +select: () => void;
  +deselect: () => void;
  +model: IVertexModel;
  +view: IVertexView;
  +type: string;
  +name: string;
  +settings: settingsTypes;
  +inputSettings: InputSettingsType;
  +outputSettings: OutputSettingsType;
  +errorSettings: ErrorHandlingType;
  +isSelected: boolean;
  +getPorts: () => $ReadOnlyArray<VertexPort>;
  +getInputPort: () => ?VertexPort;
  +getOutputPorts: () => $ReadOnlyArray<VertexPort>;
  +getPortByID: (portID: string) => ?VertexPort;
  +setName: string => void;
  +setParent: string => void;
  +setSize: string => void;
  +setPosition: (number, number) => void;
  +setPorts: string => void;
  +setSettings: string => void;
  +setInputSettings: string => void;
  +setOutputSettings: string => void;
  +setErrorSettings: string => void;
  +outConnectors: Array<IConnector>;
  +addConnector: (
    sourcePort: ?(string | number),
    target: IBlock,
    model?: ?ILinkModel,
  ) => ?IConnector;
  +removeConnector: IConnector => void;
  +addToGraph: () => void;
  +copy: () => IBlock;
  +clone: () => IBlock;
}

export default class BaseBlock implements IBlock {
  paper: Paper;
  model: IVertexModel;
  view: IVertexView;
  type: string;
  name: string;
  settings: settingsTypes;
  inputSettings: InputSettingsType;
  outputSettings: OutputSettingsType;
  errorSettings: ErrorHandlingType;
  isSelected: boolean;
  id: string;
  outConnectors: Array<IConnector>;
  isInGraph: boolean = false;

  constructor(model: IVertexModel, paper: Paper, addToGraph: boolean = true) {
    this.paper = paper;
    this.model = model;

    this.outConnectors = [];

    this.name = model.attributes.attrs.label.text;

    if (addToGraph) {
      this.addToGraph();
    }

    this.type = model.attributes.type;
    this.id = model.id;
    this.settings = getInitialBlockSettings(model.attributes.type);
    this.inputSettings = initialInputSettings;
    this.outputSettings = initialOutputSettings;
    this.errorSettings = initialErrorSettings;
    this.model.idParent = '';
  }

  setName(newName: string) {
    this.name = newName;
    this.model.attr('label/text', newName);
  }

  setParent(id: string) {
    this.model.idParent = id;
  }

  setSize(typeSizeCoupled: string) {
    resizeBlock(typeSizeCoupled, this);
  }

  setPorts(type: string) {
    if (type === TYPE_LIST[0].id) {
      setOutput(this, TYPE_LIST[0].name);
    }

    if (type === TYPE_LIST[1].id) {
      setIntput(this, TYPE_LIST[1].name);
    }
  }

  setPosition(positionX: number, positionY: number) {
    this.model.position(positionX, positionY);
  }

  setSettings(settings: string) {
    this.settings = setBlockSettings(this.type, settings);
  }

  setInputSettings(inputSettings: string) {
    this.inputSettings = setInputSettings(inputSettings);
  }

  setOutputSettings(outputSettings: string) {
    this.outputSettings = setOutputSettings(outputSettings);
  }

  setErrorSettings(errorSettings: string) {
    this.errorSettings = setErrorSettings(errorSettings);
  }

  select() {
    this.isSelected = true;

    this.view.highlight(undefined, selectionHighlighting);
  }

  deselect() {
    this.isSelected = false;

    this.view.unhighlight(undefined, selectionHighlighting);
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

  addConnector(
    sourcePort: ?(string | number),
    target: IBlock,
    model?: ?ILinkModel,
  ) {
    const targetPort = target.getInputPort();
    if (targetPort == null) {
      return;
    }

    const outputPorts = this.getOutputPorts();

    const index =
      sourcePort != null
        ? typeof sourcePort === 'number'
          ? sourcePort
          : outputPorts.findIndex(p => p.id === sourcePort)
        : outputPorts.findIndex(
            (_p, pIndex) => this.outConnectors[pIndex] == null,
          );
    if (index < 0) {
      return;
    }

    const connector = new BaseConnector(
      this.paper,
      {
        source: this,
        sourcePort: outputPorts[index].id,
        target,
        targetPort: targetPort.id,
      },
      model,
      this.isInGraph,
    );

    connector.model?.connector('rounded');
    connector.model?.attr('line/targetMarker', {type: 'path', d: ''});
    const outputPort = this.getOutputPorts()[0]?.id;
    const outputPortChoice =
      connector.model !== undefined
        ? IsOutputPortChoise(connector.model, outputPort)
        : false;
    if (outputPortChoice) {
      connector.model.appendLabel({
        ...defaultAttrProps,
      });
    }

    this.outConnectors[index] = connector;

    return connector;
  }

  addToGraph() {
    if (this.isInGraph) {
      return;
    }

    const graph = this.paper.model;
    this.model.addTo(graph);

    this.updateView();

    this.isInGraph = true;
    if (
      this.model.attributes.type == ForEachLoopType ||
      this.model.attributes.type == ParallelType
    ) {
      initialPositionPort(this);
    }
  }

  updateView() {
    const view = this.paper.findViewByModel(this.model);
    if (isVertexView(view)) {
      this.view = view;
    }

    V(this.view.el).addClass(DISPLAY_SETTINGS.classes.defaultBlock);
  }

  copy() {
    return this.clone(false);
  }

  clone(addToGraph: boolean = true) {
    const clonedModel = this.model.clone();
    clonedModel.position(
      this.model.attributes.position.x + DUPLICATION_SHIFT.x,
      this.model.attributes.position.y + DUPLICATION_SHIFT.y,
    );

    const clonedBlock = new BaseBlock(clonedModel, this.paper, addToGraph);
    clonedBlock.setName(this.name);

    return clonedBlock;
  }
}

function isVertexView(v): %checks {
  return !!v.portContainerMarkup;
}
