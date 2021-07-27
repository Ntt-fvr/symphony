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
  RemoveAlarmFilterMutation,
  RemoveAlarmFilterMutationResponse,
  RemoveAlarmFilterMutationVariables,
} from './__generated__/RemoveAlarmFilterMutation.graphql';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveAlarmFilterMutation($id: ID!) {
    removeAlarmFilter(id: $id)
  }
`;

export default (
  variables: RemoveAlarmFilterMutationVariables,
  callbacks?: MutationCallbacks<RemoveAlarmFilterMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveAlarmFilterMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
