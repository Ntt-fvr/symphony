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
import fbt from 'fbt';
import symphony from '@fbcnms/ui/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useGraphSelection} from '../widgets/selection/GraphSelectionContext';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 8px 16px 4px',
    borderBottom: '1px solid',
    borderBottomColor: symphony.palette.separatorLight,
  },
  header: {
    marginRight: '8px',
  },
}));

export default function DetailsPane() {
  const classes = useStyles();

  const flowSelection = useGraphSelection();

  return (
    <div className={classes.root}>
      <Text variant="subtitle1" className={classes.header}>
        <fbt desc="">Selected Elements:</fbt>
      </Text>
      <Text>{flowSelection.selectedElements.length}</Text>
    </div>
  );
}
