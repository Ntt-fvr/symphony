/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useMemo} from 'react';
import {render, screen} from '@testing-library/react';

import type {PublishToKafkaSettingsType} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/publishToKafka/PublishToKafkaSettings';

import PublishToKafkaBlockType from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/publishToKafka/PublishToKafkaBlockType';
import PublishToKafkaPresentation from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/publishToKafka/PublishToKafkaPresentation';
import {TYPE} from '../flows/builder/canvas/graph/facades/shapes/vertexes/actions/PublishToKafka';
import {
  getInitialBlockSettings,
  setBlockSettings,
} from '../flows/builder/canvas/graph/shapes/blocks/blockTypes/BaseSettings';
import {useGraph} from '../flows/builder/canvas/graph/graphAPIContext/GraphContext';

describe('Suite Test Components /publishToKafka/: ', () => {
  it('AUT-FE-05071 Render component <PublishToKafkaPresentation/>', () => {
    render(<PublishToKafkaPresentation />);
    const text = screen.getByText(/publish To Kafka/i);
    expect(text).toBeInTheDocument();
  });

  it('AUT-FE-05072 Instance class PublishToKafkaBlockType', () => {
    const TestComponent = () => {
      const flow = useGraph();
      const flowTypes = useMemo(() => [new PublishToKafkaBlockType(flow)], [
        flow,
      ]);
      return flowTypes[0].type;
    };

    render(<TestComponent />);
    const text = screen.getByText(/publishToKafka/i);
    expect(text).toBeInTheDocument();
  });

  test('AUT-FE-05073 Test setPublishToKafkaSettings', () => {
    const objectTest: PublishToKafkaSettingsType = getInitialBlockSettings(
      TYPE,
    );

    expect(objectTest.messageType).toStrictEqual(undefined);
    expect(objectTest.brokers).toStrictEqual(undefined);

    const setObjectTest: PublishToKafkaSettingsType = setBlockSettings(TYPE, {
      ...objectTest,
      messageType: 'testParams',
    });
    expect(setObjectTest.messageType).toStrictEqual('testParams');
    expect(setObjectTest.brokers).toStrictEqual(undefined);
  });
});
