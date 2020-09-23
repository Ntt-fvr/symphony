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

import type {ExtendedMouseEvent, Position, Rect} from './facades/Helpers';
import type {Graph, GraphEventCallback} from './facades/Graph';
import type {IBlock} from './shapes/blocks/BaseBlock';
import type {IConnector} from './shapes/connectors/BaseConnector';
import type {IShape} from './facades/shapes/BaseShape';
import type {IShapesFactory} from './shapes/ShapesFactory';
import type {
  IVertexModel,
  IVertexView,
  VertexDescriptor,
  VertexEventCallback,
  VertexPortEventCallback,
} from './facades/shapes/vertexes/BaseVertext';
import type {
  LinkDescriptor,
  LinkEventArgs,
  LinkEventCallback,
} from './facades/shapes/edges/Link';
import type {Paper, PaperEventCallback} from './facades/Paper';

import * as React from 'react';
import GraphFactory from './GraphFactory';
import Lasso from './facades/shapes/vertexes/helpers/Lasso';
import ShapesFactory from './shapes/ShapesFactory';
import emptyFunction from '@fbcnms/util/emptyFunction';
import symphony from '@symphony/design-system/theme/symphony';
import {DEFAULT_LINK_SETTINGS} from './shapes/connectors/BaseConnector';
import {Events} from './facades/Helpers';
import {
  buildPaperConnectionValidation,
  handleNewConnections,
} from './utils/helpers';
import {getRectCenter, getRectDiff} from '../../../utils/helpers';
import {handleMagnetPorts} from './paper/helpers';
import {useCallback, useContext, useRef} from 'react';

export type BlockDescriptor = $ReadOnly<{|
  model: VertexDescriptor,
|}>;

export type ConnectorDescriptor = $ReadOnly<{|
  model: LinkDescriptor,
|}>;

export type GraphDescriptor = $ReadOnly<{|
  blocks: $ReadOnlyArray<BlockDescriptor>,
  connectors: $ReadOnlyArray<ConnectorDescriptor>,
|}>;

const emptySerialization = {
  blocks: [],
  connectors: [],
};

type AddBlockFunctionType = (
  type: string,
  options?: ?{
    id?: ?string,
    text?: ?string,
    position?: ?Position,
  },
) => ?IBlock;

type AddConnectorFunctionType = (
  options?: ?{
    source?: ?IBlock,
    target?: ?IBlock,
  },
) => ?IConnector;

export type BlockEventCallback = (IBlock, MouseEvent, number, number) => void;
export type BlockPortEventCallback = (
  IBlock,
  HTMLElement,
  ExtendedMouseEvent,
  number,
  number,
) => void;

export type GraphBlockEventCallback = IBlock => void;
export type GraphConnectorEventCallback = IConnector => void;

export type ConnectorEventCallback = (
  IConnector,
  ExtendedMouseEvent,
  number,
  number,
) => void;

export type GraphEvent = 'add' | 'remove';
export type PaperEvent =
  | 'blank:pointerclick'
  | 'blank:pointerdown'
  | 'blank:pointermove'
  | 'blank:pointerup';
export type BlockEvent =
  | 'element:pointerup'
  | 'element:pointerdown'
  | 'element:magnet:pointerclick';
export type BlockPortEvent = 'element:magnet:pointerclick';
export type ConnectorEvent =
  | 'link:mouseover'
  | 'link:pointerdown'
  | 'link:pointerup';

export type GraphContextType = {
  bindGraphContainer: HTMLElement => void,
  getMainPaper: () => ?Paper,
  addBlock: AddBlockFunctionType,
  removeBlocks: (IBlock[]) => void,
  removeConnector: IConnector => void,
  addConnector: AddConnectorFunctionType,
  getBlock: string => ?IBlock,
  getConnector: string => ?IConnector,
  zoomIn: () => void,
  zoomOut: () => void,
  zoomFit: () => void,
  move: Position => void,
  reset: () => void,
  onGraphBlockEvent: (GraphEvent, GraphBlockEventCallback) => void,
  onGraphConnectorEvent: (GraphEvent, GraphConnectorEventCallback) => void,
  onPaperEvent: (PaperEvent, PaperEventCallback) => void,
  onBlockEvent: (BlockEvent, BlockEventCallback) => void,
  onBlockPortEvent: (BlockEvent, BlockPortEventCallback) => void,
  onConnectorEvent: (ConnectorEvent, ConnectorEventCallback) => void,
  serialize: () => ?GraphDescriptor,
  deserialize: string => void,
  drawLasso: Position => ?Lasso,
  getBlocksInArea: Rect => Array<IBlock>,
  getBlocksByType: (type: string) => Array<IBlock>,
  getConnectors: () => Array<IConnector>,
};

const GraphContextDefaults = {
  bindGraphContainer: emptyFunction,
  getMainPaper: emptyFunction,
  addBlock: emptyFunction,
  removeBlocks: emptyFunction,
  removeConnector: emptyFunction,
  addConnector: emptyFunction,
  getBlock: emptyFunction,
  getConnector: emptyFunction,
  zoomIn: emptyFunction,
  zoomOut: emptyFunction,
  zoomFit: emptyFunction,
  move: emptyFunction,
  reset: emptyFunction,
  onBlockEvent: emptyFunction,
  onBlockPortEvent: emptyFunction,
  onConnectorEvent: emptyFunction,
  onPaperEvent: emptyFunction,
  onGraphBlockEvent: emptyFunction,
  onGraphConnectorEvent: emptyFunction,
  serialize: () => emptySerialization,
  deserialize: emptyFunction,
  drawLasso: emptyFunction,
  getBlocksInArea: () => [],
  getBlocksByType: () => [],
  getConnectors: () => [],
};

const GraphContext = React.createContext<GraphContextType>(
  GraphContextDefaults,
);

type Props = {|
  children: React.Node,
|};

function getPaperViewPortCenter(paper: Paper): Position {
  const viewPort = paper.el.getBoundingClientRect();
  const x = viewPort.left + viewPort.width / 2;
  const y = viewPort.top + viewPort.height / 2;
  return paper.clientToLocalPoint({x, y});
}

function graphAddBlock(
  type: string,
  options: ?{
    id?: ?string,
    text?: ?string,
    position: ?Position,
  },
) {
  if (this.current == null) {
    return;
  }

  const shapesFactory = this.current.shapesFactory;
  const blocksMap = this.current.blocks;

  const position =
    options?.position || getPaperViewPortCenter(this.current.paper);

  const newBlock = shapesFactory.createBlock(type, options?.id ?? '');
  newBlock.model.position(position.x, position.y);
  if (options?.text) {
    newBlock.model.attr({
      label: {
        text: options.text,
      },
    });
  }

  blocksMap.set(newBlock.id, newBlock);

  return newBlock;
}

function graphRemoveBlocks(blocks: IBlock[]) {
  if (this.current == null) {
    return;
  }
  const blocksMap = this.current.blocks;
  const graph = this.current.graph;
  const connectorsMap = this.current.connectors;
  const idsToRemove = blocks.map(block => block.model.id);

  // This is a temporary way to handle the update of connectorsMap
  // after the removal of the blocks and it's connectors from the graph
  // This is temporary until we finalize the connectors logic implementation
  connectorsMap.forEach(({id, model}: IConnector) => {
    if (
      (model.attributes.source.id != null &&
        idsToRemove.includes(model.attributes.source.id)) ||
      (model.attributes.target.id != null &&
        idsToRemove.includes(model.attributes.target.id))
    ) {
      connectorsMap.delete(id);
    }
  });

  graph.removeCells(blocks.map(block => block.model));
  idsToRemove.forEach(id => blocksMap.delete(id));
}

function graphRemoveConnector(connector: IConnector) {
  if (this.current == null) {
    return;
  }

  const connectorsMap = this.current.connectors;
  connectorsMap.delete(connector.id);
  connector.model.remove();
}

function graphAddConnector(options?: ?{source?: ?IBlock, target?: ?IBlock}) {
  if (this.current == null) {
    return;
  }

  const shapesFactory = this.current.shapesFactory;
  const connectorsMap = this.current.connectors;

  const connector = shapesFactory.createNewConnector(
    options?.source,
    options?.target,
  );

  connectorsMap.set(connector.id, connector);

  return connector;
}

function paperZoom(factor?: 1 | -1 | 0 = 1) {
  if (this.current == null) {
    return;
  }
  const flow: FlowWrapper = this.current;

  if (factor === 0) {
    flow.paperScale = 1;
  } else {
    flow.paperScale *= 1 + 0.1 * factor;
  }

  const paperRectBeforeScale = flow.paper.getContentBBox();

  flow.paper.scale(flow.paperScale);

  const paperRectAfterScale = flow.paper.getContentBBox();

  const rectChange = getRectDiff(paperRectAfterScale, paperRectBeforeScale);
  const originChange = getRectCenter(rectChange);

  paperMove.call(this, originChange);
}

function paperZoomIn() {
  paperZoom.call(this);
}

function paperZoomOut() {
  paperZoom.call(this, -1);
}

function paperZoomFit() {
  if (this.current == null) {
    return;
  }
  const flow: FlowWrapper = this.current;

  flow.paper.scaleContentToFit({padding: 32});

  const scaleObject = flow.paper.scale();
  if (scaleObject == null) {
    return;
  }
  const scaleValue = Math.trunc(scaleObject.sx * 10) / 10;
  flow.paperScale = scaleValue;

  const translationObject = flow.paper.translate();
  if (translationObject == null) {
    return;
  }
  flow.paperTranslation = {
    x: translationObject.tx,
    y: translationObject.ty,
  };
}

function paperMove(translation: Position | 0) {
  if (this.current == null) {
    return;
  }

  if (translation === 0) {
    this.current.paperTranslation = {
      x: 0,
      y: 0,
    };
  } else {
    this.current.paperTranslation = {
      x: this.current.paperTranslation.x + translation.x,
      y: this.current.paperTranslation.y + translation.y,
    };
  }
  this.current.paper.translate(
    this.current.paperTranslation.x,
    this.current.paperTranslation.y,
  );
}

function paperReset() {
  paperZoom.call(this, 0);
  paperMove.call(this, 0);
}

function paperOnBlockEvent(event: BlockEvent, handler: BlockEventCallback) {
  if (this.current == null) {
    return;
  }
  const wrappedHandler: VertexEventCallback = (
    vertexView: IVertexView,
    generalEventArgs: ExtendedMouseEvent,
    positionX: number,
    positionY: number,
  ) => {
    const block = this.current?.blocks.get(vertexView.model.id);
    if (block == null) {
      return;
    }
    handler(block, generalEventArgs, positionX, positionY);
  };
  this.current.paper.on(event, wrappedHandler);
}

function paperOnBlockPortEvent(
  event: BlockEvent,
  handler: BlockPortEventCallback,
) {
  if (this.current == null) {
    return;
  }
  const wrappedHandler: VertexPortEventCallback = (
    vertexView: IVertexView,
    generalEventArgs: ExtendedMouseEvent,
    portElement: HTMLElement,
    positionX: number,
    positionY: number,
  ) => {
    const block = this.current?.blocks.get(vertexView.model.id);
    if (block == null) {
      return;
    }
    handler(block, portElement, generalEventArgs, positionX, positionY);
  };
  this.current.paper.on(event, wrappedHandler);
}

function paperOnPaperEvent(event: PaperEvent, handler: PaperEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.paper.on(event, handler);
}

function paperOnConnectorEvent(
  event: ConnectorEvent,
  handler: ConnectorEventCallback,
) {
  if (this.current == null) {
    return;
  }
  const wrappedHandler: LinkEventCallback = (
    linkEventArgs: LinkEventArgs,
    generalEventArgs: ExtendedMouseEvent,
    positionX: number,
    positionY: number,
  ) => {
    const connector = this.current?.connectors.get(linkEventArgs.model.id);
    if (connector == null) {
      return;
    }
    handler(connector, generalEventArgs, positionX, positionY);
  };
  this.current.paper.on(event, wrappedHandler);
}

function graphOnGraphBlockEvent(event: GraphEvent, handler: IBlock => void) {
  callGraphEventHandler.call<IBlock>(
    this,
    event,
    this.current?.blocks,
    handler,
  );
}

function graphOnGraphConnectorEvent(
  event: GraphEvent,
  handler: IConnector => void,
) {
  callGraphEventHandler.call<IConnector>(
    this,
    event,
    this.current?.connectors,
    handler,
  );
}

function callGraphEventHandler<T: IBlock | IConnector>(
  eventName: string,
  elementsMap: ?Map<string, T>,
  handler: T => void,
) {
  if (this.current == null || elementsMap == null) {
    return;
  }
  const wrappedHandler: GraphEventCallback = (shape: IShape) => {
    const getElementAndCallHandler = () => {
      const element = elementsMap?.get(shape.id);
      if (element == null) {
        return;
      }
      handler(element);
    };
    if (eventName === Events.Graph.OnAdd) {
      setTimeout(getElementAndCallHandler);
    } else {
      getElementAndCallHandler();
    }
  };
  this.current.graph.on(eventName, wrappedHandler);
}

function graphSerialize(): ?GraphDescriptor {
  const allblocks = this.current?.blocks.values() || [];
  const allConnectors = this.current?.connectors.values() || [];

  const blocks: $ReadOnlyArray<BlockDescriptor> = [...allblocks].map(block => ({
    model: {
      type: block.type,
      id: block.id,
      position: block.model.attributes.position,
    },
  }));
  const connectors: $ReadOnlyArray<ConnectorDescriptor> = [
    ...allConnectors,
  ].map(connector => ({
    model: {
      id: connector.id,
      sourceId: connector.source?.id,
      targetId: connector.target?.id,
    },
  }));

  return {
    blocks,
    connectors,
  };
}

function graphDeserialize(json: string) {
  const graphDescriptor: GraphDescriptor = JSON.parse(json);

  if (graphDescriptor.blocks == null) {
    return;
  }

  const newBlocksMap = new Map<string, IBlock>();
  graphDescriptor.blocks.forEach(block => {
    const newBlock = graphAddBlock.call(this, block.model.type, {
      position: block.model.position,
    });
    if (newBlock == null) {
      return;
    }
    newBlocksMap.set(block.model.id, newBlock);
  });

  if (graphDescriptor.connectors == null) {
    return;
  }

  graphDescriptor.connectors.forEach(link => {
    const blockSource =
      link.model.sourceId != null
        ? newBlocksMap.get(link.model.sourceId)
        : null;
    const blockTarget =
      link.model.targetId != null
        ? newBlocksMap.get(link.model.targetId)
        : null;
    if (blockSource == null || blockTarget == null) {
      return;
    }
    graphAddConnector.call(this, {
      source: blockSource,
      target: blockTarget,
    });
  });
}

function graphDrawLasso(position: Position) {
  const graph = this.current?.graph;
  if (graph == null) {
    return;
  }

  const lasso = new Lasso();
  lasso.position(position.x, position.y);
  lasso.addTo(graph);

  return lasso;
}

function graphGetBlock(id: string) {
  return this.current?.blocks.get(id);
}

function graphGetConnector(id: string) {
  return this.current?.connectors.get(id);
}

function graphGetBlocksInArea(rect: Rect): Array<IBlock> {
  if (this.current == null) {
    return [];
  }
  const blocksMap = this.current.blocks;
  const vertexes: Array<IVertexModel> = this.current.graph.findModelsInArea(
    rect,
  );
  const blocks = vertexes
    .map(vertex => blocksMap.get(vertex.id))
    .filter(Boolean);

  return blocks;
}

function graphGetMainPaper(): ?Paper {
  return this.current?.paper;
}

function getBlocksByTypeFromMap(type: string): IBlock[] {
  if (this.current == null) {
    return [];
  }

  return [...this.current.blocks.values()].filter(block => block.type === type);
}

function getConnectorsFromMap(): IConnector[] {
  if (this.current == null) {
    return [];
  }

  return [...this.current.connectors.values()];
}

export type FlowWrapper = {|
  +graph: Graph,
  +paper: Paper,
  +blocks: Map<string, IBlock>,
  +connectors: Map<string, IConnector>,
  +shapesFactory: IShapesFactory,
  paperScale: number,
  paperTranslation: Position,
|};

export function GraphContextProvider(props: Props) {
  const {children} = props;
  const flowWrapper = useRef<?FlowWrapper>();

  const bindGraphContainer = useCallback(containerElement => {
    const graph = new GraphFactory.Graph();
    const paper = new GraphFactory.Paper({
      el: containerElement,
      model: graph,
      width: '100%',
      height: '100%',
      gridSize: 1,
      background: {
        color: symphony.palette.D100,
      },
      ...DEFAULT_LINK_SETTINGS,
      validateConnection: buildPaperConnectionValidation(flowWrapper),
    });

    const shapesFactory = new ShapesFactory(paper);
    const connectors = new Map();

    handleMagnetPorts(paper);

    flowWrapper.current = {
      graph,
      paper,
      blocks: new Map(),
      connectors,
      shapesFactory,
      paperScale: 1,
      paperTranslation: {
        x: 0,
        y: 0,
      },
    };

    handleNewConnections(flowWrapper.current);
  }, []);

  const getMainPaper = graphGetMainPaper.bind(flowWrapper);
  const addBlock = graphAddBlock.bind(flowWrapper);
  const removeBlocks = graphRemoveBlocks.bind(flowWrapper);
  const removeConnector = graphRemoveConnector.bind(flowWrapper);
  const addConnector = graphAddConnector.bind(flowWrapper);
  const zoomIn = paperZoomIn.bind(flowWrapper);
  const zoomOut = paperZoomOut.bind(flowWrapper);
  const zoomFit = paperZoomFit.bind(flowWrapper);
  const move = paperMove.bind(flowWrapper);
  const reset = paperReset.bind(flowWrapper);
  const onBlockEvent = paperOnBlockEvent.bind(flowWrapper);
  const onBlockPortEvent = paperOnBlockPortEvent.bind(flowWrapper);
  const onConnectorEvent = paperOnConnectorEvent.bind(flowWrapper);
  const onPaperEvent = paperOnPaperEvent.bind(flowWrapper);
  const onGraphBlockEvent = graphOnGraphBlockEvent.bind(flowWrapper);
  const onGraphConnectorEvent = graphOnGraphConnectorEvent.bind(flowWrapper);
  const serialize = graphSerialize.bind(flowWrapper);
  const deserialize = graphDeserialize.bind(flowWrapper);
  const getConnector = graphGetConnector.bind(flowWrapper);
  const getBlock = graphGetBlock.bind(flowWrapper);
  const drawLasso = graphDrawLasso.bind(flowWrapper);
  const getBlocksInArea = graphGetBlocksInArea.bind(flowWrapper);
  const getBlocksByType = getBlocksByTypeFromMap.bind(flowWrapper);
  const getConnectors = getConnectorsFromMap.bind(flowWrapper);

  const value = {
    bindGraphContainer,
    getMainPaper,
    addBlock,
    removeBlocks,
    removeConnector,
    addConnector,
    zoomIn,
    zoomOut,
    zoomFit,
    move,
    reset,
    onBlockEvent,
    onBlockPortEvent,
    onConnectorEvent,
    onPaperEvent,
    onGraphBlockEvent,
    onGraphConnectorEvent,
    serialize,
    deserialize,
    getConnector,
    getBlock,
    drawLasso,
    getBlocksInArea,
    getBlocksByType,
    getConnectors,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
}

export function useGraph() {
  return useContext(GraphContext);
}

export default GraphContext;
