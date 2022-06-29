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
  AddRequestChangeMutation,
  AddRequestChangeMutationResponse,
  AddRequestChangeMutationVariables,
} from './__generated__/AddRequestChangeMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddRequestChangeMutation($input: [AddChangeRequestInput!]!) {
    addChangeRequest(input: $input) {
      changeRequest {
        id
        description
      }
    }
  }
`;

export default (
  variables: AddRequestChangeMutationVariables,
  callbacks?: MutationCallbacks<AddRequestChangeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddRequestChangeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
