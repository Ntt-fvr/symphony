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
  AddActionTemplateMutation,
  AddActionTemplateMutationResponse,
  AddActionTemplateMutationVariables,
} from './__generated__/AddActionTemplateMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddActionTemplateMutation($input: [AddActionTemplateInput!]!) {
    addActionTemplate(input: $input) {
      actionTemplate {
        id
        name
        type
      }
    }
  }
`;

export default (
  variables: AddActionTemplateMutationVariables,
  callbacks?: MutationCallbacks<AddActionTemplateMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddActionTemplateMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
