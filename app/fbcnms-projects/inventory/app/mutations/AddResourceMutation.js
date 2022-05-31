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
  AddResourceMutation,
  AddResourceMutationResponse,
  AddResourceMutationVariables,
} from './__generated__/AddResourceMutation.graphql.js';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddResourceMutation($input: [AddResourceInput!]!) {
    addResource(input: $input) {
      numUids
      resource {
        locatedIn
        name
        resourceSpecification
        isDelete
      }
    }
  }
`;

export default (
  variables: AddResourceMutationVariables,
  callbacks?: MutationCallbacks<AddResourceMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddResourceMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
