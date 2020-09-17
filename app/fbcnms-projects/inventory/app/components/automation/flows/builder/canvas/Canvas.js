/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useEffect, useRef} from 'react';
import {useGraph} from './graph/GraphContext';

const useStyles = makeStyles(() => ({
  graphContainer: {
    overflow: 'hidden',
  },
}));

export default function Canvas() {
  const classes = useStyles();

  const flow = useGraph();
  const graphContainer = useRef();

  useEffect(() => {
    if (graphContainer.current == null) {
      return;
    }

    const container = graphContainer.current;
    flow.bindGraphContainer(container);
  }, [flow]);

  return (
    <div
      className={classes.graphContainer}
      ref={graphContainer}
      id="graphContainer"
    />
  );
}
