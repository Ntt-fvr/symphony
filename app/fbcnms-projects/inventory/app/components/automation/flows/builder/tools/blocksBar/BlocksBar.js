/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import BlocksCategory from './BlocksCategory';
import CreateWorkorderBlockType from '../../canvas/graph/shapes/blocks/blockTypes/createWorkorder/CreateWorkorderBlockType';
import ManualStartBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStart/ManualStartBlockType';
import ManualStepBlockType from '../../canvas/graph/shapes/blocks/blockTypes/manualStep/ManualStepBlockType';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import {useGraph} from '../../canvas/graph/GraphContext';
import {useMemo} from 'react';

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

export default function BlocksBar() {
  const classes = useStyles();

  const flow = useGraph();

  const administrativeTypes = useMemo(() => [new ManualStartBlockType(flow)], [
    flow,
  ]);
  const actionTypes = useMemo(
    () => [new ManualStepBlockType(flow), new CreateWorkorderBlockType(flow)],
    [flow],
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Text variant="subtitle1">Blocks</Text>
      </div>
      <BlocksCategory
        header="Administrative"
        blockTypes={administrativeTypes}
      />
      <BlocksCategory header="Actions" blockTypes={actionTypes} />
    </div>
  );
}
