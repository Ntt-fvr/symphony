/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import withInventoryErrorBoundary from '../../../../common/withInventoryErrorBoundary';
import {TYPE as CreateWorkorderType} from '../builder/canvas/graph/facades/shapes/vertexes/actions/CreateWorkorder';
import {TYPE as EndType} from '../builder/canvas/graph/facades/shapes/vertexes/administrative/End';
import {TYPE as ManualStartType} from '../builder/canvas/graph/facades/shapes/vertexes/administrative/ManualStart';
import type {
  FlowDataContext_FlowDraftQuery,
  FlowDataContext_FlowDraftQueryResponse,
} from './__generated__/FlowDataContext_FlowDraftQuery.graphql';
import type {FragmentReference} from 'relay-runtime';
import type {ImportFlowDraftInput} from '../../../../mutations/__generated__/ImportFlowDraftMutation.graphql';

import * as React from 'react';
import emptyFunction from '@fbcnms/util/emptyFunction';
import fbt from 'fbt';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {graphql} from 'react-relay';
import {
  mapActionBlocksForSave,
  mapConnectorsForSave,
  mapEndBlockForSave,
  mapStartBlockForSave,
  saveFlowDraft,
} from './flowDataUtils';
import {useCallback, useContext, useEffect} from 'react';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useGraph} from '../builder/canvas/graph/GraphContext';
import {useHistory} from 'react-router-dom';
import {useLazyLoadQuery} from 'react-relay/hooks';

const BLOCK_TYPES = {
  StartBlock: ManualStartType,
  ActionBlock: CreateWorkorderType,
  EndBlock: EndType,
};

type FlowDraftResponse = $ElementType<
  FlowDataContext_FlowDraftQueryResponse,
  'flowDraft',
>;

export type FlowDataContextType = {
  flowDraft: FlowDraftResponse,
  save: () => void,
};

const FlowDataContextDefaults = {
  flowDraft: null,
  save: emptyFunction,
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
        blocks {
          cid
          name
          details {
            __typename
          }
          uiRepresentation {
            xPosition
            yPosition
          }
          nextBlocks {
            cid
            name
            uiRepresentation {
              xPosition
              yPosition
            }
          }
        }
        ...DetailsView_flowDraft
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
      blocks.forEach(block => {
        flow.addBlock(BLOCK_TYPES[block.details.__typename], {
          id: block.cid,
          text: block.name,
          position: {
            x: block.uiRepresentation?.xPosition ?? 0,
            y: block.uiRepresentation?.yPosition ?? 0,
          },
        });
      });
    },
    [flow],
  );

  const loadConnectorsIntoGraph = useCallback(
    blocks => {
      blocks.forEach(block => {
        block.nextBlocks.forEach(nextBlock => {
          flow.addConnector({
            source: flow.getBlock(block.cid),
            target: flow.getBlock(nextBlock.cid),
          });
        });
      });
    },
    [flow],
  );

  useEffect(() => {
    if (!flowDraft || !flowDraft.blocks) {
      return;
    }

    const blocks = [...flowDraft.blocks];
    loadBlocksIntoGraph(blocks);
    loadConnectorsIntoGraph(blocks);
  }, [flowDraft, flow, loadBlocksIntoGraph, loadConnectorsIntoGraph]);

  const save = useCallback(() => {
    if (!flowDraft) {
      return;
    }

    const connectors = flow.getConnectors().map(mapConnectorsForSave);
    const startBlocks = flow
      .getBlocksByType(ManualStartType)
      .map(mapStartBlockForSave);
    const actionBlocks = flow
      .getBlocksByType(CreateWorkorderType)
      .map(mapActionBlocksForSave);
    const endBlocks = flow.getBlocksByType(EndType).map(mapEndBlockForSave);

    const flowData: ImportFlowDraftInput = {
      id: flowDraft.id ?? '',
      name: flowDraft.name ?? '',
      endParamDefinitions: [],
    };

    if (startBlocks.length > 0) {
      flowData.startBlock = startBlocks[0];
    }

    if (endBlocks.length > 0) {
      flowData.endBlocks = endBlocks;
    }

    if (actionBlocks.length > 0) {
      flowData.actionBlocks = actionBlocks;
    }

    if (connectors.length > 0) {
      flowData.connectors = connectors;
    }

    saveFlowDraft(flowData).then(() => {
      enqueueSnackbar('Flow draft has been saved!', {variant: 'success'});
    });
  }, [flow, flowDraft, enqueueSnackbar]);

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
