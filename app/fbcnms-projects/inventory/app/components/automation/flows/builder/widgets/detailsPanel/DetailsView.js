/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {GraphSelectionContextType} from '../selection/GraphSelectionContext';

import * as React from 'react';
import JsonViewer from '../../tools/JsonViewer';
import Text from '@symphony/design-system/components/Text';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  header: {},
}));

type Props = $ReadOnly<{|
  flowSelection: GraphSelectionContextType,
|}>;

export default function DetailsPane(props: Props) {
  const classes = useStyles();

  const {flowSelection} = props;

  const selectionCount = flowSelection.selectedElements.length;

  if (selectionCount > 1) {
    return (
      <div className={classes.root}>
        <Text variant="subtitle1">
          <fbt desc="">
            <fbt:param name="Number of selected blocks on canvas" number={true}>
              {selectionCount}
            </fbt:param>
            Selected Blocks
          </fbt>
        </Text>
      </div>
    );
  }

  if (selectionCount === 0) {
    return (
      <ViewContainer header={{title: 'Graph JSON:'}} className={classes.root}>
        <JsonViewer />
      </ViewContainer>
    );
  }

  return null;
}

export function getDetailsTitle(
  selection: GraphSelectionContextType,
): React.Node {
  const selectionCount = selection.selectedElements.length;

  if (selectionCount === 1) {
    return selection.selectedElements[0].type;
  }

  if (selectionCount > 1) {
    return fbt('Selection', '');
  }

  return 'Flow Details';
}
