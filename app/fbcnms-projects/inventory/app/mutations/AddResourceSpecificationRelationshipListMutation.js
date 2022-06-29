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
  AddResourceSpecificationRelationshipListMutation,
  AddResourceSpecificationRelationshipListMutationResponse,
  AddResourceSpecificationRelationshipListMutationVariables,
} from './__generated__/AddResourceSpecificationRelationshipListMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddResourceSpecificationRelationshipListMutation(
    $input: [AddResourceSpecificationRelationshipInput!]!
  ) {
    addResourceSpecificationRelationshipList(input: $input) {
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
  variables: AddResourceSpecificationRelationshipListMutationVariables,
  callbacks?: MutationCallbacks<AddResourceSpecificationRelationshipListMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddResourceSpecificationRelationshipListMutation>(
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
