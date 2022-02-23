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
  RemoveResourceRelationshipMutation,
  RemoveResourceRelationshipMutationResponse,
  RemoveResourceRelationshipMutationVariables,
} from './__generated__/RemoveResourceRelationshipMutation.graphql';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveResourceRelationshipMutation($id: ID!) {
    removeResourceRelationship(id: $id)
  }
`;

export default (
  variables: RemoveResourceRelationshipMutationVariables,
  callbacks?: MutationCallbacks<RemoveResourceRelationshipMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveResourceRelationshipMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
