/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import {graphql, fetchQuery as relayFetchQuery} from 'relay-runtime';

const fetchQuery = (environment, query, variables) => {
  return new Promise((resolve, reject) => {
    relayFetchQuery(environment, query, variables).subscribe({
      next: data => {
        resolve(data);
      },
      error: error => {
        reject(error);
      },
    });
  });
};

export {graphql, fetchQuery};
