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

import type {Graph, GraphEventCallback, GraphExporter} from './facades/Graph';
import type {
  IVertexModel,
  VertexDescriptor,
  VertexEventCallback,
} from './shapes/vertexes/BaseVertext';
import type {
  LinkDescriptor,
  LinkEventCallback,
} from './shapes/edges/connectors/Link';
import type {Paper, PaperEventCallback} from './facades/Paper';
import type {Position, Rect, Size} from './facades/Helpers';

import * as React from 'react';
import GraphFactory from './GraphFactory';
import Link, {isLink} from './shapes/edges/connectors/Link';
import ShapesFactory, {isVertex} from './shapes/ShapesFactory';
import emptyFunction from '@fbcnms/util/emptyFunction';
import {getRectCenter, getRectDiff} from '../../../utils/helpers';
import {useContext, useRef} from 'react';

export type GraphDescriptor = $ReadOnly<{|
  vertexes: $ReadOnlyArray<VertexDescriptor>,
  links: $ReadOnlyArray<LinkDescriptor>,
|}>;

type AddVertexFunctionType = (
  vertexType: string,
  options?: ?{
    id?: ?string,
    text?: ?string,
    position?: ?Position,
    size?: ?Size,
  },
) => ?IVertexModel;

type AddEdgeFunctionType = (options: {
  source: IVertexModel,
  target: IVertexModel,
}) => ?Link;

const emptySerialization = {
  vertexes: [],
  links: [],
};

export type GraphContextType = {
  bindGraphContainer: HTMLElement => void,
  getMainPaper: () => ?Paper,
  addVertex: AddVertexFunctionType,
  addEdge: AddEdgeFunctionType,
  zoomIn: () => void,
  zoomOut: () => void,
  zoomFit: () => void,
  move: Position => void,
  reset: () => void,
  onVertexEvent: (string, VertexEventCallback) => void,
  onLinkEvent: (string, LinkEventCallback) => void,
  onPaperEvent: (string, PaperEventCallback) => void,
  onGraphEvent: (string, GraphEventCallback) => void,
  serialize: () => ?GraphDescriptor,
  deserialize: string => void,
  getElementsInArea: Rect => Array<IVertexModel>,
};

const GraphContextDefaults = {
  bindGraphContainer: emptyFunction,
  getMainPaper: emptyFunction,
  addVertex: emptyFunction,
  addEdge: emptyFunction,
  zoomIn: emptyFunction,
  zoomOut: emptyFunction,
  zoomFit: emptyFunction,
  move: emptyFunction,
  reset: emptyFunction,
  onVertexEvent: emptyFunction,
  onLinkEvent: emptyFunction,
  onPaperEvent: emptyFunction,
  onGraphEvent: emptyFunction,
  serialize: () => emptySerialization,
  deserialize: emptyFunction,
  getElementsInArea: () => [],
};

const GraphContext = React.createContext<GraphContextType>(
  GraphContextDefaults,
);

type Props = {|
  children: React.Node,
|};

function graphAddVertex(
  vertexType: string,
  options: ?{
    id?: ?string,
    text?: ?string,
    position: ?Position,
    size?: ?Size,
  },
) {
  const graph = this.current?.graph;
  if (graph == null) {
    return;
  }

  const position = options?.position || {x: 0, y: 0};
  const size = options?.size ?? {width: 80, height: 40};

  const newVertex = ShapesFactory.createVertex(vertexType);
  newVertex.resize(size.width, size.height);
  newVertex.position(position.x, position.y);
  newVertex.attr({
    label: {
      text: options?.text ?? 'step',
    },
  });

  newVertex.addTo(graph);

  return newVertex;
}

function graphAddEdge(options: {source: IVertexModel, target: IVertexModel}) {
  const graph = this.current?.graph;
  if (graph == null) {
    return;
  }

  const link = ShapesFactory.createEdge();

  link.source(options?.source);
  link.target(options?.target);
  link.addTo(graph);

  return link;
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
    this.current.paperTranslation.x = 0;
    this.current.paperTranslation.y = 0;
  } else {
    this.current.paperTranslation.x += translation.x;
    this.current.paperTranslation.y += translation.y;
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

function paperOnVertexEvent(event: string, handler: VertexEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.paper.on(event, handler);
}

function paperOnPaperEvent(event: string, handler: PaperEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.paper.on(event, handler);
}

function paperOnLinkEvent(event: string, handler: LinkEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.paper.on(event, handler);
}

function graphOnGraphEvent(event: string, handler: GraphEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.graph.on(event, handler);
}

function graphSerialize(): ?GraphDescriptor {
  if (this.current == null) {
    return;
  }
  const jsonObject: GraphExporter = this.current.graph.toJSON();

  const vertexes: $ReadOnlyArray<VertexDescriptor> = jsonObject.cells
    .map(cell =>
      isVertex(cell) && cell.position != null
        ? {
            type: cell.type,
            id: cell.id,
            position: cell.position,
          }
        : null,
    )
    .filter(Boolean);
  const links: $ReadOnlyArray<LinkDescriptor> = jsonObject.cells
    .map(cell =>
      isLink(cell) && cell.source != null && cell.target != null
        ? {
            id: cell.id,
            sourceId: cell.source.id,
            targetId: cell.target.id,
          }
        : null,
    )
    .filter(Boolean);

  return {
    vertexes,
    links,
  };
}

function graphDeserialize(json: string) {
  const graphDescriptor: GraphDescriptor = JSON.parse(json);

  if (graphDescriptor.vertexes == null) {
    return;
  }

  const newVertexesMap = new Map<string, IVertexModel>();
  graphDescriptor.vertexes.forEach(vertex => {
    const newVertex = graphAddVertex.call(this, vertex.type, {
      position: vertex.position,
    });
    if (newVertex == null) {
      return;
    }
    newVertexesMap.set(vertex.id, newVertex);
  });

  if (graphDescriptor.links == null) {
    return;
  }

  graphDescriptor.links.forEach(link => {
    const vSource = newVertexesMap.get(link.sourceId);
    const vTarget = newVertexesMap.get(link.targetId);
    if (vSource == null || vTarget == null) {
      return;
    }
    graphAddEdge.call(this, {
      source: vSource,
      target: vTarget,
    });
  });
}

function graphGetElementsInArea(rect: Rect): Array<IVertexModel> {
  if (this.current == null) {
    return [];
  }
  return this.current.graph.findModelsInArea(rect);
}

function graphGetMainPaper(): ?Paper {
  return this.current?.paper;
}

type FlowWrapper = {|
  graph: Graph,
  paper: Paper,
  paperScale: number,
  paperTranslation: Position,
|};

export function GraphContextProvider(props: Props) {
  const {children} = props;
  const flowWrapper = useRef<?FlowWrapper>();

  const bindGraphContainer = containerElement => {
    const graph = new GraphFactory.Graph();
    const paper = new GraphFactory.Paper({
      el: containerElement,
      model: graph,
      width: 'calc(100% - 1px)',
      height: 'calc(100% - 1px)',
      gridSize: 1,
      background: {
        color: 'white',
      },
    });

    flowWrapper.current = {
      graph,
      paper,
      paperScale: 1,
      paperTranslation: {
        x: 0,
        y: 0,
      },
    };
  };

  const getMainPaper = graphGetMainPaper.bind(flowWrapper);
  const addVertex = graphAddVertex.bind(flowWrapper);
  const addEdge = graphAddEdge.bind(flowWrapper);
  const zoomIn = paperZoomIn.bind(flowWrapper);
  const zoomOut = paperZoomOut.bind(flowWrapper);
  const zoomFit = paperZoomFit.bind(flowWrapper);
  const move = paperMove.bind(flowWrapper);
  const reset = paperReset.bind(flowWrapper);
  const onVertexEvent = paperOnVertexEvent.bind(flowWrapper);
  const onLinkEvent = paperOnLinkEvent.bind(flowWrapper);
  const onPaperEvent = paperOnPaperEvent.bind(flowWrapper);
  const onGraphEvent = graphOnGraphEvent.bind(flowWrapper);
  const serialize = graphSerialize.bind(flowWrapper);
  const deserialize = graphDeserialize.bind(flowWrapper);
  const getElementsInArea = graphGetElementsInArea.bind(flowWrapper);

  const value = {
    bindGraphContainer,
    getMainPaper,
    addVertex,
    addEdge,
    zoomIn,
    zoomOut,
    zoomFit,
    move,
    reset,
    onVertexEvent,
    onLinkEvent,
    onPaperEvent,
    onGraphEvent,
    serialize,
    deserialize,
    getElementsInArea,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
}

export function useGraph() {
  return useContext(GraphContext);
}

export default GraphContext;
