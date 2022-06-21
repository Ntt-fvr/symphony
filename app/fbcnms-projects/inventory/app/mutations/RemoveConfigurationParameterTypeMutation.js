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
  RemoveConfigurationParameterTypeMutation,
  RemoveConfigurationParameterTypeMutationResponse,
  RemoveConfigurationParameterTypeMutationVariables,
} from './__generated__/RemoveConfigurationParameterTypeMutation.graphql';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation RemoveConfigurationParameterTypeMutation(
    $filter: ConfigurationParameterTypeFilter!
  ) {
    deleteConfigurationParameterType(filter: $filter) {
      configurationParameterType {
        id
      }
    }
  }
`;

export default (
  variables: RemoveConfigurationParameterTypeMutationVariables,
  callbacks?: MutationCallbacks<RemoveConfigurationParameterTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<RemoveConfigurationParameterTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
