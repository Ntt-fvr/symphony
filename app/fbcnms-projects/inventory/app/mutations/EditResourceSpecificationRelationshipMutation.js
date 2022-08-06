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
  EditResourceSpecificationRelationshipMutation,
  EditResourceSpecificationRelationshipMutationResponse,
  EditResourceSpecificationRelationshipMutationVariables,
} from './__generated__/EditResourceSpecificationRelationshipMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditResourceSpecificationRelationshipMutation(
    $input: [EditResourceSpecificationRelationshipInput!]!
  ) {
    editResourceSpecificationRelationship(input: $input) {
      id
      name
      resourceSpecification {
        id
        name
      }
    }
  }
`;

export default (
  variables: EditResourceSpecificationRelationshipMutationVariables,
  callbacks?: MutationCallbacks<EditResourceSpecificationRelationshipMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditResourceSpecificationRelationshipMutation>(
    RelayEnvironment,
    {
      mutation,
      variables,
      updater,
      onCompleted,
      onError,
    },
  );
};
