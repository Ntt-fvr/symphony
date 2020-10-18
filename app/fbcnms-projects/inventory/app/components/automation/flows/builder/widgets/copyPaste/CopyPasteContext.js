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
import emptyFunction from '@fbcnms/util/emptyFunction';
import {
  PREDICATES,
  useKeyboardShortcut,
} from '../keyboardShortcuts/KeyboardShortcutsContext';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useGraph} from '../../canvas/graph/graphAPIContext/GraphContext';
import {useGraphSelection} from '../selection/GraphSelectionContext';

export type CopyPasteContextType = {
  allowDuplicate: boolean,
  allowCopy: boolean,
  allowPaste: boolean,
  duplicate: () => void,
  copy: () => void,
  paste: () => void,
};

const CopyPasteContextDefaults = {
  allowDuplicate: false,
  allowCopy: false,
  allowPaste: false,
  duplicate: emptyFunction,
  copy: emptyFunction,
  paste: emptyFunction,
};

const CopyPasteContext = React.createContext<CopyPasteContextType>(
  CopyPasteContextDefaults,
);

type Props = $ReadOnly<{|
  children: React.Node,
|}>;

export function CopyPasteContextProvider(props: Props) {
  const flow = useGraph();
  const selection = useGraphSelection();

  const [allowDuplicate, setAllowDuplicate] = useState(false);
  const [allowCopy, setAllowCopy] = useState(false);
  const [clipboard, setClipboard] = useState<?(IBlock[])>(null);

  const duplicate = useCallback(() => {
    const blocksToDuplicate = selection.selectedElements;
    const duplicatedBlocks = flow.duplicateBlocks([...blocksToDuplicate]);
    selection.changeSelection(duplicatedBlocks);
  }, [flow, selection]);

  useKeyboardShortcut(
    PREDICATES.combination([PREDICATES.ctrl, PREDICATES.key('d')]),
    duplicate,
  );

  const copy = useCallback(() => {
    if (!allowCopy) {
      return;
    }
    const blocksToDuplicate = selection.selectedElements;
    const duplicatedBlocks = flow.duplicateBlocks(
      [...blocksToDuplicate],
      false,
    );
    setClipboard(duplicatedBlocks);
  }, [allowCopy, flow, selection]);

  useKeyboardShortcut(
    PREDICATES.combination([PREDICATES.ctrl, PREDICATES.key('c')]),
    copy,
  );

  const paste = useCallback(() => {
    if (clipboard == null) {
      return;
    }

    flow.addCopiedBlocks(clipboard);
    setClipboard(null);
    selection.changeSelection(clipboard);
  }, [clipboard, selection, flow]);

  useKeyboardShortcut(
    PREDICATES.combination([PREDICATES.ctrl, PREDICATES.key('v')]),
    paste,
  );

  useEffect(() => {
    setAllowDuplicate(selection.selectedElements.length > 0);
    setAllowCopy(selection.selectedElements.length > 0);
  }, [selection]);

  return (
    <CopyPasteContext.Provider
      value={{
        allowDuplicate,
        allowCopy,
        allowPaste: clipboard != null,
        duplicate,
        copy,
        paste,
      }}>
      {props.children}
    </CopyPasteContext.Provider>
  );
}

export function useCopyPaste() {
  return useContext(CopyPasteContext);
}

export default CopyPasteContext;
