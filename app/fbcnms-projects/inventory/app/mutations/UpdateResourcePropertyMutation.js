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
  UpdateResourcePropertyMutation,
  UpdateResourcePropertyMutationResponse,
  UpdateResourcePropertyMutationVariables,
} from './__generated__/UpdateResourcePropertyMutation.graphql.js';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateResourcePropertyMutation(
    $input: UpdateResourcePropertyInput!
  ) {
    updateResourceProperty(input: $input) {
      resourceProperty {
        booleanValue
        floatValue
        id
        intValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        rawValue
        stringValue
        resourcePropertyType
      }
    }
  }
`;

export default (
  variables: UpdateResourcePropertyMutationVariables,
  callbacks?: MutationCallbacks<UpdateResourcePropertyMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateResourcePropertyMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
