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
    UpdateFlowInstanceMutation,
    UpdateFlowInstanceMutationResponse,
    UpdateFlowInstanceMutationVariables,
  } from './__generated__/UpdateFlowInstanceMutation.graphql';
  
  import type {MutationCallbacks} from './MutationCallbacks.js';
  
  import type {SelectorStoreUpdater} from 'relay-runtime';
  
  import RelayEnvironment from '../common/RelayEnvironment.js';
  import {commitMutation, graphql} from 'react-relay';
  
  const mutation = graphql`
    mutation UpdateFlowInstanceMutation($input: EditFlowInstanceInput) {
      editFlowInstance(input: $input) {
        id
      }
    }
  `;
  
  export default (
    variables: UpdateFlowInstanceMutationVariables,
    callbacks?: MutationCallbacks<UpdateFlowInstanceMutationResponse>,
    updater?: SelectorStoreUpdater,
  ) => {
    const {onCompleted, onError} = callbacks ? callbacks : {};
    commitMutation<UpdateFlowInstanceMutation>(RelayEnvironment, {
      mutation,
      variables,
      updater,
      onCompleted,
      onError,
    });
  };
  