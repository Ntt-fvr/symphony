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
  EditConfigurationParameterTypeMutation,
  EditConfigurationParameterTypeMutationResponse,
  EditConfigurationParameterTypeMutationVariables,
} from './__generated__/EditConfigurationParameterTypeMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditConfigurationParameterTypeMutation(
    $input: UpdateConfigurationParameterTypeInput!
  ) {
    updateConfigurationParameterType(input: $input) {
      configurationParameterType {
        booleanValue
        category
        externalId
        floatValue
        id
        index
        intValue
        isDeleted
        isEditable
        isListable
        isMandatory
        isPrioritary
        latitudeValue
        longitudeValue
        mappingIn
        mappingOut
        name
        nodeType
        rangeFromValue
        rangeToValue
        rawValue
        resourceSpecification
        stringValue
        type
      }
    }
  }
`;

export default (
  variables: EditConfigurationParameterTypeMutationVariables,
  callbacks?: MutationCallbacks<EditConfigurationParameterTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditConfigurationParameterTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
