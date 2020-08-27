/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  ChangeSelectionFunc,
  IsIgnoredElementFunc,
} from './GraphSelectionContext';
import type {IShape} from '../../canvas/graph/shapes/BaseShape';
import type {
  IVertexModel,
  Vertex,
} from '../../canvas/graph/shapes/vertexes/BaseVertext';

import {Events} from '../../canvas/graph/facades/Helpers';
import {isVertex} from '../../canvas/graph/shapes/ShapesFactory';
import {useCallback, useEffect, useState} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';

const useExplicitSelection = (
  changeSelection: ChangeSelectionFunc,
  isIgnoredElement: IsIgnoredElementFunc,
) => {
  const [
    explicitlySelectedElement,
    setExplicitlySelectedElement,
  ] = useState<?IVertexModel>();

  const flow = useGraph();

  useEffect(() => {
    setExplicitlySelectedElement(null);
    if (
      explicitlySelectedElement == null ||
      isIgnoredElement(explicitlySelectedElement)
    ) {
      return;
    }
    changeSelection(explicitlySelectedElement);
  }, [changeSelection, explicitlySelectedElement, isIgnoredElement]);

  const onVertexClicked = useCallback((element: Vertex) => {
    setExplicitlySelectedElement(element.model);
  }, []);

  const onVertexCreated = useCallback((newShpae: IShape) => {
    if (!isVertex(newShpae)) {
      return;
    }
    // eslint-disable-next-line no-warning-comments
    // $FlowFixMe: Improve flow Graph typings
    const newVertex: IVertexModel = newShpae;
    setExplicitlySelectedElement(newVertex);
  }, []);

  useEffect(() => {
    flow.onVertexEvent(Events.VertexMouseUp, onVertexClicked);
    flow.onGraphEvent(Events.VertexAdded, onVertexCreated);
  }, [flow, onVertexClicked, onVertexCreated]);
};

export default useExplicitSelection;
