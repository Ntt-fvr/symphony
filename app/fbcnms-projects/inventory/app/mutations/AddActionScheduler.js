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
  AddActionSchedulerMutation,
  AddActionSchedulerMutationResponse,
  AddActionSchedulerMutationVariables,
} from './__generated__/AddActionSchedulerMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddActionSchedulerMutation($input: [AddActionSchedulerInput!]!) {
    addActionScheduler(input: $input) {
      actionScheduler {
        name
        id
        resources {
          id
        }
        date
        type
      }
    }
  }
`;

export default (
  variables: AddActionSchedulerMutationVariables,
  callbacks?: MutationCallbacks<AddActionSchedulerMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddActionSchedulerMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
