/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  FlowDataContext_FlowDraftQuery,
  FlowDataContext_FlowDraftQueryResponse,
} from './__generated__/FlowDataContext_FlowDraftQuery.graphql';
import type {FragmentReference} from 'relay-runtime';
import type {ImportFlowDraftInput} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';
import type {ImportFlowDraftMutationResponse} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';

import * as React from 'react';
import BaseBlock from '../builder/canvas/graph/shapes/blocks/BaseBlock.js';
import fbt from 'fbt';
import withInventoryErrorBoundary from '../../../../common/withInventoryErrorBoundary';
import {TYPE as CreateWorkorderType} from '../builder/canvas/graph/facades/shapes/vertexes/actions/CreateWorkorder';
import {TYPE as DecisionType} from '../builder/canvas/graph/facades/shapes/vertexes/logic/Decision';
import {TYPE as EndType} from '../builder/canvas/graph/facades/shapes/vertexes/administrative/End';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {LogEvents, ServerLogger} from '../../../../common/LoggingUtils';
import {TYPE as ManualStartType} from '../builder/canvas/graph/facades/shapes/vertexes/administrative/ManualStart';
import {graphql} from 'react-relay';
import {
  mapActionBlocksForSave,
  mapConnectorsForSave,
  mapDecisionBlockForSave,
  mapEndBlockForSave,
  mapStartBlockForSave,
  saveFlowDraft,
} from './flowDataUtils';
import {useCallback, useContext, useEffect} from 'react';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useGraph} from '../builder/canvas/graph/GraphContext';
import {useHistory} from 'react-router-dom';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useRef} from 'react';

const BLOCK_TYPES = {
  StartBlock: ManualStartType,
  ActionBlock: CreateWorkorderType,
  DecisionBlock: DecisionType,
  EndBlock: EndType,
};

type FlowDraftResponse = $ElementType<
  FlowDataContext_FlowDraftQueryResponse,
  'flowDraft',
>;

type FlowSettingsUpdateType = ?{
  name?: ?string,
  description?: ?string,
};

export type FlowDataContextType = {
  flowDraft: FlowDraftResponse,
  save: (
    flowSettingsUpdate?: FlowSettingsUpdateType,
  ) => Promise<ImportFlowDraftMutationResponse>,
};

const FlowDataContextDefaults = {
  flowDraft: null,
  save: () => Promise.reject(),
};

const FlowDataContext = React.createContext<FlowDataContextType>(
  FlowDataContextDefaults,
);

const flowQuery = graphql`
  query FlowDataContext_FlowDraftQuery($flowId: ID!) {
    flowDraft: node(id: $flowId) {
      ... on FlowDraft {
        id
        name
        description
        blocks {
          cid
          details {
            __typename
          }
          uiRepresentation {
            name
            xPosition
            yPosition
          }
          nextBlocks {
            cid
            uiRepresentation {
              name
              xPosition
              yPosition
            }
          }
        }
        ...BlocksBar_flowDraft
      }
    }
  }
`;
type Props = {|
  flowId: ?string,
  children: React.Node,
|};

function FlowDataContextProviderComponent(props: Props) {
  const {flowId} = props;
  const {flowDraft} = useLazyLoadQuery<FlowDataContext_FlowDraftQuery>(
    flowQuery,
    {
      flowId: flowId ?? '',
    },
  );

  const enqueueSnackbar = useEnqueueSnackbar();
  const handleError = useCallback(
    (error: string) => {
      enqueueSnackbar(error, {variant: 'error'});
    },
    [enqueueSnackbar],
  );

  const history = useHistory();
  const flow = useGraph();

  useEffect(() => {
    if (flowId != null && flowDraft == null) {
      handleError(
        `${fbt(
          `Flow with id ${fbt.param(
            'flow id url param',
            flowId,
          )} does not exist.`,
          '',
        )}`,
      );
      history.replace(InventoryAPIUrls.flows());
    }
  }, [flowId, flowDraft, handleError, history]);

  const loadBlocksIntoGraph = useCallback(
    blocks => {
      const errors: Array<{id: string, name: string}> = [];
      blocks.forEach(block => {
        const createdBlock = flow.addBlock(
          BLOCK_TYPES[block.details.__typename],
          {
            id: block.cid,
            text: block.uiRepresentation?.name ?? '',
            position: {
              x: block.uiRepresentation?.xPosition ?? 0,
              y: block.uiRepresentation?.yPosition ?? 0,
            },
          },
        );
        if (!(createdBlock instanceof BaseBlock)) {
          errors.push({
            id: block.cid,
            name: block.uiRepresentation?.name ?? '',
          });
        }
      });

      let logMessage = '';
      let clientMessage = '';
      if (errors.length === 1) {
        logMessage = `Failed loading Block cid: ${errors[0].id}.`;
        clientMessage = `Failed loading Block: ${errors[0].name}.`;
      } else if (errors.length > 1) {
        if (errors.length === blocks.length) {
          logMessage = `failed to load flow Blocks.`;
          clientMessage = 'Flow Blocks failed to get loaded.';
        } else {
          logMessage = `Blocks with cids ${errors
            .map(el => el.id)
            .toString()} failed to load.`;
          clientMessage = 'Some Blocks failed to get loaded.';
        }
      }

      if (errors.length > 0) {
        ServerLogger.error(LogEvents.LOAD_BLOCK_ERROR, {
          message: logMessage,
        });
        enqueueSnackbar(clientMessage, {
          variant: 'error',
        });
      }
    },
    [flow, enqueueSnackbar],
  );

  const loadConnectorsIntoGraph = useCallback(
    blocks => {
      blocks.forEach(block => {
        block.nextBlocks.forEach(nextBlock => {
          const source = flow.getBlock(block.cid);
          const target = flow.getBlock(nextBlock.cid);
          if (source == null || target == null) {
            return;
          }
          flow.addConnector(source, target);
        });
      });
    },
    [flow],
  );

  const isLoaded = useRef(false);
  useEffect(() => {
    if (isLoaded.current) {
      return;
    }

    flow.clearGraph();

    if (flowDraft?.blocks == null) {
      return;
    }

    const blocks = [...flowDraft.blocks];
    loadBlocksIntoGraph(blocks);
    loadConnectorsIntoGraph(blocks);

    isLoaded.current = true;
  }, [flow, flowDraft, loadBlocksIntoGraph, loadConnectorsIntoGraph]);

  const save = useCallback(
    (flowSettingsUpdate: FlowSettingsUpdateType) => {
      if (flowDraft == null) {
        return Promise.reject('There was not flowDraftData to save.');
      }

      const flowData: ImportFlowDraftInput = {
        id: flowDraft.id ?? '',
        name:
          flowSettingsUpdate?.name != null
            ? flowSettingsUpdate.name
            : flowDraft.name ?? '',
        description:
          flowSettingsUpdate?.description != null
            ? flowSettingsUpdate.description
            : flowDraft.description ?? '',
        endParamDefinitions: [],
      };

      const connectors = flow.getConnectors().map(mapConnectorsForSave);
      const startBlocks = flow
        .getBlocksByType(ManualStartType)
        .map(mapStartBlockForSave);
      const decisionBlocks = flow
        .getBlocksByType(DecisionType)
        .map(mapDecisionBlockForSave);
      const actionBlocks = flow
        .getBlocksByType(CreateWorkorderType)
        .map(mapActionBlocksForSave);
      const endBlocks = flow.getBlocksByType(EndType).map(mapEndBlockForSave);

      if (startBlocks.length > 0) {
        flowData.startBlock = startBlocks[0];
      }

      if (endBlocks.length > 0) {
        flowData.endBlocks = endBlocks;
      }
      if (decisionBlocks.length > 0) {
        flowData.decisionBlocks = decisionBlocks;
      }

      if (actionBlocks.length > 0) {
        flowData.actionBlocks = actionBlocks;
      }

      if (connectors.length > 0) {
        flowData.connectors = connectors;
      }

      return saveFlowDraft(flowData);
    },
    [flow, flowDraft],
  );

  return (
    <FlowDataContext.Provider value={{flowDraft, save}}>
      {props.children}
    </FlowDataContext.Provider>
  );
}

export const FlowDataContextProvider = withInventoryErrorBoundary(
  FlowDataContextProviderComponent,
);

export function useFlowData() {
  return useContext(FlowDataContext);
}

type ComponentProps<T> = {
  flowDraft: ?FlowDraftResponse,
  ...T,
};

export function withFlowData<
  TComponent: React.ComponentType<ComponentProps<*>>,
>(Component: TComponent): React.ComponentType<React.ElementConfig<TComponent>> {
  return class extends React.Component<React.ElementConfig<TComponent>> {
    render(): React.Node {
      return (
        <FlowDataContext.Consumer>
          {data => <Component {...this.props} flowDraft={data.flowDraft} />}
        </FlowDataContext.Consumer>
      );
    }
  };
}

export type WithFlowData<T: {+$refType: FragmentReference}> = {
  flowDraft?: T,
};

export default FlowDataContext;
