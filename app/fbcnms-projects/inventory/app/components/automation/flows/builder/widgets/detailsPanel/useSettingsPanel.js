/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import BlockSettings from './blockSettings/BlockSettings';
import FlowSettings from './flowSettings/FlowSettings';
import FlowTitle from './flowSettings/FlowTitle';
import SelectionSettings from './selectionSettings/SelectionSettings';
import {makeStyles} from '@material-ui/styles';
import {useDialogShowingContext} from '@symphony/design-system/components/Dialog/DialogShowingContext';
import {useEffect} from 'react';
import {useGraphSelection} from '../selection/GraphSelectionContext';
import {useKeyboardShortcuts} from '../keyboardShortcuts/KeyboardShortcutsContext';

type SettingsPanelType = $ReadOnly<{|
  title: React.Node,
  children: React.Node,
|}>;

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: '6px',
  },
}));

export default function useSettingsPanel(): SettingsPanelType {
  const classes = useStyles();
  const selection = useGraphSelection();
  const selectionCount = selection.selectedElements.length;

  const keyboardShortcutsContext = useKeyboardShortcuts();

  const noSelectionDetails = () => ({
    title: <FlowTitle className={classes.title} />,
    children: (
      <KeyboardShortcutsBlocker
        block={keyboardShortcutsContext.blockShortcuts}
        unblock={keyboardShortcutsContext.unblockShortcuts}>
        <FlowSettings />
      </KeyboardShortcutsBlocker>
    ),
  });

  const singleSelectionDetails = () => ({
    title: 'Block Settings',
    children: (
      <KeyboardShortcutsBlocker
        block={keyboardShortcutsContext.blockShortcuts}
        unblock={keyboardShortcutsContext.unblockShortcuts}>
        <BlockSettings block={selection.selectedElements[0]} />
      </KeyboardShortcutsBlocker>
    ),
  });

  const multiSelectionDetails = () => ({
    title: 'Selection Settings',
    children: (
      <KeyboardShortcutsBlocker
        block={keyboardShortcutsContext.blockShortcuts}
        unblock={keyboardShortcutsContext.unblockShortcuts}>
        <SelectionSettings selection={selection} />
      </KeyboardShortcutsBlocker>
    ),
  });

  if (selectionCount === 0) {
    return noSelectionDetails();
  }
  if (selectionCount === 1) {
    return singleSelectionDetails();
  }
  return multiSelectionDetails();
}

type KeyboardShortcutsBlockerProps = $ReadOnly<{|
  children: React.Node,
  block: () => void,
  unblock: () => void,
|}>;

function KeyboardShortcutsBlocker(props: KeyboardShortcutsBlockerProps) {
  const {children, block, unblock} = props;

  const dialogShowingContext = useDialogShowingContext();
  useEffect(() => {
    if (dialogShowingContext.isShown) {
      block();
    } else {
      unblock();
    }
  }, [dialogShowingContext.isShown, block, unblock]);

  return children;
}
