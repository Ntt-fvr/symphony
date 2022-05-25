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
  RemoveResourceTypeRelationshipMutation,
  RemoveResourceTypeRelationshipMutationResponse,
  RemoveResourceTypeRelationshipMutationVariables,
} from './__generated__/RemoveResourceTypeRelationshipMutation.graphql';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveResourceTypeRelationshipMutation($id: ID!) {
    removeResourceTypeRelationship(id: $id)
  }
`;

export default (
  variables: RemoveResourceTypeRelationshipMutationVariables,
  callbacks?: MutationCallbacks<RemoveResourceTypeRelationshipMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveResourceTypeRelationshipMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
