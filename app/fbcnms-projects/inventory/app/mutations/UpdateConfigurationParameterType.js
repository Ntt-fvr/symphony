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
  UpdateConfigurationParameterTypeMutation,
  UpdateConfigurationParameterTypeMutationResponse,
  UpdateConfigurationParameterTypeMutationVariables,
} from './__generated__/UpdateConfigurationParameterTypeMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateConfigurationParameterTypeMutation(
    $input: UpdateConfigurationParameterTypeInput!
  ) {
    updateConfigurationParameterType(input: $input) {
      configurationParameterType {
        id
        name
      }
    }
  }
`;

export default (
  variables: UpdateConfigurationParameterTypeMutationVariables,
  callbacks?: MutationCallbacks<UpdateConfigurationParameterTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateConfigurationParameterTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
