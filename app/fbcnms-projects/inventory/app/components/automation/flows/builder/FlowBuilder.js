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
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import Canvas from './canvas/Canvas';
import DetailsPane from './tools/DetailsPane';
import JsonViewer from './tools/JsonViewer';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Toolbar from './tools/Toolbar';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import fbt from 'fbt/lib/fbt';
import {AUTOMATION_FLOWS_VIEW_HEADER} from '../view/AutomationFlowsView';
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
  },
  ide: {
    display: 'flex',
    flexGrow: 1,
  },
  rightPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  rightPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  canvasContainer: {
    position: 'relative',
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 4,
    padding: '0 16px',
  },
  leftPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
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

  const flowName = flowDraft?.name;
  const title = useMemo(() => {
    const breadcrumbs = [
      {
        id: 'automation_flows',
        name: AUTOMATION_FLOWS_VIEW_HEADER,
        onClick: () => history.replace(InventoryAPIUrls.flows()),
      },
    ];
    if (flowName != null && flowName.length > 0) {
      breadcrumbs.push({
        id: 'flow',
        name: flowName,
      });
    }
    return <Breadcrumbs breadcrumbs={breadcrumbs} size="large" />;
  }, [flowName, history]);

  return (
    <GraphContextProvider>
      <GraphSelectionContextProvider>
        <ViewContainer
          className={classes.root}
          header={{
            title,
            subtitle: 'Basic canvas view',
            actionButtons: [<Toolbar />],
          }}>
          <div className={classes.ide}>
            <div className={classes.leftPane}>
              <BlocksBar />
            </div>
            <div className={classes.canvasContainer}>
              <Canvas />
            </div>
            <div className={classes.rightPane}>
              <DetailsPane />
              <JsonViewer />
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
        </ViewContainer>
      </GraphSelectionContextProvider>
    </GraphContextProvider>
  );
}
