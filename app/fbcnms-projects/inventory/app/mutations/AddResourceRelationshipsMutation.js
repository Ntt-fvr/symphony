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
  AddResourceRelationshipsMutation,
  AddResourceRelationshipsMutationResponse,
  AddResourceRelationshipsMutationVariables,
} from './__generated__/AddResourceRelationshipsMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddResourceRelationshipsMutation(
    $input: AddResourceRelationshipInput!
  ) {
    addResourceRelationship(input: $input) {
      id
      name
    }
  }
`;

export default (
  variables: AddResourceRelationshipsMutationVariables,
  callbacks?: MutationCallbacks<AddResourceRelationshipsMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddResourceRelationshipsMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
