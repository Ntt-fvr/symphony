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
import type {
  FlowDataContext_FlowDraftQuery,
  FlowDataContext_FlowDraftQueryResponse,
} from './__generated__/FlowDataContext_FlowDraftQuery.graphql';
import type {FragmentReference} from 'relay-runtime';

import * as React from 'react';
import fbt from 'fbt';
import {InventoryAPIUrls} from '../../../../common/InventoryAPI';
import {graphql} from 'react-relay';
import {useCallback, useContext, useEffect} from 'react';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useHistory} from 'react-router-dom';
import {useLazyLoadQuery} from 'react-relay/hooks';

type FlowDraftResponse = $ElementType<
  FlowDataContext_FlowDraftQueryResponse,
  'flowDraft',
>;
export type FlowDataContextType = {
  flowDraft: FlowDraftResponse,
};

const FlowDataContextDefaults = {
  flowDraft: null,
};

const FlowDataContext = React.createContext<FlowDataContextType>(
  FlowDataContextDefaults,
);

const flowQuery = graphql`
  query FlowDataContext_FlowDraftQuery($flowId: ID!) {
    flowDraft: node(id: $flowId) {
      ... on FlowDraft {
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

  return (
    <FlowDataContext.Provider value={{flowDraft: flowDraft}}>
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
