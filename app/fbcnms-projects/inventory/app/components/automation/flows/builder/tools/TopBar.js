/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import FlowBuilderButton from '../../utils/FlowBuilderButton';
import React, {useCallback} from 'react';
import Strings from '@fbcnms/strings/Strings';
import ToolsBar from './ToolsBar';
import {
  PREDICATES,
  useKeyboardShortcut,
} from '../widgets/keyboardShortcuts/KeyboardShortcutsContext';
import {SettingsIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useCopyPaste} from '../widgets/copyPaste/CopyPasteContext';
import {useDetailsPane} from '../widgets/detailsPanel/DetailsPanelContext';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useFlowData} from '../../data/FlowDataContext';
import {useGraph} from '../canvas/graph/graphAPIContext/GraphContext';
import {useGraphSelection} from '../widgets/selection/GraphSelectionContext';

const useStyles = makeStyles(() => ({
  root: {
    top: 0,
  },
  right: {
    display: 'flex',
  },
  center: {
    flexGrow: 1,
  },
  left: {},
}));

export default function TopBar() {
  const classes = useStyles();

  const flow = useGraph();
  const selection = useGraphSelection();
  const detailsPane = useDetailsPane();
  const flowData = useFlowData();
  const enqueueSnackbar = useEnqueueSnackbar();
  const copyPaste = useCopyPaste();

  const deleteSelected = useCallback(() => {
    if (selection.selectedLink) {
      return flow.removeConnector(selection.selectedLink);
    } else {
      return flow.removeBlocks([...selection.selectedElements]);
    }
  }, [flow, selection]);
  useKeyboardShortcut(PREDICATES.del, deleteSelected);

  const save = useCallback(() => {
    flowData
      .save()
      .then(() => {
        enqueueSnackbar('Flow draft has been saved!', {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(
          'There was an error when trying to save the flow draft.',
          {
            variant: 'error',
          },
        );
      });
  }, [enqueueSnackbar, flowData]);
  useKeyboardShortcut(PREDICATES.key('s'), save);

  return (
    <ToolsBar className={classes.root}>
      <div className={classes.left}>
        <Button
          onClick={deleteSelected}
          disabled={
            selection.selectedElements.length == 0 && !selection.selectedLink
          }>
          Delete
        </Button>
        <Button onClick={copyPaste.copy} disabled={!copyPaste.allowCopy}>
          Copy
        </Button>
        <Button onClick={copyPaste.paste} disabled={!copyPaste.allowPaste}>
          Paste
        </Button>
        <Button
          onClick={copyPaste.duplicate}
          disabled={!copyPaste.allowDuplicate}>
          Duplicate
        </Button>
      </div>
      <div className={classes.center} />
      <div className={classes.right}>
        <FlowBuilderButton icon={SettingsIcon} onClick={detailsPane.toggle} />
        <Button disabled={!flowData.flowDraft?.id} onClick={save}>
          {Strings.common.saveButton}
        </Button>
      </div>
    </ToolsBar>
  );
}
