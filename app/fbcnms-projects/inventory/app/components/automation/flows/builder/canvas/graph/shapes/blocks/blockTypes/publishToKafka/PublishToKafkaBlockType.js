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

 import type {IBlockType} from '../BaseBlockType';
 
 import PublishToKafkaPresentation from './PublishToKafkaPresentation';
 import {BaseBlockType} from '../BaseBlockType';
 import {TYPE} from '../../../../facades/shapes/vertexes/actions/PublishToKafka';
 
 export default class PublishToKafkaBlockType
   extends BaseBlockType
   implements IBlockType {
   type = TYPE;
   presentationComponent = PublishToKafkaPresentation;
   explanationComponent = null;
 }
 