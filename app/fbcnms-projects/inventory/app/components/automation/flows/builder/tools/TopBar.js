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
import React from 'react';
import ToolsBar from './ToolsBar';
import {makeStyles} from '@material-ui/styles';
import {useDetailsPane} from '../widgets/detailsPanel/DetailsPanelContext';
import {useFlowData} from '../../data/FlowDataContext';
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
  const detailsPane = useDetailsPane();
  const flowData = useFlowData();

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
        <Button
          onClick={() => {
            try {
              flow.addConnector({
                source: selection.selectedElements[0],
                target: selection.selectedElements[1],
              });
            } catch {
              flow.addConnector({
                source: selection.selectedElements[1],
                target: selection.selectedElements[0],
              });
            }
          }}
          disabled={selection.selectedElements.length !== 2}>
          Connect
        </Button>
      </div>
      <div className={classes.center} />
      <div className={classes.right}>
        <Button onClick={() => detailsPane.toggle()}>Details</Button>
        <Button
          disabled={!flowData.flowDraft?.id}
          onClick={() => flowData.save()}>
          Save
        </Button>
      </div>
    </ToolsBar>
  );
}
