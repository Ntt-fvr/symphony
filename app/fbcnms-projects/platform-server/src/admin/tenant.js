/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import {client} from './client';
import {gql} from 'graphql-request';

const logger = require('@fbcnms/logging').getLogger(module);

export async function createTenant(name: string) {
  const mutation = gql`
    mutation CreateTenant($name: String!) {
      createTenant(input: {name: $name}) {
        tenant {
          name
        }
      }
    }
  `;
  await client
    .request(mutation, {name: name})
    .then(_ => logger.info(`created tenant: name=${name}`))
    .catch(err => console.error(err));
}

export async function deleteTenant(name: string) {
  const query = gql`
    query GetTenantID($name: String!) {
      tenant(name: $name) {
        id
      }
    }
  `;
  const data = await client
    .request(query, {name: name})
    .catch(err => console.error(err));
  const mutation = gql`
    mutation DeleteTenant($id: ID!) {
      deleteTenant(input: {id: $id}) {
        clientMutationId
      }
    }
  `;
  await client
    .request(mutation, {id: data.tenant.id})
    .then(_ => logger.info(`deleted tenant: name=${name}`))
    .catch(err => console.error(err));
}
