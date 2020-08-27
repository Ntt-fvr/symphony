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
import type {GraphContextType} from '../../canvas/graph/GraphContext';
import type {IVertexModel} from '../../canvas/graph/shapes/vertexes/BaseVertext';
import type {Position} from '../../canvas/graph/facades/Helpers';

import Lasso, {
  TYPE as LassoType,
} from '../../canvas/graph/shapes/vertexes/helpers/Lasso';
import {Events} from '../../canvas/graph/facades/Helpers';
import {convertPointsToRect} from '../../../utils/helpers';
import {useCallback, useEffect, useState} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';

function createSelectionMarkup(
  flow: GraphContextType,
  position: Position,
): ?Lasso {
  const lasso = flow.addVertex(LassoType, {
    position: position,
    size: {width: 0, height: 0},
  });

  // eslint-disable-next-line no-warning-comments
  // $FlowFixMe - change Lasso implementation
  return lasso;
}

function wrapSelectedElementsWithContainerIfNeeded(
  container: Lasso,
  elements: ?$ReadOnlyArray<IVertexModel>,
): boolean {
  if (Array.isArray(elements) && elements.length > 1) {
    elements.forEach(element => {
      container.embed(element);
    });
  } else {
    return false;
  }

  container.setFinalSelection();

  return true;
}

type LassoSelectionApi = {
  checkIfElementShouldBeIgnored: IsIgnoredElementFunc,
};

export default function useLassoSelection(
  selectedElements: $ReadOnlyArray<IVertexModel>,
  changeSelection: ChangeSelectionFunc,
): LassoSelectionApi {
  const [selectionStart, setSelectionStart] = useState<?Position>(null);
  const [selectionEnd, setSelectionEnd] = useState<?Position>(null);
  const [
    selectionProgressMarkup,
    setSelectionProgressMarkup,
  ] = useState<?Lasso>();
  const [
    finalSelectionContainer,
    setFinalSelectionContainer,
  ] = useState<?Lasso>();

  const flow = useGraph();

  const startSelection = useCallback(
    (startPosition: Position) => {
      setSelectionStart(startPosition);
      setSelectionProgressMarkup(() =>
        // As long as selection markup is Rectangle and Elements are Rectangles,
        // need to keep in function
        createSelectionMarkup(flow, startPosition),
      );
    },
    [flow],
  );

  const clearSelection = useCallback(() => {
    setFinalSelectionContainer(currentSelectionGroup => {
      if (currentSelectionGroup != null) {
        const elements = currentSelectionGroup.getEmbeddedCells();
        elements.forEach(element => currentSelectionGroup.unembed(element));
        currentSelectionGroup.remove();
      }

      return null;
    });
  }, []);

  const changeSelectionMarkupToSelectionContainer = useCallback(() => {
    setSelectionProgressMarkup(currentMarkup => {
      if (currentMarkup != null) {
        const newFinalSelectionContainer = currentMarkup;
        setFinalSelectionContainer(newFinalSelectionContainer);
      }
      return null;
    });
  }, []);

  const stopSelection = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    changeSelectionMarkupToSelectionContainer();
  }, [changeSelectionMarkupToSelectionContainer]);

  const onDragStartHandler = useCallback(
    (e, x, y) => {
      clearSelection();
      startSelection({x, y});
      setSelectionEnd({x, y});
    },
    [clearSelection, startSelection],
  );

  const onDragHandler = useCallback((e, x, y) => setSelectionEnd({x, y}), []);

  const onDragDoneHandler = stopSelection;

  useEffect(() => {
    if (finalSelectionContainer == null) {
      return;
    }
    const haveLassoSelection = wrapSelectedElementsWithContainerIfNeeded(
      finalSelectionContainer,
      selectedElements,
    );
    if (!haveLassoSelection) {
      clearSelection();
    }
  }, [selectedElements, finalSelectionContainer, clearSelection]);

  useEffect(() => {
    if (selectionStart == null || selectionEnd == null) {
      return;
    }

    const selectionRect = convertPointsToRect(selectionStart, selectionEnd);

    if (selectionProgressMarkup != null) {
      selectionProgressMarkup.position(selectionRect.x, selectionRect.y);
      selectionProgressMarkup.resize(selectionRect.width, selectionRect.height);
    }

    const elements = flow.getElementsInArea(selectionRect);
    const newSelection = elements.filter(
      element => element != selectionProgressMarkup,
    );
    changeSelection(newSelection);
  }, [
    changeSelection,
    selectionEnd,
    selectionProgressMarkup,
    selectionStart,
    flow,
  ]);

  useEffect(() => {
    flow.onPaperEvent(Events.BackdropMouseDown, onDragStartHandler);
    flow.onPaperEvent(Events.BackdropMouseDrag, onDragHandler);
    flow.onPaperEvent(Events.BackdropMouseUp, onDragDoneHandler);
  }, [onDragStartHandler, onDragHandler, flow, onDragDoneHandler]);

  const checkIfElementShouldBeIgnored = useCallback(
    (element: ?IVertexModel) =>
      element == null ||
      element === finalSelectionContainer ||
      element === selectionProgressMarkup,
    [finalSelectionContainer, selectionProgressMarkup],
  );

  return {
    checkIfElementShouldBeIgnored,
  };
}
