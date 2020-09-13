/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {Events} from '../../canvas/graph/facades/Helpers';
import {isLink} from '../../canvas/graph/facades/shapes/edges/Link';
import {useCallback, useEffect} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';
import type {ChangeLinkSelectionFunc} from './GraphSelectionContext';

export default function useLinkSelection(
  changeLinkSelection: ChangeLinkSelectionFunc,
) {
  const flow = useGraph();

  const onConnectorMouseDown = useCallback((connector, evt) => {
    if (!isLink(connector.model)) {
      return;
    }
    const position = {x: evt.clientX, y: evt.clientY};
    connector.snapTargetToPointer(position);
  }, []);

  const onConnectorMouseUp = useCallback(
    (connector, evt) => {
      const position = {x: evt.clientX, y: evt.clientY};
      connector.tryAttachingAtPoint(position, flow);
      changeLinkSelection(connector);
    },
    [flow, changeLinkSelection],
  );

  useEffect(() => {
    flow.onConnectorEvent(Events.Connector.MouseDown, onConnectorMouseDown);
    flow.onConnectorEvent(Events.Connector.MouseUp, onConnectorMouseUp);
  }, [onConnectorMouseDown, flow, onConnectorMouseUp]);
}
