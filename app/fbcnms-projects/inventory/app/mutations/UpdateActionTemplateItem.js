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
  UpdateActionTemplateItemMutation,
  UpdateActionTemplateItemMutationResponse,
  UpdateActionTemplateItemMutationVariables,
} from './__generated__/UpdateActionTemplateItemMutation.graphql';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateActionTemplateItemMutation(
    $input: UpdateActionTemplateItemInput!
  ) {
    updateActionTemplateItem(input: $input) {
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
    }
  }
`;

export default (
  variables: UpdateActionTemplateItemMutationVariables,
  callbacks?: MutationCallbacks<UpdateActionTemplateItemMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateActionTemplateItemMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
