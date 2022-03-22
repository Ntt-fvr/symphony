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
  AddResourceTypeRelationshipMutation,
  AddResourceTypeRelationshipMutationResponse,
  AddResourceTypeRelationshipMutationVariables,
} from './__generated__/AddResourceTypeRelationshipMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddResourceTypeRelationshipMutation(
    $input: AddResourceTypeRelationshipInput!
  ) {
    addResourceTypeRelationship(input: $input) {
      id
    }
  }
`;

export default (
  variables: AddResourceTypeRelationshipMutationVariables,
  callbacks?: MutationCallbacks<AddResourceTypeRelationshipMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddResourceTypeRelationshipMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
