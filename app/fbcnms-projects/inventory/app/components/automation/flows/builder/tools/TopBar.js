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
import React from 'react';
import Strings from '@fbcnms/strings/Strings';
import ToolsBar from './ToolsBar';
import {SettingsIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
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
        <FlowBuilderButton icon={SettingsIcon} onClick={detailsPane.toggle} />
        <Button
          disabled={!flowData.flowDraft?.id}
          onClick={() =>
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
              })
          }>
          {Strings.common.saveButton}
        </Button>
      </div>
    </ToolsBar>
  );
}
