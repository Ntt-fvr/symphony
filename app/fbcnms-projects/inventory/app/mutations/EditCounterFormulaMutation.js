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
  EditCounterFormulaMutation,
  EditCounterFormulaMutationResponse,
  EditCounterFormulaMutationVariables,
} from './__generated__/EditCounterFormulaMutation.graphql';
import type {MutationCallbacks} from './MutationCallbacks.js';
import type {SelectorStoreUpdater} from 'relay-runtime';

import RelayEnvironment from '../common/RelayEnvironment.js';
import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation EditCounterFormulaMutation($input: EditCounterFormulaInput!) {
    editCounterFormula(input: $input) {
      id
    }
  }
`;

export default (
  variables: EditCounterFormulaMutationVariables,
  callbacks?: MutationCallbacks<EditCounterFormulaMutationResponse>,
  updater?: SelectorStoreUpdater,
) => {
  const {onCompleted, onError} = callbacks ? callbacks : {};
  commitMutation<EditCounterFormulaMutation>(RelayEnvironment, {
    mutation,
    variables,
    updater,
    onCompleted,
    onError,
  });
};
