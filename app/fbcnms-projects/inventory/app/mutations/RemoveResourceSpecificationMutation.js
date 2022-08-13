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
  RemoveResourceSpecificationMutation,
  RemoveResourceSpecificationMutationResponse,
  RemoveResourceSpecificationMutationVariables,
} from './__generated__/RemoveResourceSpecificationMutation.graphql';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveResourceSpecificationMutation($id: ID!) {
    removeResourceSpecification(id: $id)
  }
`;

export default (
  variables: RemoveResourceSpecificationMutationVariables,
  callbacks?: MutationCallbacks<RemoveResourceSpecificationMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveResourceSpecificationMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
