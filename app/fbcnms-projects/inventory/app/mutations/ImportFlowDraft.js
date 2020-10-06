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
  ImportFlowDraftMutation,
  ImportFlowDraftMutationResponse,
  ImportFlowDraftMutationVariables,
} from './__generated__/ImportFlowDraftMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironemnt from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation ImportFlowDraftMutation($input: ImportFlowDraftInput!) {
    importFlowDraft(input: $input) {
      id
      name
    }
  }
`;

export default (
  variables: ImportFlowDraftMutationVariables,
  callbacks?: MutationCallbacks<ImportFlowDraftMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<ImportFlowDraftMutation>(RelayEnvironemnt, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
