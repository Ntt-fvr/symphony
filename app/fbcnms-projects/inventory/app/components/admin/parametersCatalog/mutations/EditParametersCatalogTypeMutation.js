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
  EditParametersCatalogTypeMutation,
  EditParametersCatalogTypeMutationVariables,
  EditParametersCatalogTypeMutationResponse,
} from './__generated__/EditParametersCatalogTypeMutation.graphql';
import type {SelectorStoreUpdater} from 'relay-runtime';

import type {MutationCallbacks} from '../../../../mutations/MutationCallbacks.js';

import RelayEnvironment from '../../../../common/RelayEnvironment';
import {commitMutation, graphql} from 'react-relay';

export const mutation = graphql`
  mutation EditParametersCatalogTypeMutation(
    $propertyCategories: [EditPropertyCategoryInput!]!
  ) {
    editPropertyCategories(propertyCategories: $propertyCategories) {
      id
      name
      index
    }
  }
`;

export default (
  variables: EditParametersCatalogTypeMutationVariables,
  callbacks?: MutationCallbacks<EditParametersCatalogTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditParametersCatalogTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
