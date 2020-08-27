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

import * as React from 'react';
import useExplicitSelection from './useExplicitSelection';
import useLassoSelection from './useLassoSelection';
import useLinkSelection from './useLinkSelection';
import {highlight, unhighlight} from '../../../utils/helpers';
import {useCallback, useContext, useState} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';

type SelectedElement = $ReadOnly<IVertexModel>;

export type Selection = $ReadOnlyArray<SelectedElement>;
export type GraphSelectionContextType = {
  selectedElements: Selection,
};

const GraphSelectionContextDefaults = {
  selectedElements: [],
};

const GraphSelectionContext = React.createContext<GraphSelectionContextType>(
  GraphSelectionContextDefaults,
);

export type ChangeSelectionFunc = (SelectedElement | Selection) => void;

export type IsIgnoredElementFunc = IVertexModel => boolean;

type Props = {|
  children: React.Node,
|};

export function GraphSelectionContextProvider(props: Props) {
  const [selectedElements, setSelectedElements] = useState<
    $ReadOnlyArray<IVertexModel>,
  >([]);

  const flow = useGraph();

  const changeSelection: ChangeSelectionFunc = useCallback(
    (newSelection: IVertexModel | $ReadOnlyArray<IVertexModel>) => {
      const newSelectedElements: $ReadOnlyArray<IVertexModel> = Array.isArray(
        newSelection,
      )
        ? newSelection
        : [newSelection];

      setSelectedElements(previousSelectedElements => {
        if (previousSelectedElements != null) {
          previousSelectedElements
            .filter(element => !newSelectedElements.includes(element))
            .forEach(element => unhighlight(flow, element));
        }
        newSelectedElements
          .filter(
            element => !(previousSelectedElements || []).includes(element),
          )
          .forEach(element => highlight(flow, element));

        return newSelectedElements;
      });
    },
    [],
  );

  const {checkIfElementShouldBeIgnored} = useLassoSelection(
    selectedElements,
    changeSelection,
  );
  useExplicitSelection(changeSelection, checkIfElementShouldBeIgnored);
  useLinkSelection();

  return (
    <GraphSelectionContext.Provider
      value={{
        selectedElements: selectedElements ?? [],
      }}>
      {props.children}
    </GraphSelectionContext.Provider>
  );
}

export function useGraphSelection() {
  return useContext(GraphSelectionContext);
}

export default GraphSelectionContext;
