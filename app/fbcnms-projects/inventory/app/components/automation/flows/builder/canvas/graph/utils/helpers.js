/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FlowWrapper} from '../GraphContext';
import type {IBlock} from '../shapes/blocks/BaseBlock';
import type {
  ILink,
  LinkEndpoint,
  LinkEventArgs,
} from '../facades/shapes/edges/Link';
import type {
  IVertexView,
  VertexPort,
} from '../facades/shapes/vertexes/BaseVertext';

import {Events} from '../facades/Helpers';
import {PORTS_GROUPS} from '../facades/shapes/vertexes/BaseVertext';

export function handleNewConnections(flow: ?FlowWrapper) {
  if (flow == null) {
    return;
  }

  const handler = (args: LinkEventArgs) => {
    const newLink: ILink = args.model;
    if (flow.connectors.has(newLink.id) || !isLinkValid(flow, newLink)) {
      return;
    }

    const sourceBlock = getLinkEndpointBlock(flow, newLink, 'source');
    if (sourceBlock == null) {
      return;
    }

    const targetBlock = getLinkEndpointBlock(flow, newLink, 'target');
    if (targetBlock == null) {
      return;
    }

    const connector = flow.shapesFactory.createNewConnector(
      sourceBlock,
      targetBlock,
      newLink,
    );
    flow.connectors.set(connector.id, connector);
  };
  flow.paper.on(Events.Connector.MouseUp, handler);
}

function getLinkEndpointBlock(
  flow: ?FlowWrapper,
  link: ILink,
  side: 'source' | 'target',
): ?IBlock {
  if (flow == null) {
    return;
  }

  const linkSide =
    side === 'source' ? link.attributes.source : link.attributes.target;
  if (linkSide.id == null) {
    return;
  }

  return flow.blocks.get(linkSide.id);
}

function isLinkValid(flow: ?FlowWrapper, newLink: ILink) {
  if (
    newLink.attributes.source.id == null ||
    newLink.attributes.target.id == null ||
    newLink.attributes.source.id === newLink.attributes.target.id
  ) {
    return false;
  }
  const portSource = getLinkEndpointPort(flow, newLink.attributes.source);
  const portTarget = getLinkEndpointPort(flow, newLink.attributes.target);

  if (portSource == null || portTarget == null) {
    return false;
  }

  if (portSource.group === portTarget.group) {
    return false;
  }

  if (portSource.group === PORTS_GROUPS.INPUT) {
    newLink.source(newLink.attributes.target);
    newLink.target(newLink.attributes.source);
  }

  return true;
}

function getLinkEndpointPort(
  flow: ?FlowWrapper,
  linkEndpoint: LinkEndpoint,
): ?VertexPort {
  if (flow == null) {
    return;
  }
  if (linkEndpoint.id == null) {
    return;
  }

  const linkEndBlock = flow.blocks.get(linkEndpoint.id);

  if (linkEndBlock == null || linkEndpoint.port == null) {
    return;
  }

  return linkEndBlock.getPortByID(linkEndpoint.port);
}

export function buildPaperConnectionValidation(flowWrapper: {
  current: ?FlowWrapper,
}) {
  return (
    cellViewS: IVertexView,
    magnetS: HTMLElement,
    cellViewT: IVertexView,
    magnetT: HTMLElement,
  ) => {
    if (magnetT != null && magnetT != magnetS) {
      const targetBlockId = cellViewT.model.id;
      const sourceBlockId = cellViewS.model.id;

      if (sourceBlockId === targetBlockId) {
        return false;
      }

      const targetPortId = magnetT.getAttribute('port');
      if (targetPortId == null) {
        return false;
      }

      const targetBlock = flowWrapper.current?.blocks.get(targetBlockId);
      const targetInputPort = targetBlock?.getPortByGroup(PORTS_GROUPS.INPUT);

      if (targetInputPort == null) {
        return false;
      }

      return targetPortId === targetInputPort?.id;
    }
    return false;
  };
}
