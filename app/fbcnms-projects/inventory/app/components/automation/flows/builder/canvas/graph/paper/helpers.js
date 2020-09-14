/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {Graph, GraphEventCallback} from '../facades/Graph';
import type {ILink} from '../facades/shapes/edges/Link';
import type {IShape} from '../facades/shapes/BaseShape';
import type {Paper} from '../facades/Paper';
import type {VertexEventCallback} from '../facades/shapes/vertexes/BaseVertext';

import symphony from '@symphony/design-system/theme/symphony';
import {Events} from '../facades/Helpers';

export function handleNewConnections(
  graph: Graph,
  onNewConnectionCallback: ILink => void,
) {
  const handler: GraphEventCallback = (addedShape: IShape) => {
    if (addedShape.isLink() != true) {
      return;
    }

    // eslint-disable-next-line no-warning-comments
    // $FlowFixMe - is it possible to cast otherwise?
    const newLink: ILink = addedShape;
    onNewConnectionCallback(newLink);
  };
  graph.on(Events.Graph.OnAdd, handler);
}

function stroke(element: HTMLElement, strokeValue?: string): string {
  const elementStroke = element.attributes['stroke'];
  if (strokeValue) {
    elementStroke.nodeValue = strokeValue;
  }
  return strokeValue ?? elementStroke.nodeValue;
}

export function handleMagnetPorts(paper: Paper) {
  let hovered: ?{
    element: HTMLElement,
    originalStroke: string,
  } = null;
  // paper.options.validateMagnet = () => {
  //   return false;
  // };

  const onHoverIn: VertexEventCallback = (hoveredVertex, eventArgs) => {
    const port = hoveredVertex.findAttribute('port', eventArgs.target);
    if (port) {
      hovered = {
        element: eventArgs.target,
        originalStroke: stroke(eventArgs.target),
      };
      stroke(hovered.element, symphony.palette.primary);
      hovered.element.style.cursor = 'pointer';
    }
  };

  const onHoverOut: VertexEventCallback = () => {
    if (hovered != null) {
      stroke(hovered.element, hovered.originalStroke);
    }
    hovered = null;
  };

  paper.on(Events.Block.MouseOver, onHoverIn);
  paper.on(Events.Block.MouseOut, onHoverOut);
}
