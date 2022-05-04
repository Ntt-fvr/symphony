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
import ErrorHandlingSettings from './errorHandlingSettings';
import InputSettings from './inputSettings';
import OutputSettings from './outputSettings';
import Tabs from '../../../../../inputs/Tabs';
import {makeStyles} from '@material-ui/styles';
type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '27px',
  },
}));
export default function BlockSettings(props: Props) {
  const {block} = props;
  const classes = useStyles();
  console.log('Block', block);

  const tabs = [
    {
      label: 'Configurations',
      index: 0,
      view: <div />,
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
    <div className={classes.root}>
      <Tabs tabs={tabs} scrollable={false} />
    </div>
  );
}
