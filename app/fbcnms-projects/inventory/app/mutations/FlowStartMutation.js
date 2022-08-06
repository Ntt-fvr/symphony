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
  FlowStartMutation,
  FlowStartMutationResponse,
  FlowStartMutationVariables,
} from './__generated__/FlowStartMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation FlowStartMutation($input: StartFlowInput!) {
    startFlow(input: $input) {
      id
    }
  }
`;

export default (
  variables: FlowStartMutationVariables,
  callbacks?: MutationCallbacks<FlowStartMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<FlowStartMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
