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
  ArchiveFlowMutation,
  ArchiveFlowMutationResponse,
  ArchiveFlowMutationVariables,
} from './__generated__/ArchivedFlowMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation ArchiveFlowMutation($input: ArchiveFlowInput!) {
    archiveFlow(input: $input) {
      id
    }
  }
`;

export default (
  variables: ArchiveFlowMutationVariables,
  callbacks?: MutationCallbacks<ArchiveFlowMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<ArchiveFlowMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
