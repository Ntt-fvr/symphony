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
  AddConfigurationParameterTypeMutation,
  AddConfigurationParameterTypeMutationResponse,
  AddConfigurationParameterTypeMutationVariables,
} from './__generated__/AddConfigurationParameterTypeMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddConfigurationParameterTypeMutation(
    $input: [AddConfigurationParameterTypeInput!]!
  ) {
    addConfigurationParameterType(input: $input) {
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
  variables: AddConfigurationParameterTypeMutationVariables,
  callbacks?: MutationCallbacks<AddConfigurationParameterTypeMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddConfigurationParameterTypeMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
