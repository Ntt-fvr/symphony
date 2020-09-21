/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FlowBuilder_FlowDraftQuery} from './__generated__/FlowBuilder_FlowDraftQuery.graphql';

import AddFlowDialog from '../view/AddFlowDialog';
import BlocksBar from './tools/blocksBar/BlocksBar';
import BottomBar from './tools/BottomBar';
import Canvas from './canvas/Canvas';
import React, {useCallback, useEffect, useState} from 'react';
import TopBar from './tools/TopBar';
import fbt from 'fbt/lib/fbt';
import {DetailsPanelContextProvider} from './widgets/detailsPanel/DetailsPanelContext';
import {DialogShowingContextProvider} from '@symphony/design-system/components/Dialog/DialogShowingContext';
import {GraphContextProvider} from './canvas/graph/GraphContext';
import {GraphSelectionContextProvider} from './widgets/selection/GraphSelectionContext';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {generateTempId} from '../../../../common/EntUtils';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useHistory, useLocation} from 'react-router-dom';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
  },
  workspace: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  topBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    pointerEvents: 'none',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    pointerEvents: 'none',
  },
}));

export const NEW_FLOW_PARAM = 'new';
export const TESTING_PURPOSES = 'testing_playground';

export type FlowDraft = $ReadOnly<{
  id: ?string,
  name: ?string,
  description?: ?string,
}>;

const flowQuery = graphql`
  query FlowBuilder_FlowDraftQuery($flowId: ID!) {
    flowDraft: node(id: $flowId) {
      ... on FlowDraft {
        id
        name
        description
      }
    }
  }
`;

export function useFlow(flowId: string): ?FlowDraft {
  const data = useLazyLoadQuery<FlowBuilder_FlowDraftQuery>(flowQuery, {
    flowId,
  });
  return data.flowDraft;
}

const getInitialDefaultFlow: () => FlowDraft = () => {
  return {
    id: generateTempId(),
    name: '',
    description: '',
  };
};

export default function FlowBuilder() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const showDialog = () => setDialogOpen(true);
  const hideDialog = () => setDialogOpen(false);

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const flowId = queryParams.get('flowId');

  const isNewFlowDraft = flowId?.startsWith(NEW_FLOW_PARAM) || false;
  const [flowDraft, setFlowDraft] = useState<?FlowDraft>(
    isNewFlowDraft ? getInitialDefaultFlow() : null,
  );
  const fetchedFlow = useFlow(flowId || '');
  const enqueueSnackbar = useEnqueueSnackbar();

  const handleError = useCallback(
    (error: string) => {
      enqueueSnackbar(error, {variant: 'error'});
    },
    [enqueueSnackbar],
  );

  useEffect(() => {
    if (flowId?.startsWith(TESTING_PURPOSES)) {
      return;
    }
    if (isNewFlowDraft) {
      showDialog();
      return;
    }
    if (fetchedFlow == null) {
      if (flowId != null) {
        handleError(
          `${fbt(
            `Flow with id ${fbt.param(
              'flow id url param',
              flowId,
            )} does not exist.`,
            '',
          )}`,
        );
      }
    }
    setFlowDraft(fetchedFlow);
  }, [handleError, isNewFlowDraft, fetchedFlow, flowId]);

  return (
    <GraphContextProvider>
      <DialogShowingContextProvider>
        <GraphSelectionContextProvider>
          <DetailsPanelContextProvider>
            <div className={classes.root}>
              <BlocksBar flowDraft={flowDraft} />
              <div className={classes.workspace}>
                <TopBar />
                <Canvas />
                <BottomBar />
              </div>
            </div>
            <AddFlowDialog
              open={dialogOpen}
              onClose={hideDialog}
              onSave={flowId => {
                setDialogOpen(false);
                history.push(InventoryAPIUrls.flow(flowId));
              }}
            />
          </DetailsPanelContextProvider>
        </GraphSelectionContextProvider>
      </DialogShowingContextProvider>
    </GraphContextProvider>
  );
}
