/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import BlocksBar from './tools/blocksBar/BlocksBar';
import Canvas from './canvas/Canvas';
import DetailsPane from './tools/DetailsPane';
import JsonViewer from './tools/JsonViewer';
import React from 'react';
import Toolbar from './tools/Toolbar';
import ViewContainer from '@symphony/design-system/components/View/ViewContainer';
import {GraphContextProvider} from './canvas/graph/GraphContext';
import {GraphSelectionContextProvider} from './widgets/selection/GraphSelectionContext';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  ide: {
    display: 'flex',
    flexGrow: 1,
  },
  rightPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  rightPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  canvasContainer: {
    position: 'relative',
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 4,
    padding: '0 16px',
  },
  leftPane: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    background: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function FlowBuilder() {
  const classes = useStyles();

  return (
    <GraphContextProvider>
      <GraphSelectionContextProvider>
        <ViewContainer
          className={classes.root}
          header={{
            title: 'Flow Builder',
            subtitle: 'Basic canvas view',
            actionButtons: [<Toolbar />],
          }}>
          <div className={classes.ide}>
            <div className={classes.leftPane}>
              <BlocksBar />
            </div>
            <div className={classes.canvasContainer}>
              <Canvas />
            </div>
            <div className={classes.rightPane}>
              <DetailsPane />
              <JsonViewer />
            </div>
          </div>
        </ViewContainer>
      </GraphSelectionContextProvider>
    </GraphContextProvider>
  );
}
