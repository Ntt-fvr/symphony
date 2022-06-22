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
  AddCMVersionMutation,
  AddCMVersionMutationResponse,
  AddCMVersionMutationVariables,
} from './__generated__/AddCMVersionMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddCMVersionMutation($input: [AddCMVersionInput!]!) {
    addCMVersion(input: $input) {
      cMVersion {
        id
        parameters {
          id
          booleanValue
          intValue
          stringValue
        }
        resource {
          id
          name
        }
        status
      }
    }
  }
`;

export default (
  variables: AddCMVersionMutationVariables,
  callbacks?: MutationCallbacks<AddCMVersionMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddCMVersionMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
