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
import TabsBar from '@symphony/design-system/components/Tabs/TabsBar';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';
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
  const [activeTab, setActiveTab] = useState(0);

  console.log('Block', block);

  const tabs = [
    {
      tab: {
        label: `${fbt('Input', '')}`,
      },
      view: <InputSettings />,
    },
    {
      tab: {
        label: `${fbt('Output', '')}`,
      },
      view: <OutputSettings />,
    },
    {
      tab: {
        label: `${fbt('Error Handling', '')}`,
      },
      view: <ErrorHandlingSettings />,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TabsBar
            tabs={tabs.map(type => type.tab)}
            activeTabIndex={activeTab}
            onChange={setActiveTab}
            spread={false}
          />
        </Grid>
        <Grid item xs={12}>
          {tabs[activeTab].view}
        </Grid>
      </Grid>
    </div>
  );
}
