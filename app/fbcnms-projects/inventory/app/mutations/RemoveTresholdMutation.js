/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {MutationCallbacks} from './MutationCallbacks.js';
import type {
  RemoveTresholdMutation,
  RemoveTresholdMutationResponse,
  RemoveTresholdMutationVariables,
} from './__generated__/RemoveTresholdMutation.graphql';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveTresholdMutation($id: ID!) {
    removeTreshold(id: $id)
  }
`;

export default (
  variables: RemoveTresholdMutationVariables,
  callbacks?: MutationCallbacks<RemoveTresholdMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveTresholdMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
