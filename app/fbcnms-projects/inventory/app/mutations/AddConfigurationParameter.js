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
  AddConfigurationParameterMutation,
  AddConfigurationParameterMutationResponse,
  AddConfigurationParameterMutationVariables,
} from './__generated__/AddConfigurationParameterMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddConfigurationParameterMutation(
    $input: [AddConfigurationParameterTypeInput!]!
  ) {
    addConfigurationParameterType(input: $input) {
      configurationParameterType {
        id
        externalId
        name
      }
    }
  }
`;

export default (
  variables: AddConfigurationParameterMutationVariables,
  callbacks?: MutationCallbacks<AddConfigurationParameterMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddConfigurationParameterMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
