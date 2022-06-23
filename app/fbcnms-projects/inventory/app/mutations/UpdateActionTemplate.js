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
  UpdateActionTemplateMutation,
  UpdateActionTemplateMutationResponse,
  UpdateActionTemplateMutationVariables,
} from './__generated__/UpdateActionTemplateMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateActionTemplateMutation($input: UpdateActionTemplateInput!) {
    updateActionTemplate(input: $input) {
      actionTemplate {
        id
        name
        resourceSpecifications
        type
        actionTemplateItem {
          id
          parameters {
            id
            name
          }
          value {
            stringValue
          }
          isDeleted
        }
        isDeleted
      }
    }
  }
`;

export default (
  variables: UpdateActionTemplateMutationVariables,
  callbacks?: MutationCallbacks<UpdateActionTemplateMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateActionTemplateMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
