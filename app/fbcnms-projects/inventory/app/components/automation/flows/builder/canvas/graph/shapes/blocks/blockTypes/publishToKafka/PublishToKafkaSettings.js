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

export type PublishToKafkaSettingsType = $ReadOnly<{|
  messageType: string,
  brokers: string,
  topic: string,
  message: string,
|}>;

export const initialPublishToKafkaSettings: PublishToKafkaSettingsType = {
  messageType: undefined,
  brokers: undefined,
  topic: undefined,
  message: undefined,
};

export const setPublishToKafkaSettings: PublishToKafkaSettingsType = (
  newPublishToKafkaSettings: PublishToKafkaSettingsType,
) => {
  return newPublishToKafkaSettings;
};
