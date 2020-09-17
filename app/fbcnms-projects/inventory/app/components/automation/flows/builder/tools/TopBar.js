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
import JsonInputDialog from './JsonInputDialog';
import React, {useCallback} from 'react';
import ToolsBar from './ToolsBar';
import {makeStyles} from '@material-ui/styles';
import {useDialogShowingContext} from '@symphony/design-system/components/Dialog/DialogShowingContext';
import {useGraph} from '../canvas/graph/GraphContext';
import {useGraphSelection} from '../widgets/selection/GraphSelectionContext';

const useStyles = makeStyles(() => ({
  root: {
    top: 0,
  },
  right: {},
  center: {
    flexGrow: 1,
  },
  left: {},
}));

export default function TopBar() {
  const classes = useStyles();

  const flow = useGraph();
  const selection = useGraphSelection();

  const dialogShowingContext = useDialogShowingContext();

  const showLoadJsonDialog = useCallback(() => {
    const jsonObj = flow.serialize();
    const jsonInitialValue = JSON.stringify(jsonObj) || '';
    dialogShowingContext.showDialog(
      {
        title: 'Load JSON',
        children: (
          <JsonInputDialog
            json={jsonInitialValue}
            onSave={newJsonValue => {
              flow.deserialize(newJsonValue);
              dialogShowingContext.hideDialog();
            }}
            onClose={dialogShowingContext.hideDialog}
          />
        ),
        onClose: dialogShowingContext.hideDialog,
      },
      true,
    );
  }, [dialogShowingContext, flow]);

  return (
    <ToolsBar className={classes.root}>
      <div className={classes.left}>
        <Button
          onClick={() => {
            if (selection.selectedLink) {
              return flow.removeConnector(selection.selectedLink);
            } else {
              return flow.removeBlocks([...selection.selectedElements]);
            }
          }}
          disabled={
            selection.selectedElements.length == 0 && !selection.selectedLink
          }>
          Delete
        </Button>
      </div>
      <div className={classes.center} />
      <div className={classes.right}>
        <Button onClick={() => showLoadJsonDialog()}>Load JSON</Button>
      </div>
    </ToolsBar>
  );
}
