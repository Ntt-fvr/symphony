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
  AddTresholdMutation,
  AddTresholdMutationResponse,
  AddTresholdMutationVariables,
} from './__generated__/AddTresholdMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddTresholdMutation($input: AddTresholdInput!) {
    addTreshold(input: $input) {
      id
      name
      description
      status
      kpi{
        id
        name
      }
    }
  }
`;

export default (
  variables: AddTresholdMutationVariables,
  callbacks?: MutationCallbacks<AddTresholdMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddTresholdMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
