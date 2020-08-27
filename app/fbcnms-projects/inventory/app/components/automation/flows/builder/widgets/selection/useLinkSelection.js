/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IVertexModel} from '../../canvas/graph/shapes/vertexes/BaseVertext';

import Link, {isLink} from '../../canvas/graph/shapes/edges/connectors/Link';
import {Events} from '../../canvas/graph/facades/Helpers';
import {useCallback, useEffect, useRef} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';

export default function useLinkSelection() {
  const flow = useGraph();
  const originalTarget = useRef<?IVertexModel>(null);

  const onLinkMouseDown = useCallback((cellView, evt) => {
    if (!isLink(cellView.model)) {
      return;
    }
    // eslint-disable-next-line no-warning-comments
    // $FlowFixMe: Improve flow Graph typings
    const link: Link = cellView.model;
    originalTarget.current = link.getTargetElement();
    const position = {x: evt.clientX, y: evt.clientY};
    link.snapTargetToPointer(cellView.paper, position);
  }, []);

  const onCellMouseUp = useCallback((cellView, evt) => {
    if (originalTarget.current == null || !isLink(cellView.model)) {
      return;
    }
    // eslint-disable-next-line no-warning-comments
    // $FlowFixMe: Improve flow Graph typings
    const link: Link = cellView.model;
    const position = {x: evt.clientX, y: evt.clientY};
    link.tryAttachingAtPoint(cellView.paper, position, originalTarget.current);
    originalTarget.current = null;
  }, []);

  useEffect(() => {
    flow.onLinkEvent(Events.LinkMouseDown, onLinkMouseDown);
    flow.onLinkEvent(Events.LinkMouseUp, onCellMouseUp);
  }, [onLinkMouseDown, flow, onCellMouseUp]);
}
