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
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import {useEffect, useState} from 'react';
import {useGraph} from '../canvas/graph/GraphContext';

const useStyles = makeStyles(() => ({
  root: {},
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
      <Text variant="body2" color="gray">
        {json}
      </Text>
    </div>
  );
}
