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
  RemoveResourceTypeMutation,
  RemoveResourceTypeMutationResponse,
  RemoveResourceTypeMutationVariables,
} from './__generated__/RemoveResourceTypeMutation.graphql';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveResourceTypeMutation($id: ID!) {
    removeResourceType(id: $id)
  }
`;

export default (
  variables: RemoveResourceTypeMutationVariables,
  callbacks?: MutationCallbacks<RemoveResourceTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveResourceTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
