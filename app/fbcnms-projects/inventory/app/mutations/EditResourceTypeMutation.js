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
  EditResourceTypeMutation,
  EditResourceTypeMutationResponse,
  EditResourceTypeMutationVariables,
} from './__generated__/EditResourceTypeMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditResourceTypeMutation($input: EditResourceTypeInput!) {
    editResourceType(input: $input) {
      id
      name
      resourceTypeBaseType
      resourceTypeClass
    }
  }
`;

export default (
  variables: EditResourceTypeMutationVariables,
  callbacks?: MutationCallbacks<EditResourceTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditResourceTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
