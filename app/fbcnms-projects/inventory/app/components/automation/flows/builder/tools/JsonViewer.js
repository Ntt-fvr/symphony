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
import Text from '@fbcnms/ui/components/design-system/Text';
import {makeStyles} from '@material-ui/styles';
import {useEffect, useState} from 'react';
import {useGraph} from '../canvas/graph/GraphContext';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 8px 16px 4px',
  },
  header: {
    marginBottom: '8px',
  },
  body: {
    paddingLeft: '8px',
  },
}));

export default function JsonViewer() {
  const classes = useStyles();
  const [json, setJson] = useState('');

  const flow = useGraph();

  useEffect(() => {
    const interval = setInterval(() => {
      setJson(JSON.stringify(flow.serialize()));
    }, 500);
    return () => clearInterval(interval);
  }, [flow]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Text variant="subtitle1">Graph Serialization:</Text>
      </div>
      <Text variant="body2" color="gray">
        {json}
      </Text>
    </div>
  );
}
