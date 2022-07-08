/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import RelayEnvironment from '../../../common/RelayEnvironment';
import {fetchQuery, graphql} from 'relay-runtime';

const resourceTypeQuery = graphql`
  query ResourceTypesFetchQuery {
    resourceSpecifications {
      edges {
        node {
          resourceType {
            name
            id
          }
          name
          id
        }
      }
    }
  }
`;

export default function ResourceTypeQuery() {
  return fetchQuery(RelayEnvironment, resourceTypeQuery, {});
}
