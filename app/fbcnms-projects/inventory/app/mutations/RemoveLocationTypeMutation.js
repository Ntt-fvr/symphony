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
  RemoveDocumentCategoryTypeMutation,
  RemoveDocumentCategoryTypeMutationVariables,
  RemoveDocumentCategoryTypeMutationResponse,
} from './__generated__/RemoveDocumentCategoryTypeMutation.graphql';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveDocumentCategoryTypeMutation($id: ID!) {
    removeLocationType(id: $id)
  }
`;

export default (
  variables: RemoveDocumentCategoryTypeMutationVariables,
  callbacks?: MutationCallbacks<RemoveDocumentCategoryTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveDocumentCategoryTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
