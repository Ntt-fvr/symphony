/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlock} from '../../../canvas/graph/shapes/blocks/BaseBlock';

import * as React from 'react';
import ConfigureSettings from './configureSettings/index';
import ErrorHandlingSettings from './errorHandlingSettings';
import InputSettings from './inputSettings';
import OutputSettings from './outputSettings';
import Tabs from '../inputs/Tabs';
import {Box} from '@material-ui/core';
type Props = $ReadOnly<{|
  block: IBlock,
|}>;

export default function BlockSettings(props: Props) {
  const {block} = props;

  const tabs = [
    {
      label: 'Configurations',
      index: 0,
      view: <ConfigureSettings block={block} />,
    },
    {
      label: 'Input',
      index: 1,
      view: <InputSettings />,
    },
    {
      label: 'Output',
      index: 2,
      view: <OutputSettings />,
    },
    {
      label: 'Error Handling',
      index: 3,
      view: <ErrorHandlingSettings />,
    },
  ];

  return (
    <Box py={1} px={0}>
      <Tabs tabs={tabs} scrollable={false} />
    </Box>
  );
}
