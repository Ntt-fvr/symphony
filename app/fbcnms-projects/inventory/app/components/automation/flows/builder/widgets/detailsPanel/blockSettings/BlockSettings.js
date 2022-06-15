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
import Tabs from '../inputs/Tabs';
import {Box} from '@material-ui/core';
import {getAllowedTabs} from './helpers';
import {useMemo} from 'react';
type Props = $ReadOnly<{|
  block: IBlock,
|}>;

export default function BlockSettings(props: Props) {
  const {block} = props;
  const allowedTabs = useMemo(() => getAllowedTabs(block.type, block), [block]);
  const tabs = [
    {
      label: 'Configurations',
      index: 0,
      view: <ConfigureSettings block={block} />,
    },
    ...allowedTabs,
  ];

  return (
    <Box py={1} px={0}>
      <Tabs tabs={tabs} scrollable={false} />
    </Box>
  );
}
