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
  AddCounterFormulaListMutation,
  AddCounterFormulaListMutationResponse,
  AddCounterFormulaListMutationVariables,
} from './__generated__/AddCounterFormulaListMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation AddCounterFormulaListMutation($input: AddCounterFormulaListInput!) {
    addCounterFormulaList(input: $input) {
      id
      mandatory
      counterFk {
        id
        name
      }
      formulaFk {
        id
      }
    }
  }
`;

export default (
  variables: AddCounterFormulaListMutationVariables,
  callbacks?: MutationCallbacks<AddCounterFormulaListMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<AddCounterFormulaListMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
