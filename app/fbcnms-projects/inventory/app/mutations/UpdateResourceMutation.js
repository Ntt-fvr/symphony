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
  UpdateResourceMutation,
  UpdateResourceMutationResponse,
  UpdateResourceMutationVariables,
} from './__generated__/UpdateResourceMutation.graphql.js';

import type {MutationCallbacks} from './MutationCallbacks.js';

import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation UpdateResourceMutation($input: UpdateResourceInput!) {
    updateResource(input: $input) {
      numUids
      resource {
        id
        name
        externalId
        locatedIn
        resourceSpecification
        isDeleted
        lifecycleStatus
        planningSubStatus
        administrativeSubStatus
        usageSubStatus
        operationalSubStatus
        resourceProperties {
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
        belongsTo {
          id
          name
          resourceSpecification
          locatedIn
        }
        logicalLinks {
          name
        }
      }
    }
  }
`;

export default (
  variables: UpdateResourceMutationVariables,
  callbacks?: MutationCallbacks<UpdateResourceMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<UpdateResourceMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
