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

import type {ExtendedMouseEvent} from '../facades/Helpers';
import type {FlowWrapperReference} from './GraphContext';
import type {GraphEventCallback} from '../facades/Graph';
import type {IBlock} from '../shapes/blocks/BaseBlock';
import type {IConnector} from '../shapes/connectors/BaseConnector';
import type {IShape} from '../facades/shapes/BaseShape';
import type {
  IVertexView,
  VertexEventCallback,
  VertexPortEventCallback,
} from '../facades/shapes/vertexes/BaseVertext';
import type {
  LinkEventArgs,
  LinkEventCallback,
} from '../facades/shapes/edges/Link';
import type {PaperEventCallback} from '../facades/Paper';

import {Events, restrictPosition} from '../facades/Helpers';

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

export type GraphEvent = 'add' | 'remove' | 'change';
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
  | 'link:pointerup'
  | 'link:contextmenu';

export type GraphEventsAPI = $ReadOnly<{|
  onGraphEvent: (GraphEvent, GraphEventCallback) => void,
  onGraphBlockEvent: (GraphEvent, GraphBlockEventCallback) => void,
  onGraphConnectorEvent: (GraphEvent, GraphConnectorEventCallback) => void,
  onPaperEvent: (PaperEvent, PaperEventCallback) => void,
  offPaperEvent: (PaperEvent, PaperEventCallback) => void,
  onBlockEvent: (BlockEvent, BlockEventCallback) => void,
  onBlockPortEvent: (BlockEvent, BlockPortEventCallback) => void,
  onConnectorEvent: (ConnectorEvent, ConnectorEventCallback) => void,
|}>;

export default function graphEventsAPIProvider(
  flowWrapper: FlowWrapperReference,
): GraphEventsAPI {
  const onBlockEvent = paperOnBlockEvent.bind(flowWrapper);
  const onBlockPortEvent = paperOnBlockPortEvent.bind(flowWrapper);
  const onConnectorEvent = paperOnConnectorEvent.bind(flowWrapper);
  const onPaperEvent = paperOnPaperEvent.bind(flowWrapper);
  const offPaperEvent = paperOffPaperEvent.bind(flowWrapper);
  const onGraphEvent = graphOnEvent.bind(flowWrapper);
  const onGraphBlockEvent = graphOnGraphBlockEvent.bind(flowWrapper);
  const onGraphConnectorEvent = graphOnGraphConnectorEvent.bind(flowWrapper);

  return {
    onBlockEvent,
    onBlockPortEvent,
    onConnectorEvent,
    onPaperEvent,
    offPaperEvent,
    onGraphEvent,
    onGraphBlockEvent,
    onGraphConnectorEvent,
  };
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
    vertexView.model.attributes.parent &&
      block.setParent(vertexView.model.attributes.parent);
    handler(block, generalEventArgs, positionX, positionY);
  };

  this.current.paper.on(event, wrappedHandler);
  this.current?.graph.on('change:position', cell => {
    const graph = this.current?.graph;
    restrictPosition(cell, graph);
  });

  this.current?.graph.on('change:embeds', element => {
    const BIG_SIZE_COUPLED = 'bigSizeCoupled';
    const MEDIUM_SIZE_COUPLED = 'mediumSizeCoupled';
    const BLOCK_LIMIT = 4;
    const BLOCK_LIMIT_BIG = 6;

    const blockList = [...this.current?.blocks]
      .flat()
      .filter(item => item?.type?.includes('Block') && item);

    const childrenBlocksList: Array<string> = element.attributes.embeds.filter(
      el => blockList.find(block => block.id === el),
    );

    const blockParent = blockList.find(block => block.model.id === element.id);

    if (
      childrenBlocksList.length > BLOCK_LIMIT &&
      childrenBlocksList.length < BLOCK_LIMIT_BIG
    ) {
      blockParent?.setSize(MEDIUM_SIZE_COUPLED);
    }

    if (childrenBlocksList.length > BLOCK_LIMIT_BIG) {
      blockParent?.setSize(BIG_SIZE_COUPLED);
    }
  });
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

function paperOffPaperEvent(event: PaperEvent, handler: PaperEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.paper.off(event, handler);
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

function graphOnGraphBlockEvent(
  event: GraphEvent,
  handler: GraphBlockEventCallback,
) {
  callGraphEventHandler.call<IBlock>(
    this,
    event,
    this.current?.blocks,
    handler,
  );
}

function graphOnEvent(event: GraphEvent, handler: GraphEventCallback) {
  if (this.current == null) {
    return;
  }
  this.current.graph.on(event, handler);
}

function graphOnGraphConnectorEvent(
  event: GraphEvent,
  handler: GraphConnectorEventCallback,
) {
  callGraphEventHandler.call<IConnector>(
    this,
    event,
    this.current?.connectors,
    handler,
  );
}

function callGraphEventHandler<T: IBlock | IConnector>(
  eventName: GraphEvent,
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
  graphOnEvent.call(this, eventName, wrappedHandler);
}
