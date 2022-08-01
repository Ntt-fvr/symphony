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
import type {SelectorStoreUpdater} from 'relay-runtime';
import type {
  UpdateParameterMutation,
  UpdateParameterMutationResponse,
  UpdateParameterMutationVariables,
} from './__generated__/UpdateParameterMutation.graphql';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateParameterMutation($input: UpdateParameterInput!) {
    updateParameter(input: $input) {
      parameter {
        id
        floatValue
        intValue
        stringValue
      }
    }
  }
`;

export default (
  variables: UpdateParameterMutationVariables,
  callbacks?: MutationCallbacks<UpdateParameterMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateParameterMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
