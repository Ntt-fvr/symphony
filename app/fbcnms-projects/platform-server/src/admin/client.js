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

import {ADMIN_HOST} from '../config';
import {GraphQLClient} from 'graphql-request';

export const client = new GraphQLClient(`http://${ADMIN_HOST}/query`);
