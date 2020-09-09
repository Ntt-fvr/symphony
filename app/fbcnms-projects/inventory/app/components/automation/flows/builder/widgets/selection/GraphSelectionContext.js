/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlock} from '../../canvas/graph/shapes/blocks/BaseBlock';

import * as React from 'react';
import useExplicitSelection from './useExplicitSelection';
import useLassoSelection from './useLassoSelection';
import useLinkSelection from './useLinkSelection';
import {Events} from '../../canvas/graph/facades/Helpers';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useGraph} from '../../canvas/graph/GraphContext';

type SelectedElement = $ReadOnly<IBlock>;

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

export type IsIgnoredElementFunc = IBlock => boolean;

type Props = {|
  children: React.Node,
|};

export function GraphSelectionContextProvider(props: Props) {
  const flow = useGraph();
  const [selectedElements, setSelectedElements] = useState<
    $ReadOnlyArray<IBlock>,
  >([]);

  const changeSelection: ChangeSelectionFunc = useCallback(
    (newSelection: IBlock | $ReadOnlyArray<IBlock>) => {
      const newSelectedElements: $ReadOnlyArray<IBlock> = Array.isArray(
        newSelection,
      )
        ? newSelection
        : [newSelection];

      setSelectedElements(previousSelectedElements => {
        if (previousSelectedElements != null) {
          previousSelectedElements
            .filter(element => !newSelectedElements.includes(element))
            .forEach(element => element.deselect());
        }
        newSelectedElements
          .filter(
            element => !(previousSelectedElements || []).includes(element),
          )
          .forEach(element => element.select());

        return newSelectedElements;
      });
    },
    [],
  );

  const {checkIfElementShouldBeIgnored} = useLassoSelection(
    selectedElements,
    changeSelection,
  );

  const onBlockRemoved = useCallback(() => {
    setSelectedElements([]);
  }, []);

  useExplicitSelection(changeSelection, checkIfElementShouldBeIgnored);
  useLinkSelection();

  useEffect(() => {
    flow.onGraphEvent(Events.Graph.BlockRemoved, onBlockRemoved);
  }, [flow, onBlockRemoved]);

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
