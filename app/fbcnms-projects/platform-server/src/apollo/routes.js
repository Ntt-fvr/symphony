/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {ExpressRequest, ExpressResponse} from 'express';

const express = require('express');
const proxy = require('http-proxy-middleware');
const {APOLLO_HOST} = require('../config');
import onProxyReq from '../utils/OnProxyRequest';

const router: express.Router<
  ExpressRequest,
  ExpressResponse,
> = express.Router();

router.use(
  '/',
  proxy({
    // hostname to the target server
    target: 'http://' + APOLLO_HOST,

    // enable websocket proxying
    ws: true,

    // rewrite paths
    pathRewrite: (path: string): string => path.replace(/^\/apollo/, ''),

    // subscribe to http-proxy's proxyReq event
    onProxyReq: onProxyReq,
  }),
);

module.exports = router;
