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
  EditResourceSpecificationMutation,
  EditResourceSpecificationMutationResponse,
  EditResourceSpecificationMutationVariables,
} from './__generated__/EditResourceSpecificationMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditResourceSpecificationMutation($input: EditResourceSpecificationInput!) {
    editResourceSpecification(input: $input) {
      id
      name
      propertyTypes{
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
  variables: EditResourceSpecificationMutationVariables,
  callbacks?: MutationCallbacks<EditResourceSpecificationMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditResourceSpecificationMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
