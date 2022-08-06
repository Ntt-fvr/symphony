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
  EditScheduleChangeRequestMutation,
  EditScheduleChangeRequestMutationResponse,
  EditScheduleChangeRequestMutationVariables,
} from './__generated__/EditScheduleChangeRequestMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditScheduleChangeRequestMutation(
    $input: UpdateChangeRequestInput!
  ) {
    updateChangeRequest(input: $input) {
      changeRequest {
        id
        scheduler {
          time
          type
          weekDay
        }
      }
    }
  }
`;

export default (
  variables: EditScheduleChangeRequestMutationVariables,
  callbacks?: MutationCallbacks<EditScheduleChangeRequestMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditScheduleChangeRequestMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
