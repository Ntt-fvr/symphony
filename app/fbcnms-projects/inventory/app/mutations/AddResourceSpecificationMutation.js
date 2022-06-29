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
  AddResourceSpecificationMutation,
  AddResourceSpecificationMutationResponse,
  AddResourceSpecificationMutationVariables,
} from './__generated__/AddResourceSpecificationMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddResourceSpecificationMutation(
    $input: AddResourceSpecificationInput!
  ) {
    addResourceSpecification(input: $input) {
      id
      name
      vendor {
        id
        name
      }
      resourcePropertyTypes {
        externalId
        name
        type
        nodeType
        index
        category
        stringValue
        intValue
        booleanValue
        floatValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        isEditable
        isInstanceProperty
        isMandatory
        isDeleted
        isListable
      }
    }
  }
`;

export default (
  variables: AddResourceSpecificationMutationVariables,
  callbacks?: MutationCallbacks<AddResourceSpecificationMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddResourceSpecificationMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
