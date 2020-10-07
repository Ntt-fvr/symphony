/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import BlockSettings from './blockSettings/BlockSettings';
import FlowSettings from './flowSettings/FlowSettings';
import FlowTitle from './flowSettings/FlowTitle';
import SelectionSettings from './selectionSettings/SelectionSettings';
import {makeStyles} from '@material-ui/styles';
import {useGraphSelection} from '../selection/GraphSelectionContext';

type SettingsPanelType = $ReadOnly<{|
  title: React.Node,
  children: React.Node,
|}>;

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: '6px',
  },
}));

export default function useSettingsPanel(): SettingsPanelType {
  const classes = useStyles();
  const selection = useGraphSelection();
  const selectionCount = selection.selectedElements.length;

  const noSelectionDetails = () => ({
    title: <FlowTitle className={classes.title} />,
    children: <FlowSettings />,
  });

  const singleSelectionDetails = () => ({
    title: 'Block Settings',
    children: <BlockSettings block={selection.selectedElements[0]} />,
  });

  const multiSelectionDetails = () => ({
    title: 'Selection Settings',
    children: <SelectionSettings selection={selection} />,
  });

  if (selectionCount === 0) {
    return noSelectionDetails();
  }
  if (selectionCount === 1) {
    return singleSelectionDetails();
  }
  return multiSelectionDetails();
}
